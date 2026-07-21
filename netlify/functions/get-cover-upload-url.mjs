// ============================================================
// Fonction : POST /.netlify/functions/get-cover-upload-url
// Génère une URL signée pour déposer la pochette d'un prédicateur
// (une seule image, réutilisée pour tous ses audios).
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
  try { body = await req.json(); } catch { return new Response(JSON.stringify({ error: "Requête invalide." }), { status: 400 }); }

  const { preacherId, fileExtension } = body;
  if (!preacherId || !fileExtension) {
    return new Response(JSON.stringify({ error: "Champs manquants (prédicateur, extension)." }), { status: 400 });
  }

  const key = `covers/${preacherId}.${fileExtension}`;
  const s3 = new S3Client({
    region: "auto",
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
  });
  const contentType = fileExtension === "png" ? "image/png" : fileExtension === "webp" ? "image/webp" : "image/jpeg";
  const command = new PutObjectCommand({ Bucket: R2_BUCKET_NAME, Key: key, ContentType: contentType });
  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 });

  // Enregistre quelle extension est utilisée pour ce prédicateur (pour reconstruire l'URL publique ensuite)
  const store = getStore("one-voice-audio");
  const covers = (await store.get("preacher-covers", { type: "json" })) || {};
  covers[preacherId] = key;
  await store.setJSON("preacher-covers", covers);

  return new Response(JSON.stringify({ uploadUrl, key }), { status: 200, headers: { "Content-Type": "application/json" } });
};
