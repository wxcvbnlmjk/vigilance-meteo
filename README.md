# 🌤️ Vigilance Météo

Une application web interactive pour visualiser les vigilances météorologiques en France en temps réel.

## 📋 Description

Vigilance Météo est une application React qui affiche sur une carte interactive les alertes météorologiques émises par Météo-France. L'application permet de visualiser les différents niveaux de vigilance (jaune, orange, rouge) pour tous les départements français, avec des pictogrammes spécifiques pour chaque type de phénomène météorologique.

## ✨ Fonctionnalités

### 🗺️ Carte Interactive
- **Carte Leaflet** centrée sur la France métropolitaine
- **Départements colorés** selon le niveau de vigilance le plus élevé
- **Pictogrammes dynamiques** pour chaque type de phénomène météorologique
- **Popups informatifs** avec détails des vigilances par département
- **Zoom et navigation** limités à la France

### 🔍 Filtres et Recherche
- **Sélection de date** : Aujourd'hui ou Demain
- **Filtre par département** : Liste complète des départements français
- **Filtre par type de phénomène** : Vent, Orages, Pluie, Canicule, Neige/Verglas, etc.
- **Filtres combinables** pour affiner la recherche

### 🎨 Interface Utilisateur
- **Design responsive** adapté mobile et desktop
- **Thème sombre/clair** avec toggle automatique
- **Interface moderne** avec DaisyUI
- **Indicateurs visuels** clairs pour les niveaux de vigilance

### 🧪 Mode Test
- **Bouton de test** pour charger des données de démonstration
- **Données statiques** pour tester l'application hors ligne
- **Basculement facile** entre données réelles et de test

### 📊 Types de Vigilances Supportés
- 🌪️ **Vent violent**
- 🌧️ **Pluie-inondation**
- ⚡ **Orages**
- 🌊 **Inondation**
- ❄️ **Neige-verglas**
- 🌡️ **Canicule**
- 🏔️ **Avalanches**
- 🌊 **Vagues-submersion**

## 🛠️ Technologies Utilisées

### Frontend
- **React 19** - Framework JavaScript pour l'interface utilisateur
- **TypeScript** - Typage statique pour une meilleure maintenabilité
- **Vite** - Outil de build rapide et moderne

### Cartographie
- **Leaflet** - Bibliothèque de cartographie interactive
- **OpenStreetMap** - Données cartographiques gratuites

### Styling
- **Tailwind CSS** - Framework CSS utilitaire
- **DaisyUI** - Composants UI prêts à l'emploi
- **CSS Modules** - Styles modulaires

### API et Données
- **API Météo-France** - Données de vigilance météorologique
- **GeoJSON** - Format pour les données géographiques des départements

### Outils de Développement
- **ESLint** - Linting du code
- **TypeScript ESLint** - Règles TypeScript
- **React Hooks** - Gestion d'état moderne

## 🚀 Installation et Démarrage

### Prérequis
- Node.js (version 18 ou supérieure)
- npm ou yarn

### Installation
```bash
# Cloner le repository
git clone https://github.com/wxcvbnlmjk/vigilance-meteo.git
cd vigilance-meteo

# Installer les dépendances
npm install
```

### Démarrage en développement
```bash
# Lancer le serveur de développement
npm run dev
```

L'application sera accessible à l'adresse `http://localhost:5173`

### Build de production
```bash
# Construire l'application pour la production
npm run build

# Prévisualiser le build
npm run preview
```

## 📁 Structure du Projet

```
vigilance-meteo/
├── public/                 # Assets statiques
│   ├── *.png              # Pictogrammes de vigilance
│   └── test.json          # Données de test
├── src/
│   ├── components/        # Composants React
│   │   ├── Map.tsx       # Composant carte principale
│   │   └── ThemeToggle.tsx # Toggle thème sombre/clair
│   ├── services/          # Services API
│   │   └── vigilanceApi.ts # Service API Météo-France
│   ├── types/             # Définitions TypeScript
│   │   ├── vigilance.ts   # Types pour les vigilances
│   │   └── geojson.ts     # Types pour les données géographiques
│   ├── App.tsx           # Composant principal
│   └── main.tsx          # Point d'entrée
├── package.json          # Dépendances et scripts
├── tailwind.config.js    # Configuration Tailwind
└── vite.config.ts        # Configuration Vite
```

## 🎯 Fonctionnalités Techniques

### Gestion d'État
- **useState** pour l'état local des composants
- **useEffect** pour les effets de bord et appels API
- **useRef** pour les références DOM et Leaflet

### Performance
- **Lazy loading** des données de vigilance
- **Optimisation des re-renders** avec des dépendances appropriées
- **Gestion efficace** des couches Leaflet

### Accessibilité
- **Labels appropriés** pour les éléments interactifs
- **Contraste** adapté aux thèmes sombre/clair
- **Navigation clavier** supportée

## 🔗 Liens Utiles

- **Repository GitHub** : [https://github.com/wxcvbnlmjk/vigilance-meteo](https://github.com/wxcvbnlmjk/vigilance-meteo)
- **API Météo-France** : [https://donneespubliques.meteofrance.fr/](https://donneespubliques.meteofrance.fr/)
- **Documentation Leaflet** : [https://leafletjs.com/](https://leafletjs.com/)

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## 📞 Support

Pour toute question ou problème, n'hésitez pas à ouvrir une issue sur GitHub.

---

**Développé avec ❤️ pour la communauté météorologique française**
