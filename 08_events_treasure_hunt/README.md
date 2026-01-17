# Chasse au Trésor - Solutions

## 🐛 Bugs à corriger

### Bug 1 : Target non généré

**Problème :** Le trésor n'est jamais généré car les lignes qui le créent sont commentées, donc le jeu ne peut pas fonctionner.

**Code bugué :**
```javascript
function nouvellePartie() {
  // tresorX = Math.random() * (canvas.width - 40) + 20;  // ❌ BUG : ligne commentée
  // tresorY = Math.random() * (canvas.height - 40) + 20;  // ❌ BUG : ligne commentée
  partieEnCours = true;
  // ...
}
```

**Solution :**
```javascript
function nouvellePartie() {
  tresorX = Math.random() * (canvas.width - 40) + 20;  // ✅ CORRIGÉ : décommenter
  tresorY = Math.random() * (canvas.height - 40) + 20;  // ✅ CORRIGÉ : décommenter
  partieEnCours = true;
  // ...
}
```

**Explication :** Sans générer les coordonnées du trésor, le jeu ne peut pas fonctionner. Il faut décommenter ces lignes pour que le trésor soit placé aléatoirement sur la carte.

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

1. **Ligne ~56-57** : Décommenter les lignes qui génèrent `tresorX` et `tresorY`
2. **Ligne ~185** : Ajouter le guillemet manquant (si présent)
