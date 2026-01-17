# Compteur de Moutons - Solutions

Ce document contient les solutions pour corriger les bugs intentionnels introduits dans le code.

## 🐛 Bugs à corriger

### Bug 1 : Boucle `for` utilise `<` au lieu de `<=`

**Problème :** La condition `i < fin` exclut la valeur finale, donc le comptage s'arrête avant d'atteindre `fin`.

**Code bugué :**
```javascript
function compterAvecFor(debut, fin) {
  console.log(`Comptage avec for de ${debut} à ${fin}:`);
  for (let i = debut; i < fin; i++) {  // ❌ BUG : n'inclut pas fin
    console.log(i);
  }
}
```

**Solution :**
```javascript
function compterAvecFor(debut, fin) {
  console.log(`Comptage avec for de ${debut} à ${fin}:`);
  for (let i = debut; i <= fin; i++) {  // ✅ CORRIGÉ : inclut fin
    console.log(i);
  }
}
```

**Explication :** 
- `i < fin` : La boucle s'arrête quand `i` atteint `fin`, donc `fin` n'est jamais affiché
- `i <= fin` : La boucle continue jusqu'à ce que `i` soit égal à `fin`, donc `fin` est inclus

Exemple : `compterAvecFor(1, 5)` avec `<` affiche 1, 2, 3, 4 (pas 5) ❌
Avec `<=`, ça affiche 1, 2, 3, 4, 5 ✅

---

### Bug 2 : Boucle `while` sans incrémentation

**Problème :** La variable `i` n'est jamais incrémentée, ce qui cause une boucle infinie.

**Code bugué :**
```javascript
function compterAvecWhile(debut, fin) {
  console.log(`Comptage avec while de ${debut} à ${fin}:`);
  let i = debut;
  while (i <= fin) {
    console.log(i);
    // ❌ BUG : i n'est jamais incrémenté, boucle infinie !
  }
}
```

**Solution :**
```javascript
function compterAvecWhile(debut, fin) {
  console.log(`Comptage avec while de ${debut} à ${fin}:`);
  let i = debut;
  while (i <= fin) {
    console.log(i);
    i++;  // ✅ CORRIGÉ : incrémente i pour éviter la boucle infinie
  }
}
```

**Explication :** Dans une boucle `while`, il faut modifier la variable de condition à l'intérieur de la boucle, sinon la condition reste toujours vraie et la boucle ne s'arrête jamais. C'est une erreur très courante qui cause des boucles infinies !

---

### Bug 3 : Guillemet manquant dans `console.log()`

**Problème :** Un guillemet de fermeture manque dans un `console.log()`, ce qui cause une erreur de syntaxe.

**Code bugué :**
```javascript
console.log('  for (let i = 1; i <= 5; i++) {
// ❌ BUG : guillemet de fermeture manquant
```

**Solution :**
```javascript
console.log('  for (let i = 1; i <= 5; i++) {');
// ✅ CORRIGÉ : guillemet de fermeture ajouté
```

**Explication :** Toutes les chaînes de caractères doivent avoir des guillemets d'ouverture et de fermeture correspondants.

---

## ✅ Code corrigé complet

Voici les trois corrections à apporter :

1. **Ligne ~88** : Changer `i < fin` en `i <= fin`
2. **Ligne ~99** : Ajouter `i++;` après `console.log(i);` dans la boucle while
3. **Ligne ~183** : Ajouter le guillemet manquant : `...i++) {');`

Une fois ces corrections appliquées, tous les tests de validation devraient passer au vert ! ✅

---

## 💡 Conseils pour déboguer

1. **Boucles for** :
   - `i < fin` : Exclut la valeur finale
   - `i <= fin` : Inclut la valeur finale
   - Choisissez selon vos besoins, mais soyez cohérent !
2. **Boucles while** :
   - Toujours modifier la variable de condition dans la boucle
   - Sinon, risque de boucle infinie
   - Utilisez `i++`, `i--`, ou une autre modification appropriée
3. **Boucles infinies** : Si votre code se bloque, vérifiez que la condition de la boucle change à chaque itération
