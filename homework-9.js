
// 4. К Форме, которая прикреплена в футере - добавить логику:
// email должен соответствовать стандартам (добавить валидацию), если он не заполнен - форма не отправляется. Кнопка "Подписаться" и есть "отправкой формы", при нажатии на которую мы будем выводить консоль лог в виде объекта:  { email: 'введенная почта' }

const footerForm = document.querySelector('.footer__form');
const footerEmailInput = document.querySelector('#footer-email');

function isValidEmail(email) {

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

footerForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const emailValue = footerEmailInput.value.trim();

  if (!emailValue || !isValidEmail(emailValue)) {
    console.warn('Некорректный email, форма не отправлена');
    return;
  }
  
  console.log({ email: emailValue });

});

//Уровень 2:
//5. Создать кнопку "Регистрация". Создать модальное окно, используя классы "modal, modal-showed". Логика такая: при нажатии на кнопку у нас открывается модальное окно путем добавления modal-showed к div с классом modal. Не забываем добавить кнопку для закрытия модалки (крестик в углу).  
//Важные правила создания модалки:
//1) Задний фон должен быть затемнён, но не полностью черный (Создаем класс overlay, который будет затемнять всю страницу)
//2) Модальное окно находиться ровно по центру страницы, независимо от масштаба

const registrationButton = document.querySelector('#registration-button');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeModalButton = document.querySelector('.modal-form__close-btn');

function openModal() {
  modal.classList.add('modal--showed');
  overlay.classList.add('overlay--showed');
}

function closeModal() {
  modal.classList.remove('modal--showed');
  overlay.classList.remove('overlay--showed');
}

registrationButton.addEventListener('click', openModal);

closeModalButton.addEventListener('click', (event) => {
  event.preventDefault(); 
  closeModal();
});

overlay.addEventListener('click', closeModal);