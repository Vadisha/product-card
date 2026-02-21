// Ключ для локального хранилища
const STORAGE_KEY = 'usersData';

// Элементы DOM
const statusMessage = document.getElementById('status-message');
const cardsContainer = document.getElementById('cards-container');
const controls = document.getElementById('controls');
const deleteAllBtn = document.getElementById('delete-all-btn');
const getAllBtn = document.getElementById('get-all-btn');

// Состояние приложения
let users = [];

// Ссылки на обработчики для возможности их удаления
let deleteAllHandler = null;
let getAllHandler = null;

// Маппинг селекторов для полей карточки
const fieldSelectors = {
  name: '.card-name',
  email: '.card-email',
  phone: '.card-phone',
  address: { container: '.card-address', text: '.card-address-text' },
  company: { container: '.card-company', text: '.card-company-text' }
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', async () => {
  await init();
  setupEventListeners();
});

// Получение пользователей из localStorage с валидацией
function getUsersFromStorage() {
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (!storedData) return null;
  
  try {
    const parsed = JSON.parse(storedData);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (e) {
    console.error('Ошибка парсинга localStorage:', e);
    localStorage.removeItem(STORAGE_KEY);
  }
  
  return null;
}

// Генерация ID для пользователя
function generateUserId(user) {
  if (user.id) return user.id;
  return crypto.randomUUID?.() || Date.now().toString(36) + Math.random().toString(36).slice(2);
}

// Инициализация: проверка локального хранилища и загрузка данных
async function init() {
  const storedUsers = getUsersFromStorage();
  
  if (storedUsers) {
    users = storedUsers;
    displayUsers(users);
    showControls();
    return;
  }
  
  // Если данных нет — показываем "Данные загружаются" и грузим из JSON
  showStatusMessage('Данные загружаются', 'loading');
  await loadUsers();
}

// Загрузка пользователей из JSON файла
async function loadUsers() {
  try {
    // Симуляция длительной загрузки
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

// Сохранение в локальное хранилище
function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

// Установка опционального поля в карточке
function setOptionalField(card, user, fieldName, selectors) {
  if (!user[fieldName]) return;
  
  const container = card.querySelector(selectors.container);
  const textEl = card.querySelector(selectors.text);
  
  if (container && textEl) {
    textEl.textContent = user[fieldName];
    container.style.display = 'block';
  }
}

// Отображение пользователей в виде карточек
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

// Создание карточки пользователя
function createUserCard(user) {
  const template = document.getElementById('user-card-template');
  const card = template.content.cloneNode(true).querySelector('.user-card');

  const id = generateUserId(user);

  // Заполнение основных полей
  const nameEl = card.querySelector(fieldSelectors.name);
  const emailEl = card.querySelector(fieldSelectors.email);
  const phoneEl = card.querySelector(fieldSelectors.phone);

  if (nameEl) nameEl.textContent = user.name || 'Без имени';
  if (emailEl) emailEl.textContent = user.email || 'Не указан';
  if (phoneEl) phoneEl.textContent = user.phone || 'Не указан';

  // Заполнение опциональных полей
  setOptionalField(card, user, 'address', fieldSelectors.address);
  setOptionalField(card, user, 'company', fieldSelectors.company);

  // Настройка кнопки удаления
  const deleteBtn = card.querySelector('.delete-card-btn');
  if (deleteBtn) {
    deleteBtn.setAttribute('data-id', id);
    deleteBtn.addEventListener('click', () => deleteUser(id));
  }

  // Сохранение ID в объект пользователя, если его не было
  if (!user.id) {
    user.id = id;
    saveToLocalStorage();
  }

  return card;
}

// Удаление конкретной карточки
function deleteUser(userId) {
  const initialLength = users.length;
  users = users.filter(user => String(user.id) !== String(userId));
  
  if (users.length < initialLength) {
    saveToLocalStorage();
    displayUsers(users);
    showTemporaryMessage('Карточка удалена', 'success');
  }
}

// Удаление всех карточек
function deleteAllCards() {
  if (users.length === 0) {
    showTemporaryMessage('Нет карточек для удаления', 'info');
    return;
  }
  
  users = [];
  saveToLocalStorage();
  displayUsers(users);
  hideControls();
  showTemporaryMessage('Все карточки удалены', 'success');
}

// Получение всех карточек
function getAllCards() {
  const storedUsers = getUsersFromStorage();
  
  if (!storedUsers) {
    showTemporaryMessage('Нет сохранённых данных', 'info');
    return;
  }
  
  if (users.length === storedUsers.length && users.length > 0) {
    showTemporaryMessage('Все пользователи уже отображены', 'info');
    return;
  }
  
  users = storedUsers;
  displayUsers(users);
  showControls();
  showTemporaryMessage('Все карточки получены', 'success');
}

// Показать сообщение о статусе (с опциональным автоскрытием)
function showStatusMessage(text, type = 'loading', duration = null) {
  statusMessage.textContent = text;
  statusMessage.className = `status-message status-${type}`;
  statusMessage.style.display = 'block';
  
  if (duration !== null) {
    setTimeout(() => hideStatusMessage(), duration);
  }
}

// Показать временное сообщение (автоматически скрывается)
function showTemporaryMessage(text, type, duration = 1500) {
  showStatusMessage(text, type, duration);
}

// Скрыть сообщение о статусе
function hideStatusMessage() {
  statusMessage.style.display = 'none';
}

// Показать кнопки управления
function showControls() {
  controls.style.display = 'flex';
  setupEventListeners();
}

// Скрыть кнопки управления
function hideControls() {
  controls.style.display = 'none';
  removeEventListeners();
}

// Настройка обработчиков событий
function setupEventListeners() {
  // Удаляем старые обработчики, если они есть
  removeEventListeners();
  
  // Создаем новые обработчики и сохраняем ссылки
  deleteAllHandler = deleteAllCards;
  getAllHandler = getAllCards;
  
  deleteAllBtn.addEventListener('click', deleteAllHandler);
  getAllBtn.addEventListener('click', getAllHandler);
}

// Удаление обработчиков событий
function removeEventListeners() {
  if (deleteAllHandler) {
    deleteAllBtn.removeEventListener('click', deleteAllHandler);
    deleteAllHandler = null;
  }
  
  if (getAllHandler) {
    getAllBtn.removeEventListener('click', getAllHandler);
    getAllHandler = null;
  }
}