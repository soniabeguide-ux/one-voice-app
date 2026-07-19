#!/usr/bin/env node
/**
 * ============================================================
 * Script de rattrapage (à lancer une seule fois, sur ton PC)
 * ============================================================
 * Récupère TOUT l'historique des vidéos de chaque chaîne depuis
 * la date de coupure, via l'API YouTube Data v3, et écrit le
 * résultat dans `messages.json` (lu automatiquement par l'app).
 *
 * Utilisation :
 *   1. Récupère une clé API (voir README, section "Clé API YouTube")
 *   2. Dans un terminal, place-toi dans ce dossier puis lance :
 *
 *        YOUTUBE_API_KEY=ta_cle_ici node scripts/backfill.mjs
 *
 *      (sur Windows PowerShell :
 *        $env:YOUTUBE_API_KEY="ta_cle_ici"; node scripts/backfill.mjs )
 *
 *   3. Le fichier `messages.json` est créé/mis à jour. Redéploie l'app.
 * ============================================================
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PREACHERS } from "../data.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const API_KEY = process.env.YOUTUBE_API_KEY;
const CUTOFF = new Date(process.env.CUTOFF_DATE || "2023-01-01T00:00:00Z");

if (!API_KEY) {
  console.error("\n❌ Clé API manquante.\n");
  console.error("   Lance le script ainsi :");
  console.error("   YOUTUBE_API_KEY=ta_cle_ici node scripts/backfill.mjs\n");
  process.exit(1);
}

const API = "https://www.googleapis.com/youtube/v3";

async function api(endpoint, params) {
  const url = new URL(`${API}/${endpoint}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  url.searchParams.set("key", API_KEY);

  const res = await fetch(url);
  const json = await res.json();
  if (!res.ok) {
    const reason = json?.error?.errors?.[0]?.reason || json?.error?.message || res.status;
    throw new Error(`API YouTube (${endpoint}) : ${reason}`);
  }
  return json;
}

/** Résout l'identifiant technique de la chaîne (UC...) depuis son URL */
async function resolveChannelId(channelUrl) {
  const direct = channelUrl.match(/\/channel\/(UC[\w-]+)/);
  if (direct) return direct[1];

  const handle = channelUrl.match(/\/@([\w.-]+)/);
  if (handle) {
    const data = await api("channels", { part: "id", forHandle: "@" + handle[1] });
    if (data.items?.[0]?.id) return data.items[0].id;
  }

  const vanity = channelUrl.match(/\/c\/([\w.-]+)/);
  if (vanity) {
    // Les anciennes URL /c/ ne sont pas résolubles directement par l'API :
    // on lit la page pour extraire le channelId.
    const res = await fetch(channelUrl, { headers: { "User-Agent": "Mozilla/5.0" } });
    const html = await res.text();
    const m = html.match(/"channelId":"(UC[\w-]+)"/);
    if (m) return m[1];
  }
  return null;
}

/** Récupère la playlist "uploads" (toutes les vidéos) d'une chaîne */
async function getUploadsPlaylistId(channelId) {
  const data = await api("channels", { part: "contentDetails", id: channelId });
  return data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads || null;
}

/** Pagine la playlist uploads et retourne toutes les vidéos >= CUTOFF */
async function fetchVideosSince(uploadsPlaylistId) {
  const videos = [];
  let pageToken = "";

  while (true) {
    const data = await api("playlistItems", {
      part: "snippet,contentDetails",
      playlistId: uploadsPlaylistId,
      maxResults: 50,
      ...(pageToken ? { pageToken } : {}),
    });

    let reachedOlder = false;
    for (const item of data.items || []) {
      const publishedAt = item.contentDetails?.videoPublishedAt || item.snippet?.publishedAt;
      if (!publishedAt) continue;
      if (new Date(publishedAt) < CUTOFF) { reachedOlder = true; continue; }

      const title = item.snippet?.title || "";
      // Les vidéos supprimées/privées apparaissent avec ces titres : on les ignore
      if (title === "Deleted video" || title === "Private video") continue;

      videos.push({
        videoId: item.contentDetails.videoId,
        title,
        publishedAt,
      });
    }

    // La playlist uploads est triée du plus récent au plus ancien :
    // dès qu'on croise des vidéos antérieures à la coupure, on peut s'arrêter.
    pageToken = data.nextPageToken;
    if (!pageToken || reachedOlder) break;
  }

  // Deuxième passe : récupère les durées (par lots de 50) et classe chaque vidéo
  const durations = await fetchDurations(videos.map((v) => v.videoId));
  videos.forEach((v) => {
    v.durationSeconds = durations[v.videoId] || 0;
    v.contentType = classifyContent(v.title, v.durationSeconds);
  });

  return videos;
}

