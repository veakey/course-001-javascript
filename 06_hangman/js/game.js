// Le Pendu
// Devinez le mot lettre par lettre

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const wordDisplay = document.getElementById('word-display');
const lettersUsedDiv = document.getElementById('letters-used');
const letterInput = document.getElementById('letter-input');
const submitLetterBtn = document.getElementById('submit-letter');
const gameMessage = document.getElementById('game-message');
const wordSelectionContainer = document.getElementById('word-selection-container');
const gameControlsContainer = document.getElementById('game-controls-container');
const wordInput = document.getElementById('word-input');
const startGameBtn = document.getElementById('start-game-btn');
const newGameBtn = document.getElementById('new-game-btn');

// État du jeu
let motSecret = '';
let motAffiche = '';
let lettresUtilisees = [];
let erreurs = 0;
const maxErreurs = 10;
let partieEnCours = false;

// Liste de mots
const mots = ['JAVASCRIPT', 'PROGRAMMATION', 'DEVELOPPEUR', 'ALGORITHME', 'FONCTION', 'VARIABLE', 'BOUCLE', 'TABLEAU'];

// Fonction pour afficher un message de feedback
function afficherMessage(message, type = 'info') {
  if (gameMessage) {
    gameMessage.textContent = message;
    gameMessage.style.display = 'block';
    
    // Couleurs selon le type
    if (type === 'victoire') {
      gameMessage.style.color = '#4ade80'; // Vert
    } else if (type === 'defaite') {
      gameMessage.style.color = '#f87171'; // Rouge
    } else {
      gameMessage.style.color = 'var(--text-primary)';
    }
  }
}

// Fonction pour cacher le message
function cacherMessage() {
  if (gameMessage) {
    gameMessage.style.display = 'none';
    gameMessage.textContent = '';
  }
}

// Fonction pour afficher/masquer les contrôles
function afficherControlesJeu() {
  if (wordSelectionContainer) wordSelectionContainer.style.display = 'none';
  if (gameControlsContainer) gameControlsContainer.style.display = 'flex';
}

function afficherSelectionMot() {
  if (wordSelectionContainer) wordSelectionContainer.style.display = 'flex';
  if (gameControlsContainer) gameControlsContainer.style.display = 'none';
  if (wordInput) wordInput.value = '';
}

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
  cacherMessage();
  afficherControlesJeu();
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
      afficherMessage('🎉 Félicitations! Vous avez gagné! 🎉', 'victoire');
      console.log('Félicitations! Vous avez gagné!');
    }
  } else {
    // Mauvaise lettre
    erreurs++;
    dessinerPendu();
    console.log(`Mauvaise lettre. Erreurs: ${erreurs}/${maxErreurs}`);
    
    if (erreurs >= maxErreurs) {
      partieEnCours = false;
      afficherMessage(`😢 Perdu! Le mot était: ${motSecret}`, 'defaite');
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

// Exposer les fonctions globalement pour le bouton et l'initialisation
window.proposerLettre = proposerLettre;
window.nouvellePartie = nouvellePartie;
window.afficherSelectionMot = afficherSelectionMot;

// Gestionnaires d'événements pour les boutons
if (startGameBtn && wordInput) {
  startGameBtn.addEventListener('click', () => {
    const mot = wordInput.value.trim();
    if (mot && mot.length > 0) {
      nouvellePartie(mot);
    } else {
      nouvellePartie(); // Mot aléatoire si vide
    }
  });

  wordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      startGameBtn.click();
    }
  });

  wordInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.toUpperCase().replace(/[^A-Z]/g, '');
  });
}

if (newGameBtn) {
  newGameBtn.addEventListener('click', () => {
    afficherSelectionMot();
  });
}

// Initialisation
dessinerPendu();
afficherSelectionMot(); // Afficher la sélection de mot au démarrage
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
