# Le Robot et le Codeur - Solutions

Ce document contient les solutions pour corriger les bugs intentionnels introduits dans le code.

## 🐛 Bugs à corriger

### Bug 1 : Fonction `tournerDroite()` incorrecte

**Problème :** La fonction `tournerDroite()` diminue l'angle au lieu de l'augmenter.

**Code bugué :**
```javascript
function tournerDroite() {
  if (gameWon) return;
  
  instructionQueue.push(() => {
    robotAngle -= 90;  // ❌ BUG : utilise -= au lieu de +=
    console.log(`Robot tourne à droite. Angle: ${robotAngle}°`);
  });
  
  executerQueue();
}
```

**Solution :**
```javascript
function tournerDroite() {
  if (gameWon) return;
  
  instructionQueue.push(() => {
    robotAngle += 90;  // ✅ CORRIGÉ : utilise += pour augmenter l'angle
    console.log(`Robot tourne à droite. Angle: ${robotAngle}°`);
  });
  
  executerQueue();
}
```

**Explication :** Quand on tourne à droite, l'angle doit augmenter de 90°. L'opérateur `-=` soustrait 90° au lieu d'ajouter, ce qui fait tourner le robot dans le mauvais sens.

---

### Bug 2 : Limites de la grille incorrectes dans `avancer()`

**Problème :** La condition de vérification des limites utilise `>` au lieu de `>=`, ce qui empêche le robot de se déplacer à la position 0.

**Code bugué :**
```javascript
// Vérifier les limites
if (newX > 0 && newX < tileCountX && newY >= 0 && newY < tileCountY) {
  // ❌ BUG : newX > 0 empêche le robot d'aller à la colonne 0
  robotGridX = newX;
  robotGridY = newY;
}
```

**Solution :**
```javascript
// Vérifier les limites
if (newX >= 0 && newX < tileCountX && newY >= 0 && newY < tileCountY) {
  // ✅ CORRIGÉ : newX >= 0 permet d'aller à la colonne 0
  robotGridX = newX;
  robotGridY = newY;
}
```

**Explication :** La condition `newX > 0` exclut la position 0, ce qui signifie que le robot ne peut jamais aller à la première colonne de la grille. Avec `>=`, le robot peut accéder à toutes les positions valides, y compris la position 0.

---

### Bug 3 : Guillemet manquant dans `console.log()`

**Problème :** Un guillemet de fermeture manque dans un `console.log()`, ce qui cause une erreur de syntaxe.

**Code bugué :**
```javascript
console.log('Robot initialisé au centre. Utilisez avancer(), reculer(), tournerGauche(), tournerDroite());
// ❌ BUG : guillemet de fermeture manquant
```

**Solution :**
```javascript
console.log('Robot initialisé au centre. Utilisez avancer(), reculer(), tournerGauche(), tournerDroite()');
// ✅ CORRIGÉ : guillemet de fermeture ajouté
```

**Explication :** En JavaScript, les chaînes de caractères doivent être délimitées par des guillemets (simples ou doubles) qui doivent être fermés. Sans le guillemet de fermeture, le JavaScript ne peut pas parser le code correctement.

---

## ✅ Code corrigé complet

Voici les trois corrections à apporter :

1. **Ligne ~259** : Changer `robotAngle -= 90;` en `robotAngle += 90;`
2. **Ligne ~193** : Changer `if (newX > 0 &&` en `if (newX >= 0 &&`
3. **Ligne ~350** : Ajouter le guillemet manquant : `...tournerDroite()');`

Une fois ces corrections appliquées, tous les tests de validation devraient passer au vert ! ✅

---

## 💡 Conseils pour déboguer

1. **Lisez les messages d'erreur** : Les erreurs de syntaxe sont généralement clairement indiquées dans la console.
2. **Testez les fonctions une par une** : Exécutez `tournerDroite()` et vérifiez que l'angle change correctement.
3. **Vérifiez les conditions** : Les opérateurs de comparaison (`>`, `>=`, `<`, `<=`) sont souvent sources d'erreurs.
4. **Utilisez la validation** : Le panneau de validation vous indique quels tests échouent et pourquoi.
