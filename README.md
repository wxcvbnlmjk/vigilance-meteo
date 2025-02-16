# Synthèse de l'Application "Vigilances Météo"

## Description Générale
L'application "Vigilances Météo" est une application web qui permet de visualiser les vigilances météorologiques en France. Elle utilise une carte interactive pour afficher les alertes météorologiques par département, avec des filtres pour affiner les résultats par date, département, et type de phénomène météorologique.

## Technologies Utilisées
- **Framework Frontend**: React (v19)
- **Bundler**: Vite
- **Styling**: Tailwind CSS avec DaisyUI
- **Cartographie**: Leaflet
- **Typage**: TypeScript
- **Linting**: ESLint avec des plugins pour React Hooks et React Refresh
- **Gestion des dépendances**: npm

## Structure du Projet

### Fichiers de Configuration
- **`eslint.config.js`**: Configuration d'ESLint pour le linting du code, avec des règles spécifiques pour React et TypeScript.
- **`tailwind.config.js`**: Configuration de Tailwind CSS avec le plugin DaisyUI.
- **`tsconfig.json`**, **`tsconfig.app.json`**, **`tsconfig.node.json`**: Configuration de TypeScript pour le projet, avec des options spécifiques pour le frontend et le backend.
- **`vite.config.ts`**: Configuration de Vite pour le développement et la production, avec des alias pour les imports et des options de serveur.

### Fichiers Principaux
- **`index.html`**: Point d'entrée de l'application, incluant les scripts et styles nécessaires.
- **`package.json`**: Liste des dépendances et scripts pour le développement, la construction, et le linting du projet.

### Composants Principaux
- **`App.tsx`**: Composant principal de l'application, gérant l'état des vigilances et des filtres, et affichant l'interface utilisateur.
- **`Map.tsx`**: Composant qui affiche une carte Leaflet avec les vigilances météorologiques par département.
- **`vigilanceApi.ts`**: Service pour récupérer les données des vigilances météorologiques depuis une API publique.

### Styles
- **`App.css`**: Styles spécifiques à l'application, incluant des animations et des styles pour les composants.
- **`index.css`**: Styles globaux, incluant des styles pour Leaflet et les popups de vigilance.

### Types
- **`vigilance.ts`**: Définition des types TypeScript pour les vigilances et les filtres.
- **`geojson.ts`**: Définition des types TypeScript pour les données GeoJSON des départements français.

## Fonctionnalités Principales
1. **Carte Interactive**:
   - Affichage des départements français avec des couleurs correspondant aux niveaux de vigilance.
   - Popups interactifs avec des détails sur les vigilances (date, phénomène, niveau de vigilance).

2. **Filtres**:
   - Filtrage des vigilances par date, département, et type de phénomène météorologique.
   - Les filtres sont dynamiquement mis à jour en fonction des données disponibles.

3. **Récupération des Données**:
   - Les données des vigilances sont récupérées depuis une API publique et filtrées pour n'afficher que les vigilances actives.

4. **Responsive Design**:
   - L'interface est conçue pour être responsive, avec une disposition adaptée aux écrans de différentes tailles.

## Développement et Déploiement
- **Développement**: Utilisation de Vite pour un développement rapide avec Hot Module Replacement (HMR).
- **Linting**: ESLint est configuré pour assurer la qualité du code avec des règles spécifiques pour React et TypeScript.
- **Construction**: Le projet peut être construit pour la production avec la commande `npm run build`.
- **Prévisualisation**: La version de production peut être prévisualisée avec la commande `npm run preview`.

## Conclusion
L'application "Vigilances Météo" est un outil utile pour visualiser les alertes météorologiques en France. Elle combine des technologies modernes comme React, TypeScript, et Leaflet pour offrir une expérience utilisateur fluide et interactive. Les filtres dynamiques et la carte interactive en font un outil puissant pour suivre les vigilances météorologiques en temps réel.
