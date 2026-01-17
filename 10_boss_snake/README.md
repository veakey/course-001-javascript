# Snake - Solutions

## 🐛 Bugs à corriger

### Bug 1 : Scroll de la page avec les flèches

**Problème :** Quand on utilise les flèches pour déplacer le serpent, la page scroll aussi, ce qui est gênant.

**Code bugué :**
```javascript
// Contrôles clavier
document.addEventListener('keydown', (e) => {
  if (!gameRunning || gamePaused) return;
  
  switch(e.key) {  // ❌ BUG : pas de preventDefault, la page scroll
    case 'ArrowUp':
    // ...
  }
});
```

**Solution :**
```javascript
// Contrôles clavier
document.addEventListener('keydown', (e) => {
  if (!gameRunning || gamePaused) return;
  
  // Empêcher le scroll de la page avec les flèches
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
    e.preventDefault();  // ✅ CORRIGÉ : empêche le scroll
  }
  
  switch(e.key) {
    case 'ArrowUp':
    // ...
  }
});
```

**Explication :** Par défaut, les flèches du clavier font scroller la page. Pour éviter cela dans un jeu, il faut utiliser `e.preventDefault()` quand on détecte une flèche.

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

1. **Ligne ~291-294** : Ajouter `e.preventDefault()` pour les flèches (ArrowUp, ArrowDown, ArrowLeft, ArrowRight)
2. **Ligne ~338** : Ajouter le guillemet manquant
