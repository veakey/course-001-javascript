# Variables et Types de Données - Solutions

Ce document contient les solutions pour corriger les bugs intentionnels introduits dans le code.

## 🐛 Bugs à corriger

### Bug 1 : Guillemet manquant dans `console.log()`

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

Voici la correction à apporter :

1. **Ligne ~103** : Ajouter le guillemet manquant : `...1)');`

Une fois ces corrections appliquées, tous les tests de validation devraient passer au vert ! ✅

---

## 💡 Conseils pour déboguer

1. **Comprendre les types** : En JavaScript, les types peuvent être implicites, mais il est préférable d'être explicite lors de la conversion.
2. **Différence entre `parseInt()` et `Number()`** :
   - `parseInt()` : Convertit en entier, tronque les décimales
   - `Number()` : Convertit en nombre, préserve les décimales
3. **Toujours convertir les entrées utilisateur** : Les paramètres de fonction peuvent être de n'importe quel type, il faut les convertir explicitement.
4. **Vérifiez les guillemets** : Les erreurs de syntaxe sont souvent dues à des guillemets manquants ou mal appariés.
