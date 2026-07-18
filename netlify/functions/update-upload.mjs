// ============================================================
// Fonction : POST /.netlify/functions/update-upload
// Corrige le titre ou la date d'un dépôt déjà envoyé — modifie
// seulement les métadonnées affichées dans l'app, pas le fichier
// audio lui-même (pas besoin de le renvoyer).
// ============================================================

import { getStore } from "@netlify/blobs";

export default async (req) => {
  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Requête invalide." }), { status: 400 });
  }

  const { id, title, cultDate } = body;
  if (!id) return new Response(JSON.stringify({ error: "Identifiant manquant." }), { status: 400 });

  const store = getStore("one-voice-audio");
  const all = (await store.get("audio-messages", { type: "json" })) || [];
  const entry = all.find((m) => m.id === id);
  if (!entry) return new Response(JSON.stringify({ error: "Dépôt introuvable." }), { status: 404 });

  if (title) entry.title = title;
  if (cultDate) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(cultDate)) {
      return new Response(JSON.stringify({ error: "Format de date invalide (attendu AAAA-MM-JJ)." }), { status: 400 });
    }
    entry.cultDate = cultDate;
  }

  await store.setJSON("audio-messages", all);
  return new Response(JSON.stringify({ ok: true, entry }), { status: 200, headers: { "Content-Type": "application/json" } });
};
