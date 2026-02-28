const loader = document.getElementById('loader');
const cardsGet = document.getElementById('get-cards');
const allCardsDelete = document.getElementById('delete-all-cards');
const cardDeleteBtn = document.getElementById('delete-card');
const userCards = document.getElementById('user-cards');
const userTemplate = document.getElementById('user-template');
const cardsLoadBtn = document.getElementById('cards-btn');
const buttons = document.querySelector('.buttons');

const STORAGE_KEY = 'users';

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  clearLoader();
  
  // Проверка наличия всех необходимых элементов
  if (!loader) console.warn('Элемент loader не найден');
  if (!cardsGet) console.warn('Элемент cardsGet не найден');
  if (!allCardsDelete) console.warn('Элемент allCardsDelete не найден');
  if (!cardDeleteBtn) console.warn('Элемент cardDeleteBtn не найден');
  if (!userCards) console.warn('Элемент userCards не найден');
  if (!userTemplate) console.warn('Элемент userTemplate не найден');
  if (!cardsLoadBtn) console.warn('Элемент cardsLoadBtn не найден');
  if (!buttons) console.warn('Элемент buttons не найден');
});

function showLoader(text) {
  if (loader) {
    loader.textContent = text;
    loader.style.display = 'block';
  }
}

function clearLoader() {
  if (loader) {
    loader.textContent = '';
    loader.style.display = 'none';
  }
}

function getFromStorage() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
}

function setToStorage(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function renderUsers(users) {
  if (!userCards || !userTemplate) {
    console.error('Элементы userCards или userTemplate не найдены');
    return;
  }

  if (!users || !Array.isArray(users) || users.length === 0) {
    console.warn('Нет данных для отображения');
    return;
  }

  userCards.innerHTML = '';

  users.forEach(user => {
    const clone = userTemplate.content.cloneNode(true);
    const idEl = clone.querySelector('.id');
    const nameEl = clone.querySelector('.name');
    const surnameEl = clone.querySelector('.surname');
    const emailEl = clone.querySelector('.email');
    const ageEl = clone.querySelector('.age');
    const heightEl = clone.querySelector('.height');

    if (idEl) idEl.textContent = `User ID: ${user.id}`;
    if (nameEl) nameEl.textContent = `Name: ${user.name}`;
    if (surnameEl) surnameEl.textContent = `Surname: ${user.surname}`;
    if (emailEl) emailEl.textContent = `E-mail: ${user.email}`;
    if (ageEl) ageEl.textContent = `Age: ${user.age}`;
    if (heightEl) heightEl.textContent = `Height: ${user.height}`;
    
    userCards.appendChild(clone);
  });
}

async function fetchUsersFromServer() {
  try {
    const response = await fetch('users.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.users;
  } catch (error) {
    console.error('Ошибка загрузки данных:', error);
    showLoader('Ошибка загрузки данных');
    throw error;
  }
}

function loadUsers() {
  showLoader('Данные загружаются...');

  return new Promise(async (resolve, reject) => {
    setTimeout(async () => {
      try {
        let users = getFromStorage();

        if (users && users.length) {
          resolve(users);
        } else {
          users = await fetchUsersFromServer();
          setToStorage(users);
          resolve(users);
        }
      } catch (error) {
        reject(error);
      }
    }, 1000);
  });
}

if (cardsLoadBtn) {
  cardsLoadBtn.addEventListener('click', async () => {
    if (cardsLoadBtn) cardsLoadBtn.style.display = 'none';
    if (buttons) buttons.style.display = 'flex';
    if (cardsGet) cardsGet.style.display = 'block';

    showLoader('Данные загружаются...');

    try {
      const users = await loadUsers();
      renderUsers(users);
      clearLoader();
    } catch (error) {
      console.error('Ошибка:', error);
      showLoader('Ошибка загрузки данных. Проверьте консоль.');
    }
  });
}

if (cardsGet) {
  cardsGet.addEventListener('click', async () => {
    let users = getFromStorage();

    if (!users || !users.length) {
      showLoader('Данные загружаются...');
      try {
        users = await loadUsers();
        clearLoader();
      } catch (error) {
        console.error('Ошибка:', error);
        showLoader('Ошибка загрузки данных. Проверьте консоль.');
        return;
      }
    }

    renderUsers(users);
  });
}

if (allCardsDelete) {
  allCardsDelete.addEventListener('click', () => {
    setTimeout(() => {
      localStorage.removeItem(STORAGE_KEY);
      if (userCards) userCards.innerHTML = '';
      showLoader('Данные удалены');
    }, 500);
  });
}

if (cardDeleteBtn) {
  cardDeleteBtn.addEventListener('click', () => {
    let users = getFromStorage();

    if (!users || !users.length) {
      localStorage.removeItem(STORAGE_KEY);
      if (userCards) userCards.innerHTML = '';
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
}