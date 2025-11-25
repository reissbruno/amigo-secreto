// Participantes com suas senhas
const USERS = {
  'Paula': 'praia2024',
  'Renato': 'sol4521',
  'Bruno': 'onda8837',
  'Cristina': 'areia1956',
  'Julia': 'coco7742',
  'Sthéfano': 'mar3318'
};

// Sorteio fixo e validado manualmente
// Regras: ninguém tira a si mesmo, Renato não tira Paula
const MATCHES = {
  'Paula': 'Julia',
  'Renato': 'Cristina',
  'Bruno': 'Renato',
  'Cristina': 'Sthéfano',
  'Julia': 'Paula',
  'Sthéfano': 'Bruno'
};

// Estado
let loggedUser = null;

// Elementos do DOM
const loginScreen = document.getElementById('login-screen');
const revealScreen = document.getElementById('reveal-screen');
const passwordInput = document.getElementById('password-input');
const errorMessage = document.getElementById('error-message');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const flipCard = document.getElementById('flip-card');
const userName = document.getElementById('user-name');
const secretFriend = document.getElementById('secret-friend');

// Funções
function findUserByPassword(password) {
  const participants = Object.keys(USERS);
  return participants.find(p => USERS[p] === password) || null;
}

function handleLogin() {
  const password = passwordInput.value.trim();

  if (!password) {
    showError('Digite sua senha!');
    return;
  }

  const user = findUserByPassword(password);

  if (!user) {
    showError('Senha incorreta! Verifique e tente novamente.');
    return;
  }

  loggedUser = user;
  showRevealScreen();
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.animation = 'none';
  setTimeout(() => {
    errorMessage.style.animation = 'bounce 0.5s';
  }, 10);
}

function showRevealScreen() {
  loginScreen.classList.add('hidden');
  revealScreen.classList.remove('hidden');
  userName.textContent = loggedUser;
  secretFriend.textContent = MATCHES[loggedUser];
  flipCard.classList.remove('flipped');
}

function handleLogout() {
  loggedUser = null;
  passwordInput.value = '';
  errorMessage.textContent = '';
  revealScreen.classList.add('hidden');
  loginScreen.classList.remove('hidden');
  flipCard.classList.remove('flipped');
  passwordInput.focus();
}

function toggleCard() {
  flipCard.classList.toggle('flipped');
}

// Event Listeners
loginBtn.addEventListener('click', handleLogin);

passwordInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    handleLogin();
  }
});

logoutBtn.addEventListener('click', handleLogout);

flipCard.addEventListener('click', toggleCard);

// Focus no input ao carregar
window.addEventListener('load', () => {
  passwordInput.focus();
});
