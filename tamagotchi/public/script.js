// File: modules/tamagotchi.js

// import Tamagotchi from './tamagotchi'
let userId = null;
let petId = null;
let petUsername = null;

// Register a new user
async function registerUser() {
  console.log("User Registered");
  const username = document.getElementById('register-username').value;
  if (!username) return alert('Username cannot be empty!');

  const response = await fetch('/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username }),
  });
  const data = await response.json();

  if (response.ok) {
    userId = data.id;
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('game-controls').style.display = 'block';
  } else {
    alert(data.error);
  }
}

// Login an existing user
async function loginUser() {
  console.log("User Logged In");
  const username = document.getElementById('login-username').value;
  if (!username) return alert('Username cannot be empty!');

  const response = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username }),
  });
  const data = await response.json();

  if (response.ok) {
    userId = data.id;
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('game-controls').style.display = 'block';
  } else {
    alert(data.error);
  }
}

// Assigns New Pet to User
async function newPet() {
  if (!userId) return alert('Please register or login first!');
  const petName = document.getElementById('pet-username').value;

  const response = await fetch('/newPet', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, petUsername: petName })
  });
  const data = await response.json();

  if (response.ok) {
    petId = data.petId;
    petUsername = petName; // Update petUsername with the new pet's name
    document.getElementById('game-controls').style.display = 'none';
    document.getElementById('game-section').style.display = 'block';
  } else {
    alert(data.error);
  }
}

// // Display Current State of Pet
// async function displayPet() {
//   const response = await fetch(`/state?gameId=${petId}`)
//   const data = await response.json();
  
//   if (response.ok) {
//     document.getElementById()
//   }
// }

// Display All pets
async function displayPets() {
  console.log("Entered displayPets");
  const response = await fetch('/pets');
  const data = await response.json();
  console.log("data");
  console.log(data.table);

  if (response.ok) {
      data.table.forEach(pet => {
          const petElement = document.createElement('button');
          petElement.textContent = `${pet.pet_type}: ${pet.pet_name}`;
          petElement.classList.add('btn', 'btn-outline-success', 'mb-2', 'mr-2');
          petElement.addEventListener('click', () => pullPet(pet.pet_name));
          document.getElementById('pet-words-grid').appendChild(petElement);
      });
  } else {
      console.error('Failed to fetch pets');
  }
}

async function pullPet(petName) {
  petUsername = petName;
  // document.getElementById('pet-words-grid').style.display = 'none';
  // document.getElementById('last-pet-button').style.display = 'block';
  document.getElementById('selected-pet-name').textContent = petUsername;
}



function getPetUsername() {
  document.getElementById('game-controls').style.display = 'none';
  document.getElementById('game-section').style.display = 'block';
}

function resetGameSections() {
  document.getElementById('game-section').style.display = 'none';
  document.getElementById('game-controls').style.display = 'none';
  document.getElementById('auth-section').style.display = 'block';
}