/** Récupère la durée de jusqu'à 50 vidéos par appel (économique en quota) */
async function fetchDurations(videoIds) {
  const durations = {};
  for (let i = 0; i < videoIds.length; i += 50) {
    const batch = videoIds.slice(i, i + 50);
    const data = await api("videos", { part: "contentDetails", id: batch.join(",") });
    (data.items || []).forEach((item) => { durations[item.id] = parseIsoDuration(item.contentDetails?.duration); });
  }
  return durations;
}
function parseIsoDuration(iso) {
  const m = (iso || "").match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return 0;
  return (parseInt(m[1] || 0) * 3600) + (parseInt(m[2] || 0) * 60) + parseInt(m[3] || 0);
}

// --- Classification prédication / louange / autre ---
// Règle : la durée est le signal principal (une louange ou une exhortation
// courte dépasse rarement 15-18 min), affinée par des mots-clés du titre.
// Imparfait mais transparent — ajustable dans messages.json si besoin.
const WORSHIP_KEYWORDS = ["louange", "adoration", "worship", "chant ", "chants ", "cantique", "medley", "clip officiel", "official video", "music video", "chanson", "hymne", "praise", " song", "moment musical", "négro spiritual", "negro spiritual"];
function classifyContent(title, durationSeconds) {
  const t = title.toLowerCase();
  const isWorship = WORSHIP_KEYWORDS.some((w) => t.includes(w));
  const minutes = (durationSeconds || 0) / 60;
  if (isWorship) return "louange";
  if (minutes < 30) return "autre"; // seuil : en dessous de 30 min, ce n'est pas une prédication complète
  return "predication";
}

/** Devine un thème à partir de mots-clés du titre (approximatif, révisable à la main) */
const THEME_KEYWORDS = {
  "Prière": ["prière", "prières", "prier", "jeûne", "jeune", "intercession", "prayer", "prayers", "nsppd", "veillée", "consécration"],
  "Combat spirituel": ["combat", "délivrance", "delivrance", "satan", "démon", "demon", "warfare", "spirituel", "ennemi", "victoire"],
  "Guérison": ["guérison", "guerison", "miracle", "miracles", "healing", "santé", "restaurer", "restauration"],
  "Couple & Famille": ["couple", "mariage", "famille", "époux", "epoux", "femme", "mari", "marriage", "family", "relationship"],
  "Finances": ["finance", "finances", "argent", "prospérité", "prosperite", "richesse", "business", "money", "abondance"],
  "Jeunesse": ["jeune", "jeunesse", "génération", "generation", "youth", "étudiant", "destinée", "vision"],
  "Foi": ["foi", "faith", "croire", "confiance", "parole", "grâce", "grace"],
};
function guessTheme(title) {
  const t = title.toLowerCase();
  for (const [theme, words] of Object.entries(THEME_KEYWORDS)) {
    if (words.some((w) => t.includes(w))) return theme;
  }
  return "Foi"; // valeur par défaut
}

// ============================================================
// Exécution
// ============================================================
console.log(`\n🔎 Récupération des vidéos publiées depuis le ${CUTOFF.toISOString().slice(0, 10)}\n`);

const allMessages = [];
let hadError = false;

for (const preacher of PREACHERS) {
  process.stdout.write(`  ${preacher.name.padEnd(38)} `);
  try {
    const channelId = await resolveChannelId(preacher.channelUrl);
    if (!channelId) { console.log("⚠️  chaîne introuvable"); hadError = true; continue; }

    const uploads = await getUploadsPlaylistId(channelId);
    if (!uploads) { console.log("⚠️  playlist introuvable"); hadError = true; continue; }

    const videos = await fetchVideosSince(uploads);
    videos.forEach((v) => {
      allMessages.push({
        id: `m-${preacher.id}-${v.videoId}`,
        preacherId: preacher.id,
        videoId: v.videoId,
        title: v.title,
        theme: guessTheme(v.title),
        publishedAt: v.publishedAt,
        durationSeconds: v.durationSeconds,
        contentType: v.contentType,
      });
    });
    console.log(`✅ ${videos.length} vidéo(s)`);
  } catch (err) {
    console.log(`❌ ${err.message}`);
    hadError = true;
  }
}

// Tri chronologique (du plus ancien au plus récent)
allMessages.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));

await fs.writeFile(path.join(ROOT, "messages.json"), JSON.stringify(allMessages, null, 2), "utf8");

console.log(`\n✨ Terminé : ${allMessages.length} messages écrits dans messages.json`);
if (hadError) console.log("⚠️  Certaines chaînes ont échoué — voir les lignes ci-dessus.");
console.log("   Redéploie l'application pour voir le contenu.\n");
