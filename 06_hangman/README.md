# Le Pendu - Solutions

Ce document contient les solutions pour corriger les bugs intentionnels introduits dans le code.

## 🐛 Bugs à corriger

### Bug 1 : Pas de vérification des lettres déjà utilisées

**Problème :** La fonction `proposerLettre()` n'utilise pas de vérification pour savoir si une lettre a déjà été proposée, ce qui permet de proposer la même lettre plusieurs fois.

**Code bugué :**
```javascript
function proposerLettre(lettre) {
  // ...
  if (lettre.length !== 1 || !/[A-Z]/.test(lettre)) {
    console.log('Veuillez entrer une seule lettre');
    return;
  }

  lettresUtilisees.push(lettre);  // ❌ BUG : pas de vérification avant
  // ...
}
```

**Solution :**
```javascript
function proposerLettre(lettre) {
  // ...
  if (lettre.length !== 1 || !/[A-Z]/.test(lettre)) {
    console.log('Veuillez entrer une seule lettre');
    return;
  }

  if (lettresUtilisees.includes(lettre)) {  // ✅ CORRIGÉ : vérification ajoutée
    console.log(`La lettre ${lettre} a déjà été utilisée`);
    return;
  }

  lettresUtilisees.push(lettre);
  // ...
}
```

**Explication :** Il faut vérifier si la lettre a déjà été utilisée avant de la traiter. Sinon, l'utilisateur peut proposer la même lettre plusieurs fois, ce qui n'a pas de sens dans le jeu du pendu.

---

### Bug 2 : Erreurs incrémentées même si la lettre est correcte

**Problème :** Les erreurs sont incrémentées avant de vérifier si la lettre est dans le mot, donc même une bonne lettre compte comme une erreur.

**Code bugué :**
```javascript
  lettresUtilisees.push(lettre);
  afficherLettresUtilisees();
  erreurs++;  // ❌ BUG : incrémente avant de vérifier si la lettre est correcte

  if (motSecret.includes(lettre)) {
    // Lettre trouvée
    // ...
  } else {
    // Mauvaise lettre
    // ...
  }
```

**Solution :**
```javascript
  lettresUtilisees.push(lettre);
  afficherLettresUtilisees();

  if (motSecret.includes(lettre)) {
    // Lettre trouvée
    // ...
  } else {
    // Mauvaise lettre
    erreurs++;  // ✅ CORRIGÉ : incrémente seulement si la lettre est incorrecte
    // ...
  }
```

**Explication :** Les erreurs ne doivent être incrémentées que si la lettre proposée n'est pas dans le mot secret. Si on incrémente avant la vérification, même les bonnes lettres comptent comme des erreurs, ce qui rend le jeu impossible à gagner.

---

### Bug 3 : Guillemet manquant dans `console.log()`

**Problème :** Un guillemet de fermeture manque dans un `console.log()`, ce qui cause une erreur de syntaxe.

**Code bugué :**
```javascript
console.log('  proposerLettre("J");
// ❌ BUG : guillemet de fermeture manquant
```

**Solution :**
```javascript
console.log('  proposerLettre("J");');
// ✅ CORRIGÉ : guillemet de fermeture ajouté
```

**Explication :** Toutes les chaînes de caractères doivent avoir des guillemets d'ouverture et de fermeture correspondants.

---

## ✅ Code corrigé complet

Voici les trois corrections à apporter :

1. **Ligne ~148** : Ajouter la vérification `if (lettresUtilisees.includes(lettre)) { ... return; }` avant `lettresUtilisees.push(lettre);`
2. **Ligne ~154** : Déplacer `erreurs++;` dans le bloc `else` (après la vérification `if (motSecret.includes(lettre))`)
3. **Ligne ~335** : Ajouter le guillemet manquant : `...("J");');`

Une fois ces corrections appliquées, tous les tests de validation devraient passer au vert ! ✅

---

## 💡 Conseils pour déboguer

1. **Vérifiez les conditions** : Assurez-vous que les vérifications sont faites au bon moment (avant ou après certaines actions)
2. **Ordre des opérations** : L'ordre dans lequel vous incrémentez les variables ou vérifiez les conditions est crucial
3. **Logique conditionnelle** : Utilisez `if/else` pour gérer les cas où une action doit se produire seulement dans certaines conditions
