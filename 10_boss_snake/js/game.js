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
let food = { x: 15, y: 15, type: 'blue' }; // 'blue': +1, 'green': +2, 'red': game over
let score = 0;
let nourrituresMangees = 0; // Compteur de nourritures mangées
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
  
  // Choisir un type de nourriture aléatoire
  const rand = Math.random();
  if (rand < 0.1) {
    food.type = 'red'; // 10% - Game over
  } else if (rand < 0.4) {
    food.type = 'green'; // 30% - Grandir de 2
  } else {
    food.type = 'blue'; // 60% - Grandir de 1
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
  
  // Dessiner la nourriture selon son type
  if (food.type === 'red') {
    ctx.fillStyle = '#ff6b6b';
  } else if (food.type === 'green') {
    ctx.fillStyle = '#51cf66';
  } else {
    ctx.fillStyle = '#4a9eff'; // blue
  }
  ctx.fillRect(food.x * gridSize + 1, food.y * gridSize + 1, gridSize - 2, gridSize - 2);
  
  // Dessiner le serpent
  snake.forEach((segment, index) => {
    if (index === 0) {
      // Tête
      ctx.fillStyle = '#4a9eff';
    } else {
      // Corps
      ctx.fillStyle = '#6bb3ff';
    }
    ctx.fillRect(segment.x * gridSize + 1, segment.y * gridSize + 1, gridSize - 2, gridSize - 2);
  });
}

// Fonction pour mettre à jour le jeu
function mettreAJour() {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/fa4766f7-5e1c-455a-ba2a-bc2044abe366',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'game.js:98',message:'mettreAJour entry',data:{gameRunning,gamePaused,direction:JSON.stringify(direction),snakeLength:snake.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  
  if (!gameRunning || gamePaused) {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/fa4766f7-5e1c-455a-ba2a-bc2044abe366',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'game.js:101',message:'mettreAJour early return',data:{gameRunning,gamePaused},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    return;
  }
  
  // Déplacer le serpent
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/fa4766f7-5e1c-455a-ba2a-bc2044abe366',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'game.js:107',message:'before collision check',data:{head:JSON.stringify(head),score,nourrituresMangees},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion
  
  // Vérifier les collisions avec les murs
  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/fa4766f7-5e1c-455a-ba2a-bc2044abe366',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'game.js:110',message:'wall collision',data:{head:JSON.stringify(head),tileCount},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    finPartie();
    dessiner(); // Dessiner une dernière fois pour afficher l'état final
    return;
  }
  
  // Vérifier les collisions avec le corps (exclure la tête actuelle)
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/fa4766f7-5e1c-455a-ba2a-bc2044abe366',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'game.js:118',message:'self collision',data:{head:JSON.stringify(head),collisionIndex:i},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      finPartie();
      dessiner(); // Dessiner une dernière fois pour afficher l'état final
      return;
    }
  }
  
  // Vérifier si le serpent mange la nourriture AVANT d'ajouter la tête
  if (head.x === food.x && head.y === food.y) {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/fa4766f7-5e1c-455a-ba2a-bc2044abe366',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'game.js:125',message:'food eaten',data:{foodType:food.type,scoreBefore:score,nourrituresMangeesBefore:nourrituresMangees},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
    
    // Rouge = game over
    if (food.type === 'red') {
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/fa4766f7-5e1c-455a-ba2a-bc2044abe366',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'game.js:129',message:'red food game over',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      finPartie();
      dessiner(); // Dessiner une dernière fois pour afficher l'état final
      return;
    }
    
    // Ajouter la tête
    snake.unshift(head);
    
    // Vert = grandir de 2, Bleu = grandir de 1
    const croissance = food.type === 'green' ? 2 : 1;
    
    // Ajouter les segments supplémentaires
    for (let i = 0; i < croissance - 1; i++) {
      snake.unshift(head);
    }
    
    nourrituresMangees++;
    score++;
    scoreDisplay.textContent = score;
    if (score > highScore) {
      highScore = score;
      highScoreDisplay.textContent = highScore;
      localStorage.setItem('snakeHighScore', highScore);
    }
    genererNourriture();
    
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/fa4766f7-5e1c-455a-ba2a-bc2044abe366',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'game.js:154',message:'after food eaten',data:{scoreAfter:score,nourrituresMangeesAfter:nourrituresMangees},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
  } else {
    // Ajouter la tête et retirer la queue
    snake.unshift(head);
    snake.pop();
    
    // Score augmente à chaque mouvement
    score++;
    scoreDisplay.textContent = score;
    if (score > highScore) {
      highScore = score;
      highScoreDisplay.textContent = highScore;
      localStorage.setItem('snakeHighScore', highScore);
    }
    
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/fa4766f7-5e1c-455a-ba2a-bc2044abe366',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'game.js:171',message:'normal movement',data:{scoreAfter:score,nourrituresMangees},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
  }
  
  // Ne pas appeler dessiner() ici, il sera appelé dans la boucle requestAnimationFrame
}

// Fonction pour démarrer le jeu
function demarrer() {
  if (gameRunning) return;
  
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: 0 };
  score = 0;
  nourrituresMangees = 0;
  scoreDisplay.textContent = score;
  gameRunning = true;
  gamePaused = false;
  gameOverDiv.style.display = 'none';
  genererNourriture();
  dessiner();
  
  // Utiliser requestAnimationFrame pour un rendu fluide sans scintillement
  let lastTime = 0;
  const gameSpeed = 150; // ms entre chaque mise à jour
  
  function gameLoop(currentTime) {
    if (!gameRunning) {
      // Si le jeu est terminé, dessiner une dernière fois puis arrêter
      dessiner();
      return;
    }
    
    if (currentTime - lastTime >= gameSpeed) {
      mettreAJour();
      lastTime = currentTime;
    }
    
    // Toujours redessiner pour un rendu fluide (sauf si gameRunning est devenu false dans mettreAJour)
    if (gameRunning) {
      dessiner();
    }
    
    if (gameRunning) {
      requestAnimationFrame(gameLoop);
    }
  }
  
  requestAnimationFrame(gameLoop);
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
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/fa4766f7-5e1c-455a-ba2a-bc2044abe366',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'game.js:181',message:'finPartie called',data:{gameRunningBefore:gameRunning,score,nourrituresMangees,gameLoopExists:!!gameLoop},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  
  gameRunning = false;
  gamePaused = false;
  // Plus besoin de clearInterval car on utilise requestAnimationFrame
  gameLoop = null;
  gameOverDiv.style.display = 'block';
  pauseBtn.textContent = 'Pause';
  
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/fa4766f7-5e1c-455a-ba2a-bc2044abe366',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'game.js:192',message:'finPartie after',data:{gameRunningAfter:gameRunning,gameLoopAfter:gameLoop},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  
  console.log(`Partie terminée! Score: ${score} (Mouvements: ${score - nourrituresMangees}, Nourritures: ${nourrituresMangees})`);
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
console.log('Objectif: Mangez la nourriture pour grandir et augmenter votre score!');
console.log('  - Bleu: Grandir de 1 segment');
console.log('  - Vert: Grandir de 2 segments');
console.log('  - Rouge: Game Over! Évitez-le!');
console.log('Évitez les murs et votre propre corps!');
