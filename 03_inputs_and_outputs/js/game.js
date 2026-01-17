// Le Farceur - Entrées et Sorties
// Utilisez prompt(), console.log(), et les fonctions d'affichage

const displayArea = document.getElementById('display-area');
const userInput = document.getElementById('user-input');
const submitBtn = document.getElementById('submit-input');

// Simuler prompt() dans le navigateur
function prompt(message) {
  const userResponse = window.prompt(message);
  if (userResponse === null) return null;
  console.log(`Entrée utilisateur: ${userResponse}`);
  return userResponse;
}

// Fonction pour afficher dans la zone d'affichage
function afficher(texte) {
  const p = document.createElement('p');
  p.style.color = 'var(--text-primary)';
  p.style.margin = '8px 0';
  p.textContent = texte;
  displayArea.appendChild(p);
  displayArea.scrollTop = displayArea.scrollHeight;
}

function effacer() {
  displayArea.innerHTML = '';
  console.log('Affichage effacé');
}

// Gestionnaire pour l'input utilisateur
let inputBuffer = [];
submitBtn.addEventListener('click', () => {
  const value = userInput.value;
  if (value) {
    inputBuffer.push(value);
    afficher(`> ${value}`);
    userInput.value = '';
  }
});

userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    submitBtn.click();
  }
});

// Fonction pour lire l'input (simule readline)
function lireInput() {
  return new Promise((resolve) => {
    const checkInput = () => {
      if (inputBuffer.length > 0) {
        resolve(inputBuffer.shift());
      } else {
        setTimeout(checkInput, 100);
      }
    };
    checkInput();
  });
}

// Exemple d'utilisation
console.log('=== Le Farceur - Entrées et Sorties ===');
console.log('');
console.log('Fonctions disponibles:');
console.log('  - prompt(message): Demande une entrée à l\'utilisateur');
console.log('  - afficher(texte): Affiche du texte dans la zone d\'affichage');
console.log('  - effacer(): Efface la zone d\'affichage');
console.log('  - console.log(texte): Affiche dans la console');
console.log('');
console.log('Exemple:');
console.log('  const nom = prompt("Quel est votre nom ?");');
console.log('  afficher("Bonjour " + nom + " !");');
