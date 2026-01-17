# Variables et Types de Données - Solutions

Ce document contient les solutions pour corriger les bugs intentionnels introduits dans le code.

## 🐛 Bugs à corriger

### Bug 1 : Conversion manquante pour le paramètre `nom`

**Problème :** Le paramètre `nom` n'est pas converti en String, ce qui peut causer des problèmes si un nombre est passé.

**Code bugué :**
```javascript
function ajouterItem(nom, type, quantite = 1) {
  const nomStr = nom;  // ❌ BUG : pas de conversion en String
  const typeStr = String(type);
  const quantiteNum = parseInt(quantite);
```

**Solution :**
```javascript
function ajouterItem(nom, type, quantite = 1) {
  const nomStr = String(nom);  // ✅ CORRIGÉ : conversion en String
  const typeStr = String(type);
  const quantiteNum = Number(quantite);
```

**Explication :** En JavaScript, il est important de convertir explicitement les paramètres pour s'assurer qu'ils sont du bon type. Si on passe un nombre comme `nom`, il ne sera pas traité comme une chaîne de caractères, ce qui peut causer des problèmes lors de la comparaison ou de l'affichage.

---

### Bug 2 : Utilisation de `parseInt()` au lieu de `Number()`

**Problème :** `parseInt()` tronque les décimales et peut causer des pertes de précision. Pour les quantités, on veut préserver les décimales si nécessaire.

**Code bugué :**
```javascript
const quantiteNum = parseInt(quantite);  // ❌ BUG : parseInt tronque les décimales
```

**Solution :**
```javascript
const quantiteNum = Number(quantite);  // ✅ CORRIGÉ : Number préserve les décimales
```

**Explication :** 
- `parseInt("3.7")` retourne `3` (tronque les décimales)
- `Number("3.7")` retourne `3.7` (préserve les décimales)

Pour les quantités, on veut pouvoir gérer les nombres décimaux (par exemple, 2.5 kg de farine), donc `Number()` est plus approprié que `parseInt()`.

---

### Bug 3 : Guillemet manquant dans `console.log()`

**Problème :** Un guillemet de fermeture manque dans un `console.log()`, ce qui cause une erreur de syntaxe.

**Code bugué :**
```javascript
console.log('Exemple: ajouterItem("Épée", "Arme", 1);
// ❌ BUG : guillemet de fermeture manquant
```

**Solution :**
```javascript
console.log('Exemple: ajouterItem("Épée", "Arme", 1)');
// ✅ CORRIGÉ : guillemet de fermeture ajouté
```

**Explication :** Toutes les chaînes de caractères en JavaScript doivent avoir des guillemets d'ouverture et de fermeture correspondants. Sans le guillemet de fermeture, le JavaScript ne peut pas parser le code.

---

## ✅ Code corrigé complet

Voici les trois corrections à apporter :

1. **Ligne ~46** : Changer `const nomStr = nom;` en `const nomStr = String(nom);`
2. **Ligne ~48** : Changer `const quantiteNum = parseInt(quantite);` en `const quantiteNum = Number(quantite);`
3. **Ligne ~109** : Ajouter le guillemet manquant : `...1)');`

Une fois ces corrections appliquées, tous les tests de validation devraient passer au vert ! ✅

---

## 💡 Conseils pour déboguer

1. **Comprendre les types** : En JavaScript, les types peuvent être implicites, mais il est préférable d'être explicite lors de la conversion.
2. **Différence entre `parseInt()` et `Number()`** :
   - `parseInt()` : Convertit en entier, tronque les décimales
   - `Number()` : Convertit en nombre, préserve les décimales
3. **Toujours convertir les entrées utilisateur** : Les paramètres de fonction peuvent être de n'importe quel type, il faut les convertir explicitement.
4. **Vérifiez les guillemets** : Les erreurs de syntaxe sont souvent dues à des guillemets manquants ou mal appariés.
