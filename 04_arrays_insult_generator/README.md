# Générateur d'Insultes - Solutions

Ce document contient les solutions pour corriger les bugs intentionnels introduits dans le code.

## 🐛 Bugs à corriger

### Bug 1 : `obtenirAleatoire()` utilise `Math.ceil()` au lieu de `Math.floor()`

**Problème :** `Math.ceil()` peut générer un index égal à la longueur du tableau, ce qui cause une erreur "index out of bounds".

**Code bugué :**
```javascript
function obtenirAleatoire(tableau) {
  const index = Math.ceil(Math.random() * tableau.length);  // ❌ BUG : peut générer index = length
  return tableau[index];
}
```

**Solution :**
```javascript
function obtenirAleatoire(tableau) {
  const index = Math.floor(Math.random() * tableau.length);  // ✅ CORRIGÉ : génère index entre 0 et length-1
  return tableau[index];
}
```

**Explication :** 
- `Math.random()` retourne un nombre entre 0 (inclus) et 1 (exclu)
- `Math.random() * tableau.length` retourne un nombre entre 0 et `tableau.length` (exclu)
- `Math.floor()` arrondit vers le bas, donc l'index sera entre 0 et `tableau.length - 1` ✅
- `Math.ceil()` arrondit vers le haut, donc l'index peut être égal à `tableau.length` ❌ (hors limites)

---

### Bug 2 : `ajouterAdjectif()` utilise `unshift()` au lieu de `push()`

**Problème :** `unshift()` ajoute l'élément au début du tableau au lieu de la fin, ce qui change l'ordre des éléments.

**Code bugué :**
```javascript
function ajouterAdjectif(adj) {
  adjectifs.unshift(adj);  // ❌ BUG : ajoute au début au lieu de la fin
  console.log(`Adjectif ajouté: ${adj}. Total: ${adjectifs.length}`);
}
```

**Solution :**
```javascript
function ajouterAdjectif(adj) {
  adjectifs.push(adj);  // ✅ CORRIGÉ : ajoute à la fin du tableau
  console.log(`Adjectif ajouté: ${adj}. Total: ${adjectifs.length}`);
}
```

**Explication :**
- `push()` ajoute un élément à la fin du tableau
- `unshift()` ajoute un élément au début du tableau
- Pour maintenir l'ordre logique (nouveaux éléments à la fin), on utilise `push()`

---

### Bug 3 : Guillemet manquant dans `console.log()`

**Problème :** Un guillemet de fermeture manque dans un `console.log()`, ce qui cause une erreur de syntaxe.

**Code bugué :**
```javascript
console.log('  ajouterAdjectif("magnifique");
// ❌ BUG : guillemet de fermeture manquant
```

**Solution :**
```javascript
console.log('  ajouterAdjectif("magnifique");');
// ✅ CORRIGÉ : guillemet de fermeture ajouté
```

**Explication :** Toutes les chaînes de caractères doivent avoir des guillemets d'ouverture et de fermeture correspondants.

---

## ✅ Code corrigé complet

Voici les trois corrections à apporter :

1. **Ligne ~52** : Changer `Math.ceil` en `Math.floor`
2. **Ligne ~74** : Changer `adjectifs.unshift(adj);` en `adjectifs.push(adj);`
3. **Ligne ~115** : Ajouter le guillemet manquant : `...magnifique");');`

Une fois ces corrections appliquées, tous les tests de validation devraient passer au vert ! ✅

---

## 💡 Conseils pour déboguer

1. **Math.floor vs Math.ceil** :
   - `Math.floor()` : Arrondit vers le bas (0.9 → 0)
   - `Math.ceil()` : Arrondit vers le haut (0.1 → 1)
   - Pour les index de tableaux, utilisez toujours `Math.floor()` pour éviter les index hors limites
2. **push vs unshift** :
   - `push()` : Ajoute à la fin (plus rapide)
   - `unshift()` : Ajoute au début (plus lent, décale tous les éléments)
3. **Vérifiez les index** : Les tableaux JavaScript sont indexés à partir de 0, donc le dernier index est `length - 1`
