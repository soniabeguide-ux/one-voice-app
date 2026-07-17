# One Voice — PWA

## Corrections de cette session

**Onboarding centré** : l'écran de choix de langue était collé en haut au lieu d'être centré verticalement — corrigé (`justify-content:center` sur toute la hauteur d'écran).

**Géolocalisation retirée** : le mode Jour/Nuit automatique utilisait la position GPS pour calculer le vrai lever/coucher du soleil. Ça demandait une permission intrusive au premier lancement. Remplacé par une simple règle horaire (7h–20h = Jour), sans aucune permission demandée. Le bouton manuel Jour/Nuit fonctionne toujours pareil.

**Traduction complète FR/EN** : toute l'interface (navigation, titres de section, boutons, états vides, écran À propos, pop-up d'installation, texte de partage, etc.) change réellement de langue selon le choix fait à l'onboarding ou dans Profil. Plus aucun texte ne reste figé en français quand on choisit l'anglais. Les thèmes (Foi, Prière, etc.) sont aussi traduits à l'affichage tout en gardant la même donnée en interne (le filtrage n'est pas cassé).

**Coupure de contenu à 1 an** : `CONTENT_CUTOFF` dans `data.js` est maintenant au 17 juillet 2025 (au lieu du 1er janvier 2026), comme demandé. Le script de récupération (`recuperer-messages.html`) et `scripts/backfill.mjs` ont aussi leur date par défaut alignée.

## Rappel : générer le vrai contenu
Le contenu affiché reste celui de `data.js` (provisoire) tant que tu n'as pas lancé `recuperer-messages.html` avec ta clé API pour générer `messages.json`. Une fois ce fichier déposé à la racine et l'app redéployée, le contenu réel et complet prend le relais.

## Déploiement
Identique à avant : glisse le contenu du dossier sur Netlify (drag-and-drop) pour l'app de base, ou connecte via Git si tu veux l'ingestion quotidienne automatique (variable d'environnement `YOUTUBE_API_KEY` à ajouter dans Netlify dans ce cas).
