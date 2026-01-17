# Fonctions Super-Pouvoir - Solutions

## 🐛 Bugs à corriger

### Bug 1 : Ordre des dessins incorrect

**Problème :** Les fonctions de dessin sont dans le désordre, ce qui fait que certaines parties sont dessinées dans le mauvais ordre (par exemple, les oreilles avant la tête).

**Code bugué :**
```javascript
function dessinerChat() {
  // ...
  dessinerOreilles(centreX, centreY - taille * 0.5, taille);  // ❌ BUG : dessiné avant la tête
  dessinerCorps(centreX, centreY, taille);
  dessinerPattes(centreX, centreY - taille * 0.5, taille);
  dessinerTete(centreX, centreY - taille * 0.5, taille);  // ❌ BUG : dessiné après les oreilles
  // ...
}
```

**Solution :**
```javascript
function dessinerChat() {
  // ...
  dessinerTete(centreX, centreY - taille * 0.5, taille);  // ✅ CORRIGÉ : dessiné en premier
  dessinerCorps(centreX, centreY, taille);
  dessinerOreilles(centreX, centreY - taille * 0.5, taille);
  dessinerYeux(centreX, centreY - taille * 0.5, taille);
  dessinerNez(centreX, centreY - taille * 0.5, taille);
  dessinerBouche(centreX, centreY - taille * 0.5, taille);
  dessinerPattes(centreX, centreY - taille * 0.5, taille);
  dessinerQueue(centreX, centreY - taille * 0.5, taille);
  // ...
}
```

**Explication :** L'ordre de dessin est important en canvas. Les éléments dessinés en premier sont recouverts par ceux dessinés après. Pour que le chat soit bien dessiné, il faut dessiner dans l'ordre logique :
1. **dessinerTete** - La base de la tête
2. **dessinerCorps** - Le corps sous la tête
3. **dessinerOreilles** - Les oreilles sur la tête
4. **dessinerYeux** - Les yeux sur la tête
5. **dessinerNez** - Le nez sur la tête
6. **dessinerBouche** - La bouche sur la tête
7. **dessinerPattes** - Les pattes sous le corps
8. **dessinerQueue** - La queue à côté du corps

**Ordre attendu exact :**
```
dessinerTete → dessinerCorps → dessinerOreilles → dessinerYeux → dessinerNez → dessinerBouche → dessinerPattes → dessinerQueue
```

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

1. **Ligne ~185-192** : Réorganiser les fonctions dans le bon ordre : dessinerTete, dessinerCorps, puis les détails (oreilles, yeux, nez, bouche), puis pattes et queue
2. **Ligne ~217** : Ajouter le guillemet manquant (si présent)
