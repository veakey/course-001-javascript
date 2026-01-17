// Le Pendu
// Devinez le mot lettre par lettre

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const wordDisplay = document.getElementById('word-display');
const lettersUsedDiv = document.getElementById('letters-used');
const letterInput = document.getElementById('letter-input');
const submitLetterBtn = document.getElementById('submit-letter');

// État du jeu
let motSecret = '';
let motAffiche = '';
let lettresUtilisees = [];
let erreurs = 0;
const maxErreurs = 10;
let partieEnCours = false;

// Liste de mots
const mots = ['JAVASCRIPT', 'PROGRAMMATION', 'DEVELOPPEUR', 'ALGORITHME', 'FONCTION', 'VARIABLE', 'BOUCLE', 'TABLEAU'];

// Fonction pour démarrer une nouvelle partie
function nouvellePartie(mot = null) {
  if (mot) {
    motSecret = mot.toUpperCase();
  } else {
    motSecret = mots[Math.floor(Math.random() * mots.length)];
  }
  motAffiche = '_'.repeat(motSecret.length);
  lettresUtilisees = [];
  erreurs = 0;
  partieEnCours = true;
  dessinerPendu();
  afficherMot();
  afficherLettresUtilisees();
  console.log('Nouvelle partie démarrée!');
  console.log(`Mot à deviner: ${motAffiche}`);
}

// Fonction pour proposer une lettre
function proposerLettre(lettre) {
  if (!partieEnCours) {
    console.log('Démarrez une nouvelle partie avec nouvellePartie()');
    return;
  }

  lettre = lettre.toUpperCase();
  
  if (lettre.length !== 1 || !/[A-Z]/.test(lettre)) {
    console.log('Veuillez entrer une seule lettre');
    return;
  }

  if (lettresUtilisees.includes(lettre)) {
    console.log(`La lettre ${lettre} a déjà été utilisée`);
    return;
  }

  lettresUtilisees.push(lettre);
  afficherLettresUtilisees();

  if (motSecret.includes(lettre)) {
    // Lettre trouvée
    let nouveauMot = '';
    for (let i = 0; i < motSecret.length; i++) {
      if (motSecret[i] === lettre) {
        nouveauMot += lettre;
      } else {
        nouveauMot += motAffiche[i];
      }
    }
    motAffiche = nouveauMot;
    afficherMot();
    console.log(`Bonne lettre! ${lettre} trouvée`);
    
    if (motAffiche === motSecret) {
      partieEnCours = false;
      console.log('Félicitations! Vous avez gagné!');
    }
  } else {
    // Mauvaise lettre
    erreurs++;
    dessinerPendu();
    console.log(`Mauvaise lettre. Erreurs: ${erreurs}/${maxErreurs}`);
    
    if (erreurs >= maxErreurs) {
      partieEnCours = false;
      console.log(`Perdu! Le mot était: ${motSecret}`);
    }
  }
}

// Afficher le mot
function afficherMot() {
  wordDisplay.textContent = motAffiche.split('').join(' ');
}

// Afficher les lettres utilisées
function afficherLettresUtilisees() {
  lettersUsedDiv.textContent = `Lettres utilisées: ${lettresUtilisees.join(', ')}`;
}

// Dessiner le pendu
function dessinerPendu() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 3;

  // Potence - base (toujours visible dès le début)
  if (erreurs >= 0) {
    ctx.beginPath();
    ctx.moveTo(50, 450);
    ctx.lineTo(150, 450);
    ctx.stroke();
  }

  // Potence - poteau vertical
  if (erreurs >= 1) {
    ctx.beginPath();
    ctx.moveTo(100, 450);
    ctx.lineTo(100, 50);
    ctx.stroke();
  }

  // Potence - traverse horizontale
  if (erreurs >= 2) {
    ctx.beginPath();
    ctx.moveTo(100, 50);
    ctx.lineTo(250, 50);
    ctx.stroke();
  }

  // Potence - corde
  if (erreurs >= 3) {
    ctx.beginPath();
    ctx.moveTo(250, 50);
    ctx.lineTo(250, 80);
    ctx.stroke();
  }

  // Tête
  if (erreurs >= 4) {
    ctx.beginPath();
    ctx.arc(250, 120, 30, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Tronc
  if (erreurs >= 5) {
    ctx.beginPath();
    ctx.moveTo(250, 150);
    ctx.lineTo(250, 300);
    ctx.stroke();
  }

  // Bras gauche
  if (erreurs >= 6) {
    ctx.beginPath();
    ctx.moveTo(250, 180);
    ctx.lineTo(200, 230);
    ctx.stroke();
  }

  // Bras droit
  if (erreurs >= 7) {
    ctx.beginPath();
    ctx.moveTo(250, 180);
    ctx.lineTo(300, 230);
    ctx.stroke();
  }

  // Jambe gauche
  if (erreurs >= 8) {
    ctx.beginPath();
    ctx.moveTo(250, 300);
    ctx.lineTo(200, 380);
    ctx.stroke();
  }

  // Jambe droite
  if (erreurs >= 9) {
    ctx.beginPath();
    ctx.moveTo(250, 300);
    ctx.lineTo(300, 380);
    ctx.stroke();
  }

  // Visage triste
  if (erreurs >= maxErreurs) {
    ctx.beginPath();
    ctx.moveTo(240, 110);
    ctx.lineTo(245, 115);
    ctx.moveTo(255, 115);
    ctx.lineTo(260, 110);
    ctx.moveTo(250, 130);
    ctx.arc(250, 130, 5, 0, Math.PI);
    ctx.stroke();
  }
}

// Gestion de l'input utilisateur
submitLetterBtn.addEventListener('click', () => {
  const lettre = letterInput.value.trim();
  if (lettre) {
    proposerLettre(lettre);
    letterInput.value = '';
    letterInput.focus();
  }
});

letterInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    submitLetterBtn.click();
  }
});

letterInput.addEventListener('input', (e) => {
  e.target.value = e.target.value.toUpperCase().replace(/[^A-Z]/g, '');
});

// Initialisation
dessinerPendu();
console.log('=== Le Pendu ===');
console.log('');
console.log('Fonctions disponibles:');
console.log('  - nouvellePartie(mot): Démarre une nouvelle partie');
console.log('  - proposerLettre(lettre): Propose une lettre');
console.log('');
console.log('Exemple:');
console.log('  nouvellePartie("JAVASCRIPT");');
console.log('  proposerLettre("J");');
console.log('  proposerLettre("A");');
