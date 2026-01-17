# Snake - Solutions

## 🐛 Bugs à corriger

### Bug 1 : Condition de collision avec les murs incorrecte

**Problème :** La condition utilise `<=` au lieu de `<`, ce qui fait que le serpent meurt une case trop tôt.

**Code bugué :**
```javascript
if (head.x <= 0 || head.x >= tileCount || head.y <= 0 || head.y >= tileCount) {
  // ❌ BUG : <= 0 empêche d'aller à la position 0
  finPartie();
}
```

**Solution :**
```javascript
if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
  // ✅ CORRIGÉ : < 0 permet d'aller à la position 0
  finPartie();
}
```

### Bug 2 : Guillemet manquant

**Code bugué :**
```javascript
console.log('Évitez les murs et votre propre corps!);
```

**Solution :**
```javascript
console.log('Évitez les murs et votre propre corps!');
```

## ✅ Corrections

1. **Ligne ~147** : Changer `head.x <= 0` en `head.x < 0` et `head.y <= 0` en `head.y < 0`
2. **Ligne ~327** : Ajouter le guillemet manquant
