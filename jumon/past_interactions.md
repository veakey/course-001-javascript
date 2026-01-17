# HISTORIQUE DES INTERACTIONS 

> Ce fichier liste les points clés des échanges par ordre chronologique, du plus ancien (#1) au plus récent (#n)

## [#1] Session - Corrections et améliorations des jeux
**Date** : Session actuelle

### Problèmes identifiés et résolus :

1. **Pendu - Bouton "Proposer" ne fonctionnait pas**
   - L'utilisateur signalait que rien ne se passait au clic
   - Diagnostic : Le code n'était pas exécuté automatiquement, donc les fonctions n'étaient pas disponibles
   - Solution : Exécution automatique au chargement + démarrage automatique d'une partie

2. **Pendu - Manque de feedback visuel**
   - Demande d'ajout de feedback pour victoire/défaite
   - Solution : Messages colorés (vert pour victoire, rouge pour défaite) avec emojis

3. **Pendu - Besoin de choisir le mot**
   - Demande d'input pour choisir le mot à faire deviner
   - Solution : Input avec bouton "Démarrer" qui disparaît pendant le jeu, réapparaît avec "Nouvelle partie"

4. **Robot - Animation des mouvements**
   - Demande d'animation avec délai de 100ms entre chaque instruction
   - Solution : Système de queue d'instructions avec exécution séquentielle animée

5. **Robot - Orientation incorrecte**
   - Problème : Après `tournerDroite()` depuis 0°, le robot allait vers le haut au lieu du bas
   - Diagnostic avec logs : L'angle 90° calculait `deltaY = -1` (haut) au lieu de `deltaY = 1` (bas)
   - Solution : Inversion de la correspondance angle → direction pour les axes verticaux

### Points techniques notables :
- Utilisation de `setTimeout` pour l'exécution automatique du code
- Système de queue asynchrone avec `async/await` pour l'animation du robot
- Debug avec logs pour identifier le problème d'orientation