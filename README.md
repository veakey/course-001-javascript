# Cours JavaScript - Mini-Jeux Interactifs

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Ce projet contient une série de mini-jeux interactifs pour apprendre JavaScript de manière pratique et ludique. Chaque exercice vous permet de coder directement dans votre navigateur avec un éditeur intégré (CodeMirror) et de voir le résultat en temps réel.

## 📋 Structure du Projet

Le projet est organisé en 10 modules progressifs :

```
001-javascript/
├── 01_robot_and_coder/       # Découverte des fonctions et déplacements
├── 02_variables_and_data_types/  # Variables et types de données
├── 03_inputs_and_outputs/    # Entrées/sorties
├── 04_arrays_insult_generator/   # Tableaux et générateurs
├── 05_loops_sheep_counter/   # Boucles
├── 06_hangman/               # Jeu du Pendu complet
├── 07_functions_superpower/  # Fonctions avancées
├── 08_events_treasure_hunt/  # Événements et interactions
├── 09_canvas_digital_artist/ # Canvas HTML5
├── 10_boss_snake/            # Projet final - Snake
├── shared/                   # Ressources partagées (CSS, JS, images)
└── assets/                   # Documentation (PDF)
```

## 🚀 Démarrage Rapide

### Méthode 1 : Ouvrir directement dans le navigateur

1. Clonez ou téléchargez ce dépôt
2. Ouvrez le dossier d'un exercice (par exemple `01_robot_and_coder`)
3. Double-cliquez sur `index.html` ou faites un clic droit > "Ouvrir avec" > votre navigateur

### Méthode 2 : Utiliser un serveur local (recommandé)

Pour éviter les problèmes de sécurité avec les fichiers locaux, utilisez un serveur HTTP :

#### Avec Python 3
```bash
python3 -m http.server 8000
```

#### Avec Node.js (npx)
```bash
npx http-server -p 8000
```

#### Avec PHP
```bash
php -S localhost:8000
```

Puis ouvrez votre navigateur à l'adresse : `http://localhost:8000`

Naviguez ensuite vers le dossier de l'exercice souhaité (ex: `http://localhost:8000/01_robot_and_coder/`)

## 🎮 Utilisation de l'Interface

Chaque exercice comprend :

- **Panneau Terminal** (à gauche) :
  - Éditeur de code avec coloration syntaxique
  - Bouton "Exécuter" pour lancer votre code
  - Zone de sortie pour les `console.log()`

- **Panneau Jeu** (à droite) :
  - Visualisation interactive du jeu/exercice
  - Canvas, inventaire, ou autres éléments selon l'exercice

### Raccourcis clavier

- `Ctrl + Enter` : Exécuter le code (dans l'éditeur)

## 📚 Modules du Cours

### 01 - Robot et Codeur
**Concepts** : Fonctions de base, déplacements

Apprenez à déplacer un robot sur une grille avec les fonctions :
- `avancer()` - Fait avancer le robot d'une case
- `reculer()` - Fait reculer le robot d'une case
- `tournerGauche()` - Tourne le robot à gauche (90°)
- `tournerDroite()` - Tourne le robot à droite (90°)

**Objectif** : Atteindre le drapeau rouge en programmant la séquence de mouvements.

### 02 - Variables et Types de Données
**Concepts** : Variables, types (string, number, boolean), objets

Gérez un inventaire d'items :
- `ajouterItem(nom, type, quantite)` - Ajoute un item à l'inventaire
- Les items avec le même nom et type voient leurs quantités fusionnées automatiquement

### 03 - Entrées et Sorties
**Concepts** : `prompt()`, `alert()`, `confirm()`, manipulation du DOM

### 04 - Générateur d'Insultes (Tableaux)
**Concepts** : Tableaux (`Array`), accès aux indices, manipulation

### 05 - Compteur de Moutons (Boucles)
**Concepts** : Boucles `for`, `while`, itérations

### 06 - Le Pendu
**Concepts** : Logique de jeu, conditions complexes, gestion d'état

Fonctionnalités :
- Deviner un mot lettre par lettre
- Choisir votre propre mot à faire deviner
- Feedback visuel pour victoire/défaite
- Système de tentatives limitées

### 07 - Superpouvoir (Fonctions)
**Concepts** : Fonctions personnalisées, paramètres, valeurs de retour

### 08 - Chasse au Trésor (Événements)
**Concepts** : Événements DOM, gestion des clics, interactions utilisateur

### 09 - Artiste Digital (Canvas)
**Concepts** : Canvas HTML5, dessin, animations

### 10 - Boss Final - Snake
**Concepts** : Tous les concepts précédents, jeu complet

## 💡 Conseils d'Apprentissage

1. **Commencez par l'ordre** : Les exercices sont progressifs, suivez la numérotation
2. **Expérimentez** : Modifiez le code, testez différentes approches
3. **Lisez les commentaires** : Chaque fichier contient des instructions et exemples
4. **Utilisez la console** : Les `console.log()` sont vos amis pour déboguer
5. **Consultez la documentation** : Le PDF dans `assets/` contient plus de détails

## 🛠️ Technologies Utilisées

- **CodeMirror** : Éditeur de code avec coloration syntaxique
- **Canvas API** : Pour les graphiques et animations
- **HTML5 / CSS3** : Interface utilisateur avec design glassmorphism
- **JavaScript vanilla** : Pas de framework, code JavaScript pur

## 📝 Notes Techniques

- Tous les fichiers `game.js` sont chargés automatiquement au démarrage
- Le code dans `<script type="text/plain" id="game-code">` sert de modèle pour l'éditeur
- Les styles partagés sont dans `shared/css/`
- Les scripts utilitaires (terminal, CodeMirror) sont dans `shared/js/`

## 🐛 Dépannage

**Le code ne s'exécute pas ?**
- Vérifiez la console du navigateur (F12) pour les erreurs JavaScript
- Assurez-vous d'utiliser un serveur HTTP plutôt que d'ouvrir directement le fichier

**L'éditeur ne s'affiche pas ?**
- Vérifiez que tous les fichiers dans `shared/` sont présents
- Videz le cache du navigateur (Ctrl+Shift+R)

**Le jeu ne se met pas à jour ?**
- Cliquez sur "Exécuter" après chaque modification
- Certains jeux nécessitent une réinitialisation complète (recharger la page)

## 📄 Licence

Ce projet est open source et distribué sous la licence [MIT](LICENSE).

Vous êtes libre de :
- ✅ Utiliser ce projet à des fins personnelles ou commerciales
- ✅ Modifier et adapter le code selon vos besoins
- ✅ Partager et distribuer ce projet
- ✅ Utiliser le code dans vos propres projets

**Ce projet est destiné à l'apprentissage et à l'enseignement du JavaScript.**

Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

**Bon apprentissage et amusez-vous bien à coder ! 🎉**
