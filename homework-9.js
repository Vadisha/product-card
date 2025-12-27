import { Form } from './Form.js';
import { Modal } from './Modal.js';

// 4. К Форме, которая прикреплена в футере - добавить логику:
// email должен соответствовать стандартам (добавить валидацию), если он не заполнен - форма не отправляется. Кнопка "Подписаться" и есть "отправкой формы", при нажатии на которую мы будем выводить консоль лог в виде объекта:  { email: 'введенная почта' }

const footerFormInstance = new Form('footer-form');
const footerEmailInput = document.querySelector('#footer-email');

function isValidEmail(email) {

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

footerFormInstance.formElement.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!footerFormInstance.isValid()) {
    console.warn('Некорректный email, форма не отправлена');
    return;
  }

  const emailValue = footerEmailInput.value.trim();

  if (!isValidEmail(emailValue)) {
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
const modalInstance = new Modal('registration-modal');
const closeModalButton = document.querySelector('.modal-form__close-btn');
const overlay = document.querySelector('#overlay');

registrationButton.addEventListener('click', () => {
  modalInstance.open();
});

closeModalButton.addEventListener('click', (event) => {
  event.preventDefault(); 
  modalInstance.close();
});

overlay.addEventListener('click', () => {
  modalInstance.close();
});

// 6. Создать форму для регистрации внутри модального окна. Она должна содержать поля: имя, фамилия, дата рождения, логин, пароль, повторение пароля. Используйте <label> для того, что бы указать пользователю, какое поле за что отвечает. Также важно использовать placeholder (обо всем этом можно будет почитать в документации в конце поста) Разрешается добавить поля на ваше усмотрение. Все поля должны иметь валидацию. Если пользователь ввел два разных пароля или форма невалидна (используем метод checkValidity()) - мы должны предупредить его о том, что регистрация отклонена. Если регистрация успешна - выводим значения формы в лог, как в задании №4. Дополнительно мы должны добавить к этому объекту свойство createdOn и указать туда время создания (используем сущность new Date()). Также создайте внешнюю переменную user и присвойте ей этот объект. После успешной регистрации - модалка должны закрыться.

const modalFormInstance = new Form('modal-form');
const passwordInput = document.querySelector('#password-input');
const checkPasswordInput = document.querySelector('#check-password-input');

let user = null;

modalFormInstance.formElement.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!modalFormInstance.isValid()) {
    alert('Регистрация отклонена: форма заполнена некорректно. Пожалуйста, заполните все поля правильно.');
    return;
  }

  const password = passwordInput.value;
  const checkPassword = checkPasswordInput.value;

  if (password !== checkPassword) {
    alert('Регистрация отклонена: пароли не совпадают.');
    return;
  }

  const formData = modalFormInstance.getFormData();
  user = {
    surname: formData['user-surname'],
    name: formData['user-name'],
    birthDate: formData['register-date'],
    login: formData['login'],
    password: password,
    createdOn: new Date()
  };

  console.log(user);

  modalInstance.close();

  modalFormInstance.resetForm();
});