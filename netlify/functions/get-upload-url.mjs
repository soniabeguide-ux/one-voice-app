// ============================================================
// Fonction : POST /.netlify/functions/get-upload-url
// Génère une URL signée à usage unique pour déposer un fichier
// audio directement sur Cloudflare R2 — le fichier ne transite
// jamais par nos serveurs, seule cette autorisation temporaire
// est générée ici (c'est pour ça que les clés R2 ne sont jamais
// exposées au navigateur).
//
// Nécessite ces variables d'environnement Netlify :
//   R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME
// ============================================================

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getStore } from "@netlify/blobs";

export default async (req) => {
  const { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME } = process.env;

  if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME) {
    return new Response(JSON.stringify({ error: "Configuration R2 manquante côté serveur." }), { status: 500 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Requête invalide." }), { status: 400 });
  }

  const { preacherId, cultDate, title, fileExtension } = body;
  if (!preacherId || !cultDate || !title || !fileExtension) {
    return new Response(JSON.stringify({ error: "Champs manquants (prédicateur, date, titre, extension)." }), { status: 400 });
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(cultDate)) {
    return new Response(JSON.stringify({ error: "Format de date invalide (attendu AAAA-MM-JJ)." }), { status: 400 });
  }

  // Construit le nom de fichier selon la convention : identifiant_date_titre.ext
  const slug = title
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // enlève les accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  const key = `${preacherId}/${preacherId}_${cultDate}_${slug}.${fileExtension}`;

  const s3 = new S3Client({
    region: "auto",
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
  });

  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: key,
    ContentType: fileExtension === "mp3" ? "audio/mpeg" : "audio/mp4",
  });

  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 }); // valable 5 minutes

  // Enregistre les métadonnées tout de suite (le fichier sera bien là une fois l'upload terminé,
  // et le champ "ready" permet de ne l'afficher dans l'app qu'une fois confirmé)
  const store = getStore("one-voice-audio");
  const pending = (await store.get("audio-messages", { type: "json" })) || [];
  pending.push({
    id: `audio-${preacherId}-${Date.now()}`,
    preacherId,
    title,
    cultDate,
    key,
    ready: false,
    createdAt: new Date().toISOString(),
  });
  await store.setJSON("audio-messages", pending);

  return new Response(JSON.stringify({ uploadUrl, key }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
