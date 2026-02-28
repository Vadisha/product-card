const loader = document.getElementById('loader');
const cardsGet = document.getElementById('get-cards');
const allCardsDelete = document.getElementById('delete-all-cards');
const cardDeleteBtn = document.getElementById('delete-card');
const userCards = document.getElementById('user-cards');
const userTemplate = document.getElementById('user-template');
const cardsLoadBtn = document.getElementById('cards-btn');
const buttons = document.querySelector('.buttons');

const STORAGE_KEY = 'users';

function showLoader(text) {
  loader.textContent = text;
}

function clearLoader() {
  loader.textContent = '';
}

function getFromStorage() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

function setToStorage(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function renderUsers(users) {
  userCards.innerHTML = '';

  users.forEach(user => {
    const clone = userTemplate.content.cloneNode(true);
    clone.querySelector('.id').textContent = `User ID: ${user.id}`;
    clone.querySelector('.name').textContent = `Name: ${user.name}`;
    clone.querySelector('.surname').textContent = `Surname: ${user.surname}`;
    clone.querySelector('.email').textContent = `E-mail: ${user.email}`;
    clone.querySelector('.age').textContent = `Age: ${user.age}`;
    clone.querySelector('.height').textContent = `Height: ${user.height}`;
    userCards.appendChild(clone);
  });
}

async function fetchUsersFromServer() {
  const response = await fetch('/async/users.json');
  const data = await response.json();
  return data.users;
}

function loadUsers() {
  showLoader('Данные загружаются...');

  return new Promise(async (resolve) => {
    setTimeout(async () => {
      let users = getFromStorage();

      if (users && users.length) {
        resolve(users);
      } else {
        users = await fetchUsersFromServer();
        setToStorage(users);
        resolve(users);
      }
    }, 1000);
  });
}

cardsLoadBtn.addEventListener('click', async () => {
  cardsLoadBtn.style.display = 'none';
  buttons.style.display = 'flex';
  cardsGet.style.display = 'block';

  showLoader('Данные загружаются...');

  const users = await loadUsers();
  renderUsers(users);

  clearLoader();
});

cardsGet.addEventListener('click', async () => {
  let users = getFromStorage();

  if (!users || !users.length) {
    showLoader('Данные загружаются...');
    users = await loadUsers();
    clearLoader();
  }

  renderUsers(users);
});

allCardsDelete.addEventListener('click', () => {
  setTimeout(() => {
    localStorage.removeItem(STORAGE_KEY);
    userCards.innerHTML = '';
    showLoader('Данные удалены');
  }, 500);
});

cardDeleteBtn.addEventListener('click', () => {
  let users = getFromStorage();

  if (!users || !users.length) {
    localStorage.removeItem(STORAGE_KEY);
    userCards.innerHTML = '';
    return;
  }

  users = users.slice(1);

  if (!users.length) {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    setToStorage(users);
  }

  renderUsers(users);
});