const STORAGE_KEY = 'usersData';
const DELETED_STORAGE_KEY = 'deletedUsers';

const statusMessage = document.getElementById('status-message');
const cardsContainer = document.getElementById('cards-container');
const controls = document.getElementById('controls');
const deleteAllBtn = document.getElementById('delete-all-btn');
const getAllBtn = document.getElementById('get-all-btn');
const restoreBtn = document.getElementById('restore-btn');

let users = [];
let deletedUsers = [];

document.addEventListener('DOMContentLoaded', async () => {
  await init();
  setupEventListeners();
});

async function init() {
  loadDeletedUsers();
  
  const storedData = localStorage.getItem(STORAGE_KEY);
  
  if (storedData) {
    try {
      users = JSON.parse(storedData);
      if (users.length > 0) {
        displayUsers(users);
        showControls();
        return;
      }
    } catch (error) {
      console.error('Ошибка при парсинге данных из localStorage:', error);
      localStorage.removeItem(STORAGE_KEY);
    }
  }
  
  showStatusMessage('Данные загружаются');
  await loadUsers();
}

function loadDeletedUsers() {
  const storedDeleted = localStorage.getItem(DELETED_STORAGE_KEY);
  if (storedDeleted) {
    try {
      deletedUsers = JSON.parse(storedDeleted);
    } catch (error) {
      console.error('Ошибка при загрузке удаленных пользователей:', error);
      deletedUsers = [];
    }
  }
}

function saveDeletedUsers() {
  localStorage.setItem(DELETED_STORAGE_KEY, JSON.stringify(deletedUsers));
}

async function loadUsers() {
  try {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const response = await fetch('users.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (!storedData) {
      users = Array.isArray(data) ? data : data.users || [];
      saveToLocalStorage();
    } else {
      users = JSON.parse(storedData);
    }
    
    displayUsers(users);
    showControls();
    hideStatusMessage();
    
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
    showStatusMessage('Ошибка при загрузке данных', 'error');
    hideControls();
  }
}

function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function displayUsers(usersToDisplay) {
  cardsContainer.innerHTML = '';
  
  if (usersToDisplay.length === 0) {
    showStatusMessage('Нет пользователей для отображения', 'info');
    return;
  }
  
  usersToDisplay.forEach((user, index) => {
    const card = createUserCard(user, index);
    cardsContainer.appendChild(card);
  });
}

function createUserCard(user, index) {
  const card = document.createElement('div');
  card.className = 'user-card';
  card.dataset.index = index;
  
  card.innerHTML = `
    <div class="card-header">
      <h3>${user.name || 'Без имени'}</h3>
      <button class="delete-card-btn" data-id="${user.id || index}">×</button>
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
    deleteUserCard(user.id || index);
  });
  
  return card;
}

function deleteUserCard(userId) {
  const userToDelete = users.find(user => (user.id || users.indexOf(user)) === userId);
  
  if (userToDelete) {
    deletedUsers.push(userToDelete);
    saveDeletedUsers();
    
    users = users.filter(user => (user.id || users.indexOf(user)) !== userId);
    
    saveToLocalStorage();
    displayUsers(users);
    showStatusMessage('Карточка удалена', 'success');
    setTimeout(() => hideStatusMessage(), 2000);
  }
}

function deleteAllCards() {
  if (users.length === 0) {
    showStatusMessage('Нет карточек для удаления', 'info');
    setTimeout(() => hideStatusMessage(), 2000);
    return;
  }
  
  deletedUsers = [...deletedUsers, ...users];
  saveDeletedUsers();
  
  users = [];
  saveToLocalStorage();
  displayUsers(users);
  hideControls();
  showStatusMessage('Все карточки удалены', 'success');
  setTimeout(() => hideStatusMessage(), 2000);
}

function getAllCards() {
  const storedData = localStorage.getItem(STORAGE_KEY);
  
  if (!storedData) {
    showStatusMessage('Нет сохраненных данных', 'info');
    setTimeout(() => hideStatusMessage(), 2000);
    return;
  }
  
  try {
    const allUsers = JSON.parse(storedData);
    
    if (users.length === allUsers.length && users.length > 0) {
      showStatusMessage('Все пользователи уже отображены', 'info');
      setTimeout(() => hideStatusMessage(), 2000);
      return;
    }
    
    users = allUsers;
    displayUsers(users);
    showControls();
    showStatusMessage('Все карточки загружены', 'success');
    setTimeout(() => hideStatusMessage(), 2000);
    
  } catch (error) {
    console.error('Ошибка при получении всех карточек:', error);
    showStatusMessage('Ошибка при загрузке данных', 'error');
  }
}

function restoreDeletedUsers() {
  if (deletedUsers.length === 0) {
    showStatusMessage('Нет удаленных пользователей для восстановления', 'info');
    setTimeout(() => hideStatusMessage(), 2000);
    return;
  }
  
  users = [...users, ...deletedUsers];
  saveToLocalStorage();
  
  deletedUsers = [];
  saveDeletedUsers();
  
  displayUsers(users);
  showControls();
  showStatusMessage(`Восстановлено ${deletedUsers.length} пользователей`, 'success');
  setTimeout(() => hideStatusMessage(), 2000);
}

function restoreUser(userId) {
  const userToRestore = deletedUsers.find(user => user.id === userId);
  
  if (userToRestore) {
    users.push(userToRestore);
    saveToLocalStorage();
    
    deletedUsers = deletedUsers.filter(user => user.id !== userId);
    saveDeletedUsers();
    
    displayUsers(users);
    showStatusMessage('Пользователь восстановлен', 'success');
    setTimeout(() => hideStatusMessage(), 2000);
  }
}

function showStatusMessage(message, type = 'loading') {
  statusMessage.textContent = message;
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
  restoreBtn.addEventListener('click', restoreDeletedUsers);
}