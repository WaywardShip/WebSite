# Wayward Ship - Site Web Amélioré 🤘

## 🆕 Dernières Modifications (30 janvier 2026)

### ✅ Changements Appliqués

1. **🎵 Logo Deezer Officiel**
   - Remplacement du logo Deezer personnalisé (gradient coloré) par le **vrai logo officiel de Deezer**
   - Design authentique avec la grille de carrés caractéristique de Deezer
   - Appliqué sur les 8 chansons de la setlist

2. **💡 Correction de l'Effet de Lumière sur le Logo**
   - Suppression du `drop-shadow` rouge qui créait un halo lumineux indésirable autour du logo principal
   - Le logo reste net et propre tout en conservant les animations au survol
   - Transitions fluides maintenues

---

## Modifications Précédentes

### ✅ Changements Effectués

1. **🎵 Musique d'Ambiance Activée par Défaut**
   - La musique démarre automatiquement au chargement de la page
   - Si le navigateur bloque l'autoplay, elle démarre au premier clic
   - Volume défini à 30%
   - Bouton de contrôle toujours disponible en bas à droite

2. **📧 Email Mis à Jour**
   - Nouveau contact: **waywardshipofficiel@gmail.com**
   - Mis à jour dans le footer et la politique de confidentialité

3. **🔊 Sons de Clics Optimisés**
   - Sons activés uniquement sur:
     - Clic sur les boutons de navigation
     - Survol et clic sur les éléments de la setlist
     - Survol et clic sur les cartes de concert (sauf "aucune date")
     - Clic sur les boutons Spotify/Deezer
     - Clic sur les boutons de modal et actions
   - Sons désactivés pour les interactions générales

4. **🎵 Liens Directs vers Spotify/Deezer**
   - Clic sur le bouton Spotify → Ouvre directement la recherche Spotify
   - Clic sur le bouton Deezer → Ouvre directement la recherche Deezer
   - Plus besoin de modal de sélection

5. **🖱️ Curseur Rouge Simplifié**
   - Curseur personnalisé rouge sur tout le site
   - Forme de flèche simple et élégante
   - Plus de pentagramme complexe

## Structure des Fichiers

```
wayward-ship/
├── index.html          # HTML avec vrais logos Deezer
├── style.css           # CSS sans effet drop-shadow sur le logo
├── script.js           # JavaScript avec musique auto et sons optimisés
├── fond.mp3            # Musique d'ambiance
├── clique.mp3          # Son de clic
├── logo.png            # Logo principal (sans halo rouge)
├── logo1.png           # Favicon
└── Frost_Scream.otf    # Police custom
```

## Setlist Actuelle (8 covers)

1. **Illuminate the Path** – Arch Enemy
2. **Darkside** – Bring Me The Horizon
3. **Two Faced** – Linkin Park
4. **Carrion** – Parkway Drive
5. **Cirice** – Ghost
6. **Tears Don't Fall** – Bullet for My Valentine
7. **ATWA** – System of a Down
8. **The Devil In I** – Slipknot

## Fonctionnalités Principales

### 🎵 Musique et Sons
- **Musique d'ambiance** : Démarre automatiquement (fond.mp3)
- **Effets sonores** : Clics et survols sur éléments interactifs (clique.mp3)
- **Contrôle** : Bouton flottant pour activer/désactiver

### 🎸 Streaming Musical
- **Spotify** : Logo officiel Spotify + clic direct → recherche Spotify
- **Deezer** : Logo officiel Deezer + clic direct → recherche Deezer
- Pas besoin de choisir de plateforme

### 📅 Calendrier
- Export .ics pour Google Calendar, Outlook, Apple Calendar
- Rappel automatique 2h avant le concert

### ✨ Animations
- Effet glitch sur le titre
- Particules rouges qui suivent le curseur
- Secousse de l'écran au clic du logo
- Animations au survol des éléments
- Logo principal sans halo lumineux

## Ajuster les Sons

Dans `script.js`, vous pouvez modifier les volumes :

```javascript
clickSound.volume = 0.3; // Volume du clic (0.0 à 1.0)
ambientAudio.volume = 0.3; // Volume de la musique (0.0 à 1.0)
```

Pour le son de survol :
```javascript
hoverSound.volume = 0.1; // Volume du survol (0.0 à 1.0)
```

## Compatibilité Navigateurs

- ✅ Chrome/Edge (recommandé)
- ✅ Firefox
- ✅ Safari
- ⚠️ Autoplay peut être bloqué par les navigateurs (la musique démarre au premier clic dans ce cas)

## Contact

Pour toute question : **waywardshipofficiel@gmail.com**

---

🤘 **Wayward Ship** - Metalcore depuis 2023
