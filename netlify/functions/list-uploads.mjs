// ============================================================
// Fonction : GET /.netlify/functions/list-uploads?preacherId=X
// Retourne les dépôts récents (pour permettre de les corriger
// depuis la page de dépôt, sans avoir à tout réenvoyer).
// ============================================================

import { getStore } from "@netlify/blobs";

export default async (req) => {
  const url = new URL(req.url);
  const preacherId = url.searchParams.get("preacherId");

  const store = getStore("one-voice-audio");
  const all = (await store.get("audio-messages", { type: "json" })) || [];
  const filtered = preacherId ? all.filter((m) => m.preacherId === preacherId) : all;
  const recent = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10);

  return new Response(JSON.stringify({ uploads: recent }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
