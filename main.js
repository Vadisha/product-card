//2. Почитать про импорты файлов в другие файлы (side-effect import). На основе этого создать файл main.js. Его единственного использовать в index.html, а все остальные js файлы импортировать в главный.

import './homework-5.js';
import './homework-6.js';
import './homework-7.js';
import './homework-8.js';
import './homework-9.js';
import './MobilePhone.js';
import './Tablet.js';
import './Modal.js'
import './Form.js'

const productCards = document.querySelectorAll('.card-container');
const changeCollorAllButton = document.querySelector('#change-color-all-card');
const greenCollorHash = '#00FF00';
const blueCollorHash = '#2e2eccff';

changeCollorAllCardButton.addEventListener('click', () => {
  productCards.forEach((card) => card.style.backgroundColor = greenCollorHash)
})


const productCard = document.querySelector('.card-container');
const changeCollorFirstButton = document.querySelector('#change-color-first-card');
changeCollorFirstCardButton.addEventListener('click', () => {
  productCard.style.backgroundColor = blueCollorHash;
})

