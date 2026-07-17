// ============================================================
// Fonction planifiée : ingestion quotidienne des nouveaux messages
// ============================================================
// Tourne une fois par jour et récupère les nouvelles vidéos de
// chaque chaîne via l'API YouTube Data v3.
//
// Prérequis : la variable d'environnement YOUTUBE_API_KEY doit être
// définie dans Netlify (Site settings → Environment variables).
// Sans elle, la fonction s'arrête proprement sans rien casser.
//
// Le rattrapage initial (tout l'historique depuis janvier 2026) se
// fait avec `scripts/backfill.mjs`, à lancer une fois depuis ton PC.
// ============================================================

import { getStore } from "@netlify/blobs";
import { PREACHERS } from "../../data.mjs";

const CUTOFF = new Date("2025-07-17T00:00:00Z");
const API = "https://www.googleapis.com/youtube/v3";

export default async () => {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  if (!API_KEY) {
    console.warn("YOUTUBE_API_KEY absente : ingestion ignorée.");
    return new Response("YOUTUBE_API_KEY manquante", { status: 200 });
  }

  const store = getStore("one-voice-messages");
  const cache = (await store.get("channel-cache", { type: "json" })) || {};
  const existing = (await store.get("messages", { type: "json" })) || [];
  const knownVideoIds = new Set(existing.map((m) => m.videoId));
  const added = [];

  for (const preacher of PREACHERS) {
    try {
      const uploads = cache[preacher.id] || (await resolveUploads(preacher.channelUrl, API_KEY));
      if (!uploads) continue;
      cache[preacher.id] = uploads;

      // On ne regarde que la première page (50 vidéos) : largement suffisant
      // pour un passage quotidien.
      const data = await api("playlistItems", {
        part: "snippet,contentDetails",
        playlistId: uploads,
        maxResults: 50,
      }, API_KEY);

      for (const item of data.items || []) {
        const publishedAt = item.contentDetails?.videoPublishedAt || item.snippet?.publishedAt;
        const videoId = item.contentDetails?.videoId;
        const title = item.snippet?.title || "";
        if (!publishedAt || !videoId) continue;
        if (new Date(publishedAt) < CUTOFF) continue;
        if (title === "Deleted video" || title === "Private video") continue;
        if (knownVideoIds.has(videoId)) continue;

        added.push({
          id: `m-${preacher.id}-${videoId}`,
          preacherId: preacher.id,
          videoId,
          title,
          theme: guessTheme(title),
          publishedAt,
        });
        knownVideoIds.add(videoId);
      }
    } catch (err) {
      console.error(`Erreur pour ${preacher.name} :`, err.message);
    }
  }

  const merged = [...existing, ...added].sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
  await store.setJSON("messages", merged);
  await store.setJSON("channel-cache", cache);
  await store.setJSON("last-run", { at: new Date().toISOString(), added: added.length, total: merged.length });

  console.log(`Ingestion : ${added.length} nouveaux, ${merged.length} au total.`);
  return new Response(JSON.stringify({ added: added.length, total: merged.length }), { status: 200 });
};

async function api(endpoint, params, key) {
  const url = new URL(`${API}/${endpoint}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  url.searchParams.set("key", key);
  const res = await fetch(url);
  const json = await res.json();
  if (!res.ok) throw new Error(json?.error?.message || `HTTP ${res.status}`);
  return json;
}

async function resolveUploads(channelUrl, key) {
  let channelId = (channelUrl.match(/\/channel\/(UC[\w-]+)/) || [])[1];

  if (!channelId) {
    const handle = (channelUrl.match(/\/@([\w.-]+)/) || [])[1];
    if (handle) {
      const d = await api("channels", { part: "id", forHandle: "@" + handle }, key);
      channelId = d.items?.[0]?.id;
    }
  }
  if (!channelId) {
    const res = await fetch(channelUrl, { headers: { "User-Agent": "Mozilla/5.0" } });
    const html = await res.text();
    channelId = (html.match(/"channelId":"(UC[\w-]+)"/) || [])[1];
  }
  if (!channelId) return null;

  const d = await api("channels", { part: "contentDetails", id: channelId }, key);
  return d.items?.[0]?.contentDetails?.relatedPlaylists?.uploads || null;
}

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
  return "Foi";
}

export const config = { schedule: "@daily" };
