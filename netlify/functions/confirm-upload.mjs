// ============================================================
// Fonction : POST /.netlify/functions/confirm-upload
// Appelée par la page de dépôt une fois le fichier bien envoyé
// sur R2 — marque le message audio comme prêt à apparaître
// dans l'application, avec sa durée réelle.
// ============================================================

import { getStore } from "@netlify/blobs";

export default async (req) => {
  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Requête invalide." }), { status: 400 });
  }

  const { key, durationSeconds } = body;
  if (!key) return new Response(JSON.stringify({ error: "Clé manquante." }), { status: 400 });

  const store = getStore("one-voice-audio");
  const pending = (await store.get("audio-messages", { type: "json" })) || [];
  const entry = pending.find((m) => m.key === key);
  if (!entry) return new Response(JSON.stringify({ error: "Dépôt introuvable." }), { status: 404 });

  entry.ready = true;
  entry.durationSeconds = durationSeconds || null;
  await store.setJSON("audio-messages", pending);

  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "Content-Type": "application/json" } });
};
