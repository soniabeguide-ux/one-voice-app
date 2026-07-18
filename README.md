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
