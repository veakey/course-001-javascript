// Canvas - L'Artiste Numérique
// Dessinez avec des commandes ou directement sur le canvas

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const clearBtn = document.getElementById('clear-btn');
const colorPicker = document.getElementById('color-picker');
const brushSize = document.getElementById('brush-size');
const brushSizeDisplay = document.getElementById('brush-size-display');

let couleurActuelle = '#ffffff';
let tailleActuelle = 5;
let dessine = false;

// Fonction pour effacer le canvas
function effacer() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  console.log('Canvas effacé');
}

// Fonction pour définir la couleur
function definirCouleur(couleur) {
  couleurActuelle = couleur;
  colorPicker.value = couleur;
  ctx.strokeStyle = couleur;
  ctx.fillStyle = couleur;
  console.log(`Couleur définie: ${couleur}`);
}

// Fonction pour définir la taille du pinceau
function definirTaille(taille) {
  tailleActuelle = taille;
  brushSize.value = taille;
  brushSizeDisplay.textContent = `${taille}px`;
  ctx.lineWidth = taille;
  console.log(`Taille définie: ${taille}px`);
}

// Fonction pour dessiner un cercle
function dessinerCercle(x, y, rayon) {
  ctx.beginPath();
  ctx.arc(x, y, rayon, 0, Math.PI * 2);
  ctx.fill();
  console.log(`Cercle dessiné à (${x}, ${y}) avec rayon ${rayon}`);
}

// Fonction pour dessiner un rectangle
function dessinerRectangle(x, y, largeur, hauteur) {
  ctx.fillRect(x, y, largeur, hauteur);
  console.log(`Rectangle dessiné à (${x}, ${y}) ${largeur}x${hauteur}`);
}

// Fonction pour dessiner une ligne
function dessinerLigne(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  console.log(`Ligne dessinée de (${x1}, ${y1}) à (${x2}, ${y2})`);
}

// Fonction pour remplir avec une couleur
function remplir(couleur) {
  ctx.fillStyle = couleur;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  console.log(`Canvas rempli avec la couleur ${couleur}`);
}

// Initialisation
ctx.fillStyle = '#000000';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = couleurActuelle;
ctx.fillStyle = couleurActuelle;
ctx.lineWidth = tailleActuelle;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';

// Gestion du dessin à la souris
canvas.addEventListener('mousedown', (e) => {
  dessine = true;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  ctx.beginPath();
  ctx.moveTo(x, y);
});

canvas.addEventListener('mousemove', (e) => {
  if (!dessine) return;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  ctx.lineTo(x, y);
  ctx.stroke();
});

canvas.addEventListener('mouseup', () => {
  dessine = false;
});

canvas.addEventListener('mouseleave', () => {
  dessine = false;
});

// Contrôles
clearBtn.addEventListener('click', effacer);
colorPicker.addEventListener('change', (e) => {
  definirCouleur(e.target.value);
});
brushSize.addEventListener('input', (e) => {
  definirTaille(parseInt(e.target.value));
  brushSizeDisplay.textContent = `${e.target.value}px`;
});

console.log('=== L\'Artiste Numérique ===');
console.log('');
console.log('Fonctions disponibles:');
console.log('  - effacer(): Efface le canvas');
console.log('  - definirCouleur(couleur): Définit la couleur (ex: "#ff0000")');
console.log('  - definirTaille(taille): Définit la taille du pinceau');
console.log('  - dessinerCercle(x, y, rayon): Dessine un cercle');
console.log('  - dessinerRectangle(x, y, largeur, hauteur): Dessine un rectangle');
console.log('  - dessinerLigne(x1, y1, x2, y2): Dessine une ligne');
console.log('  - remplir(couleur): Remplit le canvas avec une couleur');
console.log('');
console.log('Vous pouvez aussi dessiner directement avec la souris sur le canvas!');
console.log('');
console.log('Exemple:');
console.log('  definirCouleur("#ff0000");');
console.log('  dessinerCercle(300, 300, 50);');
console.log('  dessinerRectangle(100, 100, 200, 150);');
