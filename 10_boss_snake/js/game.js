// Boss Final - Snake
// Jeu Snake classique avec contrôles au clavier

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const restartBtn = document.getElementById('restart-btn');
const gameOverDiv = document.getElementById('game-over');

// Configuration
const gridSize = 20;
const tileCount = canvas.width / gridSize;

// État du jeu
let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 15, y: 15 };
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameRunning = false;
let gamePaused = false;
let gameLoop = null;

// Initialisation
highScoreDisplay.textContent = highScore;

// Fonction pour générer de la nourriture
function genererNourriture() {
  food.x = Math.floor(Math.random() * tileCount);
  food.y = Math.floor(Math.random() * tileCount);
  
  // Vérifier que la nourriture n'est pas sur le serpent
  for (let segment of snake) {
    if (segment.x === food.x && segment.y === food.y) {
      genererNourriture();
      return;
    }
  }
}

// Fonction pour dessiner
function dessiner() {
  // Effacer le canvas
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Dessiner la grille
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= tileCount; i++) {
    ctx.beginPath();
    ctx.moveTo(i * gridSize, 0);
    ctx.lineTo(i * gridSize, canvas.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i * gridSize);
    ctx.lineTo(canvas.width, i * gridSize);
    ctx.stroke();
  }
  
  // Dessiner la nourriture
  ctx.fillStyle = '#ff6b6b';
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
  
  // Dessiner le serpent
  snake.forEach((segment, index) => {
    if (index === 0) {
      // Tête
      ctx.fillStyle = '#4a9eff';
    } else {
      // Corps
      ctx.fillStyle = '#6bb3ff';
    }
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
  });
}

// Fonction pour mettre à jour le jeu
function mettreAJour() {
  if (!gameRunning || gamePaused) return;
  
  // Déplacer le serpent
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  
  // Vérifier les collisions avec les murs
  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
    finPartie();
    return;
  }
  
  // Vérifier les collisions avec le corps (exclure la tête actuelle)
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      finPartie();
      return;
    }
  }
  
  snake.unshift(head);
  
  // Vérifier si le serpent mange la nourriture
  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreDisplay.textContent = score;
    if (score > highScore) {
      highScore = score;
      highScoreDisplay.textContent = highScore;
      localStorage.setItem('snakeHighScore', highScore);
    }
    genererNourriture();
  } else {
    snake.pop();
  }
  
  dessiner();
}

// Fonction pour démarrer le jeu
function demarrer() {
  if (gameRunning) return;
  
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: 0 };
  score = 0;
  scoreDisplay.textContent = score;
  gameRunning = true;
  gamePaused = false;
  gameOverDiv.style.display = 'none';
  genererNourriture();
  dessiner();
  
  gameLoop = setInterval(mettreAJour, 150);
  console.log('Jeu démarré! Utilisez les flèches pour contrôler le serpent.');
}

// Fonction pour mettre en pause
function pause() {
  if (!gameRunning) return;
  gamePaused = !gamePaused;
  pauseBtn.textContent = gamePaused ? 'Reprendre' : 'Pause';
  console.log(gamePaused ? 'Jeu en pause' : 'Jeu repris');
}

// Fonction pour finir la partie
function finPartie() {
  gameRunning = false;
  gamePaused = false;
  clearInterval(gameLoop);
  gameOverDiv.style.display = 'block';
  pauseBtn.textContent = 'Pause';
  console.log(`Partie terminée! Score: ${score}`);
}

// Fonction pour rejouer
function rejouer() {
  finPartie();
  setTimeout(demarrer, 100);
}

// Contrôles clavier
document.addEventListener('keydown', (e) => {
  if (!gameRunning || gamePaused) return;
  
  switch(e.key) {
    case 'ArrowUp':
      if (direction.y === 0) {
        direction = { x: 0, y: -1 };
      }
      break;
    case 'ArrowDown':
      if (direction.y === 0) {
        direction = { x: 0, y: 1 };
      }
      break;
    case 'ArrowLeft':
      if (direction.x === 0) {
        direction = { x: -1, y: 0 };
      }
      break;
    case 'ArrowRight':
      if (direction.x === 0) {
        direction = { x: 1, y: 0 };
      }
      break;
  }
});

// Boutons
startBtn.addEventListener('click', demarrer);
pauseBtn.addEventListener('click', pause);
restartBtn.addEventListener('click', rejouer);

// Initialisation
dessiner();
console.log('=== Snake - Boss Final ===');
console.log('');
console.log('Contrôles:');
console.log('  - Flèches: Déplacer le serpent');
console.log('  - Démarrer: Commence une nouvelle partie');
console.log('  - Pause: Met en pause/reprend le jeu');
console.log('');
console.log('Objectif: Mangez la nourriture rouge pour grandir et augmenter votre score!');
console.log('Évitez les murs et votre propre corps!');
