// ============================================================
// Fonction : GET /.netlify/functions/get-audio-messages
// Retourne tous les messages audio prêts (ready: true) — c'est
// ce que l'app lit pour alimenter le parcours Audio.
// ============================================================

import { getStore } from "@netlify/blobs";

const { R2_PUBLIC_URL_BASE } = process.env;

export default async () => {
  const store = getStore("one-voice-audio");
  const all = (await store.get("audio-messages", { type: "json" })) || [];
  const ready = all
    .filter((m) => m.ready)
    .map((m) => ({
      id: m.id,
      preacherId: m.preacherId,
      title: m.title,
      cultDate: m.cultDate,
      durationSeconds: m.durationSeconds || null,
      // URL publique du fichier — construite à partir de R2_PUBLIC_URL_BASE (ex: https://pub-xxxx.r2.dev ou ton domaine personnalisé)
      audioUrl: R2_PUBLIC_URL_BASE ? `${R2_PUBLIC_URL_BASE.replace(/\/$/, "")}/${m.key}` : null,
    }));

  return new Response(JSON.stringify({ messages: ready }), {
    status: 200,
    headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=60" },
  });
};
