// ============================================================
// Fonction : GET /.netlify/functions/check-live
// Vérifie en temps réel quels prédicateurs sont actuellement en
// direct sur YouTube. Appelée à la demande (quand l'utilisateur
// ouvre l'onglet Direct), pas planifiée — contrairement à
// ingest-messages.mjs qui tourne une fois par jour.
//
// Nécessite YOUTUBE_API_KEY en variable d'environnement Netlify.
// ============================================================

import { getStore } from "@netlify/blobs";
import { PREACHERS } from "../../data.mjs";

const API = "https://www.googleapis.com/youtube/v3";

export default async () => {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  if (!API_KEY) {
    return new Response(JSON.stringify({ error: "YOUTUBE_API_KEY manquante", live: [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const store = getStore("one-voice-messages");
  const channelCache = (await store.get("channel-cache", { type: "json" })) || {};
  const live = [];

  await Promise.all(
    PREACHERS.map(async (preacher) => {
      try {
        const channelId = channelCache[preacher.id] ? await resolveChannelIdFromUploads(channelCache[preacher.id], API_KEY) : await resolveChannelIdDirect(preacher.channelUrl, API_KEY);
        if (!channelId) return;

        const data = await api("search", { part: "snippet", channelId, eventType: "live", type: "video", maxResults: 1 }, API_KEY);
        const item = data.items?.[0];
        if (item) {
          live.push({
            preacherId: preacher.id,
            videoId: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url,
          });
        }
      } catch (err) {
        console.error(`Erreur vérification direct pour ${preacher.name} :`, err.message);
      }
    })
  );

  return new Response(JSON.stringify({ live, checkedAt: new Date().toISOString() }), {
    status: 200,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
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

// channelId direct depuis /channel/UC..., sinon via @handle, sinon recherche par nom
async function resolveChannelIdDirect(channelUrl, key) {
  const direct = channelUrl.match(/\/channel\/(UC[\w-]+)/);
  if (direct) return direct[1];

  const handle = channelUrl.match(/\/@([\w.-]+)/);
  if (handle) {
    try {
      const d = await api("channels", { part: "id", forHandle: "@" + handle[1] }, key);
      if (d.items?.[0]?.id) return d.items[0].id;
    } catch {}
  }
  const query = handle ? handle[1] : channelUrl;
  const d = await api("search", { part: "snippet", type: "channel", q: query, maxResults: 1 }, key);
  return d.items?.[0]?.snippet?.channelId || d.items?.[0]?.id?.channelId || null;
}
// Si on a déjà l'ID de playlist "uploads" en cache (commence par UU), le channelId
// se déduit en remplaçant le préfixe UU par UC
async function resolveChannelIdFromUploads(uploadsPlaylistId, key) {
  if (uploadsPlaylistId && uploadsPlaylistId.startsWith("UU")) return "UC" + uploadsPlaylistId.slice(2);
  return null;
}
