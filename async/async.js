// Ключ для локального хранилища
const STORAGE_KEY = 'usersData';

// Элементы DOM
const statusMessage = document.getElementById('status-message');
const cardsContainer = document.getElementById('cards-container');
const controls = document.getElementById('controls');
const deleteAllBtn = document.getElementById('delete-all-btn');
const getAllBtn = document.getElementById('get-all-btn');

// Текущее состояние
let users = [];

// Инициализация
document.addEventListener('DOMContentLoaded', async () => {
  await init();
  setupEventListeners();
});

async function init() {
  const storedData = localStorage.getItem(STORAGE_KEY);

  if (storedData) {
    try {
      users = JSON.parse(storedData);
      if (Array.isArray(users) && users.length > 0) {
        displayUsers(users);
        showControls();
        return;
      }
    } catch (e) {
      console.error('Ошибка парсинга localStorage:', e);
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  // Если данных нет — показываем "Данные загружаются" и грузим из JSON
  showStatusMessage('Данные загружаются', 'loading');
  await loadUsers();
}

async function loadUsers() {
  try {
    // Симуляция долгой загрузки
    await new Promise(resolve => setTimeout(resolve, 2000));

    const response = await fetch('users.json');
    if (!response.ok) {
      throw new Error(`Ошибка загрузки: ${response.status}`);
    }

    const data = await response.json();
    const loadedUsers = Array.isArray(data) ? data : data.users || [];

    users = loadedUsers;
    saveToLocalStorage();

    displayUsers(users);
    showControls();
    hideStatusMessage();
  } catch (error) {
    console.error(error);
    showStatusMessage('Ошибка при загрузке данных', 'error');
    hideControls();
  }
}

function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

// Рендер карточек
function displayUsers(list) {
  cardsContainer.innerHTML = '';

  if (!Array.isArray(list) || list.length === 0) {
    showStatusMessage('Нет пользователей для отображения', 'info');
    return;
  }

  hideStatusMessage();

  list.forEach(user => {
    const card = createUserCard(user);
    cardsContainer.appendChild(card);
  });
}

function createUserCard(user) {
  const card = document.createElement('div');
  card.className = 'user-card';

  const id = user.id ?? crypto.randomUUID?.() ?? Math.random().toString(36).slice(2);

  card.innerHTML = `
    <div class="card-header">
      <h3>${user.name || 'Без имени'}</h3>
      <button class="delete-card-btn" data-id="${id}">×</button>
    </div>
    <div class="card-body">
      <p><strong>Email:</strong> ${user.email || 'Не указан'}</p>
      <p><strong>Телефон:</strong> ${user.phone || 'Не указан'}</p>
      ${user.address ? `<p><strong>Адрес:</strong> ${user.address}</p>` : ''}
      ${user.company ? `<p><strong>Компания:</strong> ${user.company}</p>` : ''}
    </div>
  `;

  const deleteBtn = card.querySelector('.delete-card-btn');
  deleteBtn.addEventListener('click', () => {
    deleteUser(id);
  });

  // Присваиваем id в объект (чтобы работали удаления через filter)
  if (!user.id) {
    user.id = id;
    saveToLocalStorage();
  }

  return card;
}

// Удаление одного пользователя
function deleteUser(userId) {
  const initialLength = users.length;
  users = users.filter(user => String(user.id) !== String(userId));

  if (users.length < initialLength) {
    saveToLocalStorage();
    displayUsers(users);
    showStatusMessage('Карточка удалена', 'success');
    setTimeout(hideStatusMessage, 1500);
  }
}

// Удаление всех карточек
function deleteAllCards() {
  if (users.length === 0) {
    showStatusMessage('Нет карточек для удаления', 'info');
    setTimeout(hideStatusMessage, 1500);
    return;
  }

  users = [];
  saveToLocalStorage();
  displayUsers(users);
  hideControls();
  showStatusMessage('Все карточки удалены', 'success');
  setTimeout(hideStatusMessage, 1500);
}

// Получить все карточки из localStorage
function getAllCards() {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    showStatusMessage('Нет сохранённых данных', 'info');
    setTimeout(hideStatusMessage, 1500);
    return;
  }

  try {
    const allUsers = JSON.parse(stored);

    if (!Array.isArray(allUsers) || allUsers.length === 0) {
      showStatusMessage('Нет данных для отображения', 'info');
      setTimeout(hideStatusMessage, 1500);
      return;
    }

    if (users.length === allUsers.length && users.length > 0) {
      showStatusMessage('Все пользователи уже отображены', 'info');
      setTimeout(hideStatusMessage, 1500);
      return;
    }

    users = allUsers;
    displayUsers(users);
    showControls();
    showStatusMessage('Все карточки получены', 'success');
    setTimeout(hideStatusMessage, 1500);
  } catch (e) {
    console.error(e);
    showStatusMessage('Ошибка при загрузке данных', 'error');
  }
}

// Статусы / управление кнопками
function showStatusMessage(text, type = 'loading') {
  statusMessage.textContent = text;
  statusMessage.className = `status-message status-${type}`;
  statusMessage.style.display = 'block';
}

function hideStatusMessage() {
  statusMessage.style.display = 'none';
}

function showControls() {
  controls.style.display = 'flex';
}

function hideControls() {
  controls.style.display = 'none';
}

function setupEventListeners() {
  deleteAllBtn.addEventListener('click', deleteAllCards);
  getAllBtn.addEventListener('click', getAllCards);
}