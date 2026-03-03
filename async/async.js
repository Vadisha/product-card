import {
    removeFromStorage,
    overwriteStorageData,
    setToStorage,
    getFromStorage,
    updateStorageDataByFilter
} from "./localStorage.js";

const userDataTemplate = document.querySelector('.user-data-template');
const usersList = document.querySelector('.users-list');
const allUsersDeleteBtn = document.querySelector('.btn-delete-all-users');
const allUsersDisplayBtn = document.querySelector('.btn-display-all-users');
const usersContainer = document.querySelector('.users-div-container');
const userLoad = document.querySelector('.users-loading');

function showLoad() {
    userLoad.style.display = 'block';
}

function hideLoad() {
    userLoad.style.display = 'none';
}

let userData;

async function fetchUsers() {
    showLoad();

    setTimeout(async () => {
        try {
            const result = await fetch('./users.JSON'); // относительный путь

            if (!result.ok) throw new Error(`Ошибка: ${result.status}`);

            const userInfo = await result.json();

            userData = userInfo;
            hideLoad();
            renderUsers(userData);
            setToStorage('users', userData);
        } catch (error) {
            hideLoad();
            console.error(error.message);
        }
    }, 2000);
}

fetchUsers();

function renderUsers(userData) {
    userData.users.forEach(user => {
        const usersClone = userDataTemplate.content.cloneNode(true);

        usersClone.querySelector('.user-img').src = `./img/${user.img}.jpg`; // лучше тоже относительный путь
        usersClone.querySelector('.user-name').textContent = `Имя: ${user.name}`;
        usersClone.querySelector('.user-surname').textContent = `Фамилия: ${user.surname}`;
        usersClone.querySelector('.user-id').textContent = `ID: ${user.id}`;
        usersClone.querySelector('.user-email').textContent = `Email: ${user.email}`;
        usersClone.querySelector('.user-age').textContent = `Возраст: ${user.age}`;

        const userCardHandleBtn = usersClone.querySelector('.btn-delete-user');
        userCardHandleBtn.dataset.id = user.id;

        userCardHandleBtn.addEventListener('click', (event) => {
            const userId = event.target.dataset.id;
            const deleteUser = event.target.closest('.users-div-container');

            deleteUser.remove();
            updateStorageDataByFilter('users', userId);
        });

        usersList.appendChild(usersClone);
    });
}


allUsersDeleteBtn.addEventListener('click', () => {
    usersList.innerHTML = '';
    removeFromStorage('users');
});


allUsersDisplayBtn.addEventListener('click', () => {
    const currentCardsCount = usersList.children.length;
    const totalUsersCount = userData.users.length;

    if (currentCardsCount === totalUsersCount) {
        console.log('Пользователи уже имеются');
        return;
    }

    showLoad();

    setTimeout(() => {
        hideLoad();
        usersList.innerHTML = '';
        renderUsers(userData);
        setToStorage('users', userData);
    }, 2000);
});