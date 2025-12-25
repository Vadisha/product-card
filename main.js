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
  firstProductCard.card.style.backgroundColor = blueCollorHash;
})

//2. Почитать про импорты файлов в другие файлы (side-effect import). На основе этого создать файл main.js. Его единственного использовать в index.html, а все остальные js файлы импортировать в главный.

import './homework-5.js';
import './homework-6.js';
import './homework-7.js';
import './homework-8.js';
import './homework-9.js';

//3. Создать структуру на ваш выбор, как было показано в лекции (имеется ввиду - с машинами/бьюти-продуктами). Придумайте свою структуру и реализуйте наследуемость классов


class MobilePhone {
  constructor(Brand, Model, Storage, OperatingSystem) {
    this.Brand = Brand;
    this.Model = Model;
    this.Storage = Storage;
    this.OperatingSystem = OperatingSystem;
  }
  
  getInfo() {
    console.log(`Brand of this phone is ${this.Brand} ${this.Model} it has a storage: ${this.Storage} and operating system for ${this.OperatingSystem}`);
}
}
const phone1 = new MobilePhone('Apple', 'iPhone 13', '128GB', 'iOS');
const phone2 = new MobilePhone('Samsung', 'Galaxy S21', '256GB', 'Android');  
const phone3 = new MobilePhone('Poco', 'F5', '256B', 'Android');

phone1.getInfo();
phone2.getInfo();
phone3.getInfo(); 

