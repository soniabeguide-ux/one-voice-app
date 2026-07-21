# One Voice — PWA

## Ce qui a été ajouté dans cette session

**Ordre des prédicateurs** : Dr Mamadou Philippe Karambiri en 1ère position (ancien), Dr Raoul Wafo en 2ème. Le reste inchangé.

**Onglet Direct** (nouveau, dans la nav principale) :
- Vérifie en temps réel quels prédicateurs sont en direct sur YouTube (fonction `netlify/functions/check-live.mjs`, appelée à la demande à l'ouverture de l'onglet — pas planifiée)
- Affichage façon Option A retenue : vignette assombrie, pastille rouge "EN DIRECT" qui pulse
- Bouton de partage par carte : utilise le partage natif du téléphone quand disponible (fait apparaître les options "Ajouter à une story" si la plateforme le permet), avec repli sur WhatsApp/Facebook/X/Telegram/copier le lien
- **Nécessite un déploiement via Git** (pas le glisser-déposer) puisque ça repose sur les fonctions Netlify, comme l'ingestion quotidienne

**Série recommandée mise en avant sur l'Accueil** : une seule carte "Recommandé cette semaine", juste après les thèmes — prend la série la plus récemment ajoutée (`addedAt` dans `data.js`), pas une grille supplémentaire qui aurait alourdi l'écran.

**Bascule Vidéo/Audio** sur l'Accueil : le scaffold est en place (état sauvegardé, écran vide honnête en mode Audio en attendant que tu déposes du contenu sur Cloudflare R2). Le parcours Vidéo (YouTube, tout ce qu'on a construit jusqu'ici) reste le comportement par défaut et n'a pas changé.

## Un bug corrigé au passage
En construisant le partage pour Direct, une modification précédente avait accidentellement supprimé la déclaration de la fonction `renderFavorites()` (le corps de la fonction restait mais plus son en-tête) — corrigé et revalidé.

## Prochaine étape pour le parcours Audio
Le scaffold attend une vraie structure de données une fois que tu auras :
1. Un compte Cloudflare R2 avec au moins un fichier audio déposé
2. Les métadonnées par message : date réelle du culte, URL du fichier, durée

Dis-moi quand tu es prête à commencer à peupler ça — je construirai le lecteur audio natif (MediaSession, lecture en fond) à ce moment-là, avec de vrais fichiers à tester.

---

## Formulaire de dépôt audio (`deposer-audio.html`)

Page à part, à ouvrir directement (double-clic) ou à héberger séparément — permet à un prédicateur ou son équipe de déposer un message audio directement sur Cloudflare R2, sans jamais voir tes clés d'accès.

### Ce qu'il te faut configurer avant que ça marche
Dans **Netlify → Site configuration → Environment variables**, ajoute :
- `R2_ACCOUNT_ID`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_BUCKET_NAME`

(valeurs obtenues dans Cloudflare : R2 → Manage R2 API Tokens → Create API Token, avec permission "Object Read & Write")

### Comment ça fonctionne
1. La page construit automatiquement le nom de fichier correct (`identifiant-prédicateur_AAAA-MM-JJ_titre.mp3`) à partir des champs remplis — la syntaxe reste affichée en haut de page, mais impossible de se tromper puisque c'est généré, pas tapé à la main
2. `get-upload-url.mjs` génère une URL signée à usage unique (valable 5 minutes) sans jamais exposer tes clés R2 au navigateur
3. Le fichier part directement du navigateur vers Cloudflare — jamais par Netlify, pas de limite de taille de notre côté
4. `confirm-upload.mjs` enregistre la durée réelle et marque le dépôt comme prêt

### Ce qui reste à faire ensuite
Les métadonnées sont stockées (Netlify Blobs), mais **l'app ne lit pas encore ce contenu** — il faut construire la liaison entre ce stockage et l'écran Audio de l'app (actuellement en écran d'attente). Prochaine étape logique une fois que le dépôt aura été testé avec un vrai fichier.

---

## Parcours Audio branché (Option A)

L'écran d'accueil, en mode Audio, affiche maintenant un vrai contenu — à l'une, récemment ajoutés, prédicateurs — mélangé comme en mode Vidéo (option A retenue), lu depuis Cloudflare via `get-audio-messages.mjs`.

**Nouvelle variable d'environnement Netlify à ajouter**, en plus des 4 déjà en place :
- `R2_PUBLIC_URL_BASE` — l'adresse publique de ton bucket (ex: `https://pub-xxxxxxxx.r2.dev`, visible dans les paramètres du bucket une fois l'accès public activé, ou ton domaine personnalisé si tu en as connecté un)

**Pochettes** : comme aucune vraie photo n'existe encore, chaque pochette affiche le nom du prédicateur sur un fond dégradé — lisible, distinctif, sans dépendre d'images à fournir.

**Lecteur audio natif** : contrairement au lecteur vidéo YouTube, celui-ci utilise l'API MediaSession — la lecture continue en fond et sur écran verrouillé, avec les contrôles qui apparaissent sur l'écran de verrouillage. Bouton de téléchargement ajouté (ouvre le fichier directement).

## Compression automatique dans `deposer-audio.html`

Le fichier est maintenant compressé en MP3 64 kbps mono **directement dans le navigateur** avant l'envoi — aucune action supplémentaire pour la personne qui dépose. Le message de confirmation affiche le pourcentage de poids économisé.

## Récupération YouTube : coupure au 1er janvier 2023

Mise à jour dans `data.js`, `recuperer-messages.html`, `scripts/backfill.mjs` et la fonction quotidienne — il faudra relancer une récupération complète pour que le catalogue remonte jusque-là.

---

## Comptes utilisateurs (Supabase — lien magique par email)

### Ce qu'il te reste à faire

1. Va sur **supabase.com**, crée un compte et un nouveau projet (gratuit)
2. Dans **SQL Editor**, colle le contenu de `supabase-schema.sql` (à la racine de ce dossier) et exécute-le — ça crée les tables et les règles de sécurité
3. Dans **Project Settings → API**, récupère :
   - **Project URL**
   - **anon public key** (celle-ci est publique par nature, pas secrète comme les clés R2/YouTube)
4. Ouvre `app.js`, tout en haut, remplace :
   - `SUPABASE_URL` par ton Project URL
   - `SUPABASE_ANON_KEY` par ta clé anon
5. Dans **Authentication → URL Configuration** sur Supabase, ajoute l'adresse de ton site déployé dans "Redirect URLs" (sinon le lien magique ne ramènera pas la personne au bon endroit)
6. Redéploie

### Comment ça fonctionne
- Un champ email dans Profil, un bouton "Recevoir un lien de connexion" — la personne clique le lien reçu par mail, elle est connectée, sans mot de passe
- Au premier login : si son compte est vide, ses favoris/playlists déjà présents sur cet appareil sont automatiquement transférés dessus
- Aux logins suivants (nouvel appareil) : ses données du compte remplacent celles de l'appareil, pour une vraie continuité
- Tant qu'aucune valeur Supabase n'est configurée, l'app continue de fonctionner exactement comme avant (tout en local, sans compte) — rien ne casse en attendant que tu configures ça
