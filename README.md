# One Voice — PWA (identité Signature bleue)

## Ce qui a changé dans cette version

**Nouvelle identité visuelle** appliquée à l'app fonctionnelle complète (celle avec l'intégration API YouTube) :
- Bleu dominant (`#0d1526` en mode Nuit, `#f4f7fc` en mode Jour), accent dégradé or/bleu clair
- Typographie Sora (titres) + Inter (texte courant)
- Ton logo (`assets/logo-1v.png`) intégré : écran de choix de langue, barre latérale desktop, icônes d'app/PWA

**Structure** :
- Nav du bas : Accueil, Recherche, **Favoris**, Profil (déjà en place, confirmé)
- Profil contient : Mes playlists, Langue de l'application, **À propos** (nouveau, écran dédié complet avec texte de mission + liste des fonctionnalités), Historique
- Fiche prédicateur : nouvelle section **"Séries recommandées par [nom]"** — chaque série affiche une mosaïque de 4 messages, un badge "Choisi par le prédicateur", et le nombre de messages sélectionnés

## Récupération des messages YouTube (rappel)
Rien n'a changé ici — toujours les deux options :
- `recuperer-messages.html` : ouvre-le dans ton navigateur, colle ta clé API, télécharge `messages.json`, dépose-le à la racine, redéploie
- `scripts/backfill.mjs` : la même chose en ligne de commande

Voir le reste de cette section dans les versions précédentes du projet si besoin — la mécanique n'a pas bougé.

## Déploiement demain
Glisse le **contenu** de ce dossier sur [app.netlify.com/drop](https://app.netlify.com/drop) — vérifie que `index.html` est à la racine de ce que tu déposes, pas dans un sous-dossier.

Si tu veux l'ingestion automatique quotidienne (fonction planifiée), il faudra passer par un déploiement Git plutôt que le glisser-déposer — voir les explications précédentes, rien n'a changé sur ce point non plus.
