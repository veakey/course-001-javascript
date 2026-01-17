# Artiste Digital - Solutions

## 🐛 Bugs à corriger

### Bug 1 : `dessinerCercle()` utilise `stroke()` au lieu de `fill()`

**Problème :** Le cercle est dessiné en contour au lieu d'être rempli.

**Code bugué :**
```javascript
function dessinerCercle(x, y, rayon) {
  ctx.beginPath();
  ctx.arc(x, y, rayon, 0, Math.PI * 2);
  ctx.stroke();  // ❌ BUG : dessine seulement le contour
  // ...
}
```

**Solution :**
```javascript
function dessinerCercle(x, y, rayon) {
  ctx.beginPath();
  ctx.arc(x, y, rayon, 0, Math.PI * 2);
  ctx.fill();  // ✅ CORRIGÉ : remplit le cercle
  // ...
}
```

### Bug 2 : Guillemet manquant

**Code bugué :**
```javascript
console.log('  definirCouleur("#ff0000");
```

**Solution :**
```javascript
console.log('  definirCouleur("#ff0000");');
```

## ✅ Corrections

1. **Ligne ~84** : Changer `ctx.stroke();` en `ctx.fill();`
2. **Ligne ~170** : Ajouter le guillemet manquant
