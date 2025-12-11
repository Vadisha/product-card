//2. Создаем файл js, где будет хранится массив объектов, которые представляют собой продуктовые карточки из вёрстки. Вам нужно описать полностью объект и продублировать его для всех карточек и после импортировать в homework-8 для дальнейшей работы с ним.

import { products } from "./products.js";

//3. По аналогии из лекции — создать и реализовать шаблон для продуктовых карточек.

const productsTemplate = document.getElementById('products-template');
const productsList = document.getElementById('products-list');

products.forEach(product => {
  const productClone = productsTemplate.content.cloneNode(true);
  productClone.querySelector('.product-image').textContent = product.image
  productClone.querySelector('.product-category').textContent = product.category
  productClone.querySelector('.product-name').textContent = product.name
  productClone.querySelector('.product-description').textContent = product.description
  productClone.querySelector('.product-composition').textContent = product.composition
  productClone.querySelector('.product-price').textContent = product.price
  productsList.appendChild(productClone)
})

//4. Используя метод .reduce(), получить строку, которая состоит из названий продуктовых карточек, разделенных точкой с запятой

const namesString = products.reduce((acc, product, index) => {
    return index === 0 ? product.name : `${acc};${product.name}`;
}, '');

console.log(namesString); 

//5. Используя метод .reduce(), получить массив объектов, где ключем является название продукта, а значением - его описание

const productsDescriptions = products.reduce((acc, product) => {
    const productObj = {};
    productObj[product.name] = product.description;

    acc.push(productObj);
    return acc;
}, []);

console.log(productsDescriptions);

//6*. Реализовать функцию, которая при старте нашей страницы выводит сообщение с текстом, мол "Сколько карточек отобразить? От 1 до 5" и в зависимости от результата - будет выводить это количество. Должна быть защита от введенных других значений (имеется ввиду проверка if).

const displayCards = () => {
    const question = prompt("Сколько карточек отобразить? От 1 до 5");
    const numbers = Number(question)
    if(numbers > 0 && numbers <= productCards.length) {
    outputProducts(products.slice(0, numbers))

} else {
    alert("Нужно вводить число от 1 до 5")
}}
displayCards();