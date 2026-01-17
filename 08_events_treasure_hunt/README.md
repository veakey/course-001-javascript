# Chasse au Trésor - Solutions

## 🐛 Bugs à corriger

### Bug 1 : Condition de victoire inversée

**Problème :** La condition utilise `>` au lieu de `<`, donc on gagne quand on est loin au lieu d'être proche.

**Code bugué :**
```javascript
if (distance > 20) {  // ❌ BUG : condition inversée
  partieEnCours = false;
  // ...
}
```

**Solution :**
```javascript
if (distance < 20) {  // ✅ CORRIGÉ : condition correcte
  partieEnCours = false;
  // ...
}
```

### Bug 2 : Guillemet manquant

**Code bugué :**
```javascript
console.log('  🧊 Ça gèle - Très loin);
```

**Solution :**
```javascript
console.log('  🧊 Ça gèle - Très loin');
```

## ✅ Corrections

1. **Ligne ~120** : Changer `distance > 20` en `distance < 20`
2. **Ligne ~185** : Ajouter le guillemet manquant
