// Le Robot et le Codeur
// Déplacez le robot en utilisant les fonctions avancer(), reculer(), tournerGauche(), tournerDroite()

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Configuration de la grille
const tileSize = 40;
const tileCountX = Math.floor(canvas.width / tileSize);
const tileCountY = Math.floor(canvas.height / tileSize);

// État du robot (coordonnées grille)
let robotGridX = Math.floor(tileCountX / 2);
let robotGridY = Math.floor(tileCountY / 2);
let robotAngle = 0; // Angle en degrés (0 = vers la droite)
const robotSize = 30;

// Queue d'instructions pour l'animation
let instructionQueue = [];
let isExecuting = false;
const DELAY_MS = 100;

// Fonction pour exécuter la queue d'instructions avec délai
async function executerQueue() {
  if (isExecuting) return;
  isExecuting = true;
  
  while (instructionQueue.length > 0) {
    const instruction = instructionQueue.shift();
    instruction();
    dessiner();
    await new Promise(resolve => setTimeout(resolve, DELAY_MS));
  }
  
  isExecuting = false;
}

// Fonctions de mouvement (ajoutent à la queue)
function avancer() {
  instructionQueue.push(() => {
    // Calculer la direction de déplacement selon l'angle
    let deltaX = 0;
    let deltaY = 0;
    
    if (robotAngle === 0) {
      deltaX = 1; // Droite
    } else if (robotAngle === 90 || robotAngle === -270) {
      deltaY = 1; // Bas
    } else if (robotAngle === 180 || robotAngle === -180) {
      deltaX = -1; // Gauche
    } else if (robotAngle === 270 || robotAngle === -90) {
      deltaY = -1; // Haut
    }
    
    // Déplacer d'une case dans la grille
    const newX = robotGridX + deltaX;
    const newY = robotGridY + deltaY;
    
    // Vérifier les limites
    if (newX >= 0 && newX < tileCountX && newY >= 0 && newY < tileCountY) {
      robotGridX = newX;
      robotGridY = newY;
    }
    
    console.log(`Robot avance. Position grille: (${robotGridX}, ${robotGridY})`);
  });
  
  executerQueue();
}

function reculer() {
  instructionQueue.push(() => {
    // Calculer la direction de déplacement inverse selon l'angle
    let deltaX = 0;
    let deltaY = 0;
    
    if (robotAngle === 0) {
      deltaX = -1; // Gauche
    } else if (robotAngle === 90 || robotAngle === -270) {
      deltaY = -1; // Haut
    } else if (robotAngle === 180 || robotAngle === -180) {
      deltaX = 1; // Droite
    } else if (robotAngle === 270 || robotAngle === -90) {
      deltaY = 1; // Bas
    }
    
    // Déplacer d'une case dans la grille
    const newX = robotGridX + deltaX;
    const newY = robotGridY + deltaY;
    
    // Vérifier les limites
    if (newX >= 0 && newX < tileCountX && newY >= 0 && newY < tileCountY) {
      robotGridX = newX;
      robotGridY = newY;
    }
    
    console.log(`Robot recule. Position grille: (${robotGridX}, ${robotGridY})`);
  });
  
  executerQueue();
}

function tournerGauche() {
  instructionQueue.push(() => {
    robotAngle -= 90;
    console.log(`Robot tourne à gauche. Angle: ${robotAngle}°`);
  });
  
  executerQueue();
}

function tournerDroite() {
  instructionQueue.push(() => {
    robotAngle += 90;
    console.log(`Robot tourne à droite. Angle: ${robotAngle}°`);
  });
  
  executerQueue();
}

function dessiner() {
  // Effacer le canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Dessiner la grille
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= canvas.width; i += tileSize) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
  }
  for (let i = 0; i <= canvas.height; i += tileSize) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
    ctx.stroke();
  }
  
  // Convertir coordonnées grille en pixels (centre de la case)
  const robotX = robotGridX * tileSize + tileSize / 2;
  const robotY = robotGridY * tileSize + tileSize / 2;
  
  // Dessiner le robot
  ctx.save();
  ctx.translate(robotX, robotY);
  ctx.rotate((robotAngle * Math.PI) / 180);
  
  // Corps du robot (carré)
  ctx.fillStyle = '#4a9eff';
  ctx.fillRect(-robotSize / 2, -robotSize / 2, robotSize, robotSize);
  
  // Bordure
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.strokeRect(-robotSize / 2, -robotSize / 2, robotSize, robotSize);
  
  // Direction (flèche)
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(robotSize / 2 - 5, 0);
  ctx.lineTo(robotSize / 2 - 15, -8);
  ctx.lineTo(robotSize / 2 - 15, 8);
  ctx.closePath();
  ctx.fill();
  
  ctx.restore();
}

// Initialisation
dessiner();
console.log('Robot initialisé au centre. Utilisez avancer(), reculer(), tournerGauche(), tournerDroite()');
