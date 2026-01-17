// Boucles - Compteur de Moutons
// Utilisez les boucles pour compter et mettre en surbrillance les moutons

const sheepContainer = document.getElementById('sheep-container');
const nombreTotalMoutons = 20;
let moutons = [];

// Initialiser les moutons
function initialiserMoutons() {
  sheepContainer.innerHTML = '';
  moutons = [];
  for (let i = 0; i < nombreTotalMoutons; i++) {
    moutons.push({
      id: i + 1,
      selectionne: false
    });
  }
  afficherMoutons();
}

// Afficher les moutons
function afficherMoutons() {
  sheepContainer.innerHTML = '';
  moutons.forEach(mouton => {
    const div = document.createElement('div');
    div.className = 'sheep-item';
    if (mouton.selectionne) {
      div.classList.add('selected');
    }
    div.textContent = '🐑';
    div.setAttribute('data-id', mouton.id);
    sheepContainer.appendChild(div);
  });
}

// Sélectionner un mouton par numéro
function selectionnerMouton(numero) {
  if (numero < 1 || numero > nombreTotalMoutons) {
    console.log(`Numéro invalide: ${numero}. Doit être entre 1 et ${nombreTotalMoutons}`);
    return;
  }
  // Désélectionner tous
  moutons.forEach(m => m.selectionne = false);
  // Sélectionner le mouton
  moutons[numero - 1].selectionne = true;
  afficherMoutons();
  console.log(`Mouton ${numero} sélectionné`);
}

// Compter avec une boucle for
function compterAvecFor(debut, fin) {
  console.log(`Comptage avec for de ${debut} à ${fin}:`);
  for (let i = debut; i <= fin; i++) {
    console.log(i);
  }
}

// Compter avec une boucle while
function compterAvecWhile(debut, fin) {
  console.log(`Comptage avec while de ${debut} à ${fin}:`);
  let i = debut;
  while (i <= fin) {
    console.log(i);
    i++;
  }
}

// Sélectionner plusieurs moutons avec une boucle
function selectionnerPlusieurs(debut, fin) {
  console.log(`Sélection de moutons ${debut} à ${fin}:`);
  for (let i = debut; i <= fin && i <= nombreTotalMoutons; i++) {
    moutons[i - 1].selectionne = true;
  }
  afficherMoutons();
  console.log(`Moutons ${debut} à ${fin} sélectionnés`);
}

// Sélectionner les pairs
function selectionnerPairs() {
  moutons.forEach(m => m.selectionne = false);
  for (let i = 0; i < moutons.length; i++) {
    if ((i + 1) % 2 === 0) {
      moutons[i].selectionne = true;
    }
  }
  afficherMoutons();
  console.log('Moutons pairs sélectionnés');
}

// Sélectionner les impairs
function selectionnerImpairs() {
  moutons.forEach(m => m.selectionne = false);
  for (let i = 0; i < moutons.length; i++) {
    if ((i + 1) % 2 === 1) {
      moutons[i].selectionne = true;
    }
  }
  afficherMoutons();
  console.log('Moutons impairs sélectionnés');
}

// Sélectionner aléatoirement N moutons
function selectionnerAleatoirement(nombre) {
  if (nombre < 0 || nombre > nombreTotalMoutons) {
    console.log(`Nombre invalide: ${nombre}. Doit être entre 0 et ${nombreTotalMoutons}`);
    return;
  }
  
  // Désélectionner tous
  moutons.forEach(m => m.selectionne = false);
  
  // Créer un tableau d'indices et les mélanger (Fisher-Yates)
  let indices = [];
  for (let i = 0; i < nombreTotalMoutons; i++) {
    indices.push(i);
  }
  
  // Mélanger le tableau
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  
  // Sélectionner les N premiers
  for (let i = 0; i < nombre; i++) {
    moutons[indices[i]].selectionne = true;
  }
  
  afficherMoutons();
  console.log(`${nombre} mouton(s) sélectionné(s) aléatoirement`);
}

// Initialisation
initialiserMoutons();

console.log('=== Compteur de Moutons ===');
console.log('');
console.log('Fonctions disponibles:');
console.log('  - selectionnerMouton(numero): Sélectionne un mouton par numéro');
console.log('  - selectionnerAleatoirement(nombre): Sélectionne N moutons au hasard');
console.log('  - compterAvecFor(debut, fin): Compte avec for');
console.log('  - compterAvecWhile(debut, fin): Compte avec while');
console.log('  - selectionnerPlusieurs(debut, fin): Sélectionne plusieurs moutons');
console.log('  - selectionnerPairs(): Sélectionne les moutons pairs');
console.log('  - selectionnerImpairs(): Sélectionne les moutons impairs');
console.log('');
console.log('Exemple:');
console.log('  selectionnerAleatoirement(5); // Sélectionne 5 moutons au hasard');
console.log('  for (let i = 1; i <= 5; i++) {');
console.log('    selectionnerMouton(i);');
console.log('  }');
