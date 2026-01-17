# SUIVI DES ACTIONS 

> Ce fichier liste les actions réalisées par ordre chronologique, du plus ancien (#1) au plus récent (#n)

## [#1] Correction du bouton "Proposer" du Pendu
- Problème : Le code du jeu n'était exécuté que lors du clic sur "Exécuter", donc `window.proposerLettre` n'existait pas
- Solution : Exécution automatique du code au chargement de la page
- Fichiers modifiés : `06_hangman/index.html`, `06_hangman/js/game.js`
- Exposition de `nouvellePartie` sur `window` en plus de `proposerLettre`

## [#2] Ajout de feedback visuel pour le Pendu
- Ajout d'un élément `game-message` dans le HTML pour afficher les messages de fin de partie
- Création de fonctions `afficherMessage()` et `cacherMessage()`
- Messages affichés : "🎉 Félicitations! Vous avez gagné! 🎉" (vert) et "😢 Perdu! Le mot était: [mot]" (rouge)
- Fichiers modifiés : `06_hangman/index.html`, `06_hangman/js/game.js`

## [#3] Ajout de sélection de mot personnalisé pour le Pendu
- Ajout d'un input pour choisir le mot à faire deviner
- Ajout d'un bouton "Démarrer" pour commencer avec le mot choisi
- Ajout d'un bouton "Nouvelle partie" pour réinitialiser et réafficher l'input
- Gestion de l'affichage/masquage des contrôles selon l'état du jeu
- Fichiers modifiés : `06_hangman/index.html`, `06_hangman/js/game.js`

## [#4] Ajout d'animation pour le Robot
- Création d'un système de queue d'instructions (`instructionQueue`)
- Fonction `executerQueue()` qui exécute les instructions avec un délai de 100ms entre chaque
- Modification des fonctions `avancer()`, `reculer()`, `tournerGauche()`, `tournerDroite()` pour ajouter leurs actions à la queue
- Fichiers modifiés : `01_robot_and_coder/index.html`, `01_robot_and_coder/js/game.js`

## [#5] Correction de l'orientation du Robot
- Problème : Après `tournerDroite()` depuis 0°, le robot allait vers le haut au lieu du bas
- Cause : Correspondance angle → direction inversée pour les axes verticaux (90° = -1 au lieu de +1)
- Solution : Inversion des valeurs de `deltaY` pour 90° et 270° dans `avancer()` et `reculer()`
- Maintenant : 90° = vers le bas (deltaY = 1), 270° = vers le haut (deltaY = -1)
- Fichiers modifiés : `01_robot_and_coder/index.html`, `01_robot_and_coder/js/game.js`
