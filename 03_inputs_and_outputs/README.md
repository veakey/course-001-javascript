# Entrées et Sorties - Solutions

Ce document contient les solutions pour corriger les bugs intentionnels introduits dans le code.

## 🐛 Bugs à corriger

### Bug 1 : Fonction `afficher()` utilise `innerHTML` au lieu de `textContent`

**Problème :** L'utilisation de `innerHTML` peut causer des problèmes de sécurité et d'interprétation du HTML.

**Code bugué :**
```javascript
function afficher(texte) {
  const p = document.createElement('p');
  p.style.color = 'var(--text-primary)';
  p.style.margin = '8px 0';
  p.innerHTML = texte;  // ❌ BUG : utilise innerHTML au lieu de textContent
  displayArea.appendChild(p);
  displayArea.scrollTop = displayArea.scrollHeight;
}
```

**Solution :**
```javascript
function afficher(texte) {
  const p = document.createElement('p');
  p.style.color = 'var(--text-primary)';
  p.style.margin = '8px 0';
  p.textContent = texte;  // ✅ CORRIGÉ : utilise textContent
  displayArea.appendChild(p);
  displayArea.scrollTop = displayArea.scrollHeight;
}
```

**Explication :** 
- `innerHTML` interprète le HTML et peut exécuter du code malveillant (XSS)
- `textContent` affiche le texte tel quel, sans interprétation
- Pour afficher du texte simple, `textContent` est plus sûr et plus approprié

---

### Bug 2 : Fonction `prompt()` ne log pas l'entrée utilisateur

**Problème :** La fonction `prompt()` ne log pas l'entrée utilisateur, ce qui rend le débogage plus difficile.

**Code bugué :**
```javascript
function prompt(message) {
  const userResponse = window.prompt(message);
  if (userResponse === null) return null;
  return userResponse;  // ❌ BUG : pas de console.log pour déboguer
}
```

**Solution :**
```javascript
function prompt(message) {
  const userResponse = window.prompt(message);
  if (userResponse === null) return null;
  console.log(`Entrée utilisateur: ${userResponse}`);  // ✅ CORRIGÉ : log l'entrée
  return userResponse;
}
```

**Explication :** Logger l'entrée utilisateur dans la console permet de déboguer plus facilement et de voir ce que l'utilisateur a saisi, ce qui est utile pour le développement et le débogage.

---

### Bug 3 : Guillemet manquant dans `console.log()`

**Problème :** Un guillemet de fermeture manque dans un `console.log()`, ce qui cause une erreur de syntaxe.

**Code bugué :**
```javascript
console.log('  const nom = prompt("Quel est votre nom ?");
// ❌ BUG : guillemet de fermeture manquant
```

**Solution :**
```javascript
console.log('  const nom = prompt("Quel est votre nom ?");');
// ✅ CORRIGÉ : guillemet de fermeture ajouté
```

**Explication :** Toutes les chaînes de caractères doivent avoir des guillemets d'ouverture et de fermeture correspondants.

---

## ✅ Code corrigé complet

Voici les trois corrections à apporter :

1. **Ligne ~63** : Changer `p.innerHTML = texte;` en `p.textContent = texte;`
2. **Ligne ~54** : Ajouter `console.log(\`Entrée utilisateur: ${userResponse}\`);` après la vérification de null
3. **Ligne ~109** : Ajouter le guillemet manquant : `...nom ?");');`

Une fois ces corrections appliquées, tous les tests de validation devraient passer au vert ! ✅

---

## 💡 Conseils pour déboguer

1. **textContent vs innerHTML** :
   - `textContent` : Affiche le texte brut, plus sûr
   - `innerHTML` : Interprète le HTML, peut être dangereux
2. **Toujours logger les entrées** : Cela facilite le débogage et la compréhension du flux de données
3. **Vérifiez les guillemets** : Les erreurs de syntaxe sont souvent dues à des guillemets manquants
