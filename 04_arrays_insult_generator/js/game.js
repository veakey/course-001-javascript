// Tableaux - Générateur d'Insultes Aléatoires
// Manipulez des tableaux pour générer des insultes créatives

const insultDisplay = document.getElementById('insult-display');
const generateBtn = document.getElementById('generate-btn');

// Tableaux d'exemples
let adjectifs = ['petit', 'gros', 'méchant', 'bizarre', 'drôle', 'stupide', 'lent', 'rapide'];
let noms = ['chat', 'chien', 'lapin', 'singe', 'ours', 'loup', 'tigre', 'lion'];
let verbes = ['mange', 'dort', 'court', 'saute', 'grimpe', 'nage', 'vole', 'creuse'];

// Fonction pour obtenir un élément aléatoire d'un tableau
function obtenirAleatoire(tableau) {
  const index = Math.floor(Math.random() * tableau.length);
  return tableau[index];
}

// Fonction pour générer une insulte
function genererInsulte() {
  const adj = obtenirAleatoire(adjectifs);
  const nom = obtenirAleatoire(noms);
  const verbe = obtenirAleatoire(verbes);
  
  const insulte = `Tu es un ${adj} ${nom} qui ${verbe} !`;
  afficherInsulte(insulte);
  console.log('Insulte générée:', insulte);
  return insulte;
}

function afficherInsulte(texte) {
  insultDisplay.innerHTML = `<p style="color: var(--text-primary); font-weight: bold;">${texte}</p>`;
}

// Fonction pour ajouter un élément à un tableau
function ajouterAdjectif(adj) {
  adjectifs.push(adj);
  console.log(`Adjectif ajouté: ${adj}. Total: ${adjectifs.length}`);
}

function ajouterNom(nom) {
  noms.push(nom);
  console.log(`Nom ajouté: ${nom}. Total: ${noms.length}`);
}

function ajouterVerbe(verbe) {
  verbes.push(verbe);
  console.log(`Verbe ajouté: ${verbe}. Total: ${verbes.length}`);
}

// Afficher les tableaux
function afficherTableaux() {
  console.log('Adjectifs:', adjectifs);
  console.log('Noms:', noms);
  console.log('Verbes:', verbes);
}

// Bouton de génération
generateBtn.addEventListener('click', () => {
  genererInsulte();
});

// Exemples
console.log('=== Générateur d\'Insultes Aléatoires ===');
console.log('');
console.log('Tableaux disponibles:');
afficherTableaux();
console.log('');
console.log('Fonctions disponibles:');
console.log('  - genererInsulte(): Génère une insulte aléatoire');
console.log('  - ajouterAdjectif(mot): Ajoute un adjectif');
console.log('  - ajouterNom(mot): Ajoute un nom');
console.log('  - ajouterVerbe(mot): Ajoute un verbe');
console.log('  - obtenirAleatoire(tableau): Retourne un élément aléatoire');
console.log('  - afficherTableaux(): Affiche tous les tableaux');
console.log('');
console.log('Exemple:');
console.log('  ajouterAdjectif("magnifique");');
console.log('  genererInsulte();');
