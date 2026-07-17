// ============================================================
// Endpoint : GET /.netlify/functions/get-messages
// Retourne les messages ingérés automatiquement (stockés par
// ingest-messages.mjs). Le frontend fusionne ce résultat avec
// le contenu statique de data.js.
// ============================================================

import { getStore } from "@netlify/blobs";

export default async () => {
  const store = getStore("one-voice-messages");
  const messages = (await store.get("messages", { type: "json" })) || [];

  return new Response(JSON.stringify(messages), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300", // 5 min de cache CDN
    },
  });
};
