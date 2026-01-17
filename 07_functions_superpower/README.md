# Fonctions Super-Pouvoir - Solutions

## 🐛 Bugs à corriger

### Bug 1 : Ordre des dessins incorrect

**Problème :** Le corps est dessiné avant la tête, ce qui fait que la tête passe par-dessus le corps.

**Code bugué :**
```javascript
function dessinerChat() {
  // ...
  dessinerCorps(centreX, centreY, taille);  // ❌ BUG : dessiné en premier
  dessinerTete(centreX, centreY - taille * 0.5, taille);
  // ...
}
```

**Solution :**
```javascript
function dessinerChat() {
  // ...
  dessinerTete(centreX, centreY - taille * 0.5, taille);  // ✅ CORRIGÉ : dessiné en premier
  dessinerCorps(centreX, centreY, taille);
  // ...
}
```

**Explication :** L'ordre de dessin est important en canvas. Les éléments dessinés en premier sont recouverts par ceux dessinés après. Pour que la tête soit visible au-dessus du corps, elle doit être dessinée en premier.

### Bug 2 : Guillemet manquant

**Code bugué :**
```javascript
console.log('  dessinerChat();
```

**Solution :**
```javascript
console.log('  dessinerChat();');
```

## ✅ Corrections

1. **Ligne ~185-186** : Inverser l'ordre : dessinerTete avant dessinerCorps
2. **Ligne ~217** : Ajouter le guillemet manquant
