// File: modules/tamagotchi.js

// import Tamagotchi from './tamagotchi'
let userId = null;
let petId = null;
let petUsername = null;

// Register a new user
async function registerUser() {
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
  petUsername = document.getElementById('petUsername').value;

  const response = await fetch('/newPet', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
    name: JSON.stringify({ petUsername })
  })
  const data = await response.json();

  if (response.ok) {
    petId = data.petId;
    displayPet();
    document.getElementById('game-controls').style.display = 'none';
    document.getElementById('game-section').style.display = 'block';
  } else {
    alert(data.error);
  }
}

// Display Current State of Pet
async function displayPet() {
  const response = await fetch(`/state?gameId=${petId}`)
  const data = await response.json();
  
  if (response.ok) {
    document.getElementById()
  }
}