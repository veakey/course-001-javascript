// L'inventaire - Variables et Types de Données
// Déclarez des variables pour remplir votre inventaire

const inventoryDiv = document.getElementById('inventory');

// Inventaire global
let inventaire = [];

// Fonction pour ajouter un item à l'inventaire
function ajouterItem(nom, type, quantite = 1) {
  const nomStr = String(nom);
  const typeStr = String(type);
  const quantiteNum = Number(quantite);
  
  // Chercher si un item avec le même nom et type existe déjà
  const itemExistant = inventaire.find(item => 
    item.nom === nomStr && item.type === typeStr
  );
  
  if (itemExistant) {
    // Si l'item existe déjà, additionner les quantités
    itemExistant.quantite += quantiteNum - 2;
    console.log(`Quantité mise à jour: ${nomStr} (${typeStr}) x${itemExistant.quantite} (${quantiteNum} ajouté)`);
  } else {
    // Sinon, ajouter un nouvel item
    const item = {
      nom: nomStr,
      type: typeStr,
      quantite: quantiteNum
    };
    inventaire.push(item);
    console.log(`Item ajouté: ${item.nom} (${item.type}) x${item.quantite}`);
  }
  
  // Mettre à jour l'UI
  afficherInventaire();
}

// Fonction pour afficher l'inventaire
function afficherInventaire() {
  inventoryDiv.innerHTML = '';
  
  if (inventaire.length === 0) {
    inventoryDiv.innerHTML = '<p style="color: var(--text-secondary); grid-column: 1 / -1; text-align: center;">Inventaire vide</p>';
    return;
  }
  
  inventaire.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'inventory-item';
    itemDiv.innerHTML = `
      <div class="item-name">${item.nom}</div>
      <div class="item-type">Type: ${item.type}</div>
      <div class="item-quantity">Quantité: ${item.quantite}</div>
    `;
    inventoryDiv.appendChild(itemDiv);
  });
}

// Exemples de variables
let nomJoueur = "Aventurier";
let niveau = 5;
let or = 100;
let estVivant = true;

// Exemple d'utilisation
console.log('Variables déclarées:');
console.log('nomJoueur:', nomJoueur, '(string)');
console.log('niveau:', niveau, '(number)');
console.log('or:', or, '(number)');
console.log('estVivant:', estVivant, '(boolean)');
console.log('');
console.log('Utilisez ajouterItem(nom, type, quantite) pour ajouter des items à l\'inventaire');
console.log('Exemple: ajouterItem("Épée", "Arme", 1)');

// Initialisation
afficherInventaire();
