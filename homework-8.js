//2. Создаем файл js, где будет хранится массив объектов, которые представляют собой продуктовые карточки из вёрстки. Вам нужно описать полностью объект и продублировать его для всех карточек и после импортировать в homework-8 для дальнейшей работы с ним.

import { products } from "./products.js";

//3. По аналогии из лекции — создать и реализовать шаблон для продуктовых карточек.

const productsList = document.getElementById("products-list");
const productTemplate = document.getElementById("product-template");

function createProductCards(productsArray) {
  productsList.innerHTML = '';
  
  productsArray.forEach(product => {
    const productClone = productTemplate.content.cloneNode(true);
    
    // Заполняем данные
    productClone.querySelector(".product_image").src = `/images/${product.imgName}.png`;
    productClone.querySelector(".product_image").alt = product.name;
    productClone.querySelector(".product-category").textContent = product.category;
    productClone.querySelector(".product_name").textContent = product.name;
    productClone.querySelector(".product_description").textContent = product.description;

    const compList = productClone.querySelector(".product_composition");
    const titleSpan = compList.querySelector("span"); // если заголовок уже есть в шаблоне
    if (!titleSpan) {
      const title = document.createElement("span");
      title.textContent = 'Состав:';
      compList.appendChild(title);
    }
    
    product.composition.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      compList.appendChild(li);
    });
    
    productClone.querySelector(".product_price-text").textContent = 'Цена:';
    productClone.querySelector(".product_price").textContent = `${product.price}₽`;
    
    productsList.appendChild(productClone);
  });
  console.log(createProductCards(products));
}


//4. Используя метод .reduce(), получить строку, которая состоит из названий продуктовых карточек, разделенных точкой с запятой

const getProductNameWithReduce = products.reduce((acc, product) => {
  acc.push(product.name);
  return acc;
}, []);

//5. Используя метод .reduce(), получить массив объектов, где ключем является название продукта, а значением - его описание

const getNameAndDescriptionWithReduce = products.reduce((acc, product) => {
  acc.push({[product.name]: product.description});
  return acc;
}, []);

//6*. Реализовать функцию, которая при старте нашей страницы выводит сообщение с текстом, мол "Сколько карточек отобразить? От 1 до 5" и в зависимости от результата - будет выводить это количество. Должна быть защита от введенных других значений (имеется ввиду проверка if).

function renderCards(count = products.length) {
  // Очищаем контейнер
  productsList.innerHTML = "";
  
  const limitedProducts = count ? products.slice(0, count) : products;
  
  const fragment = document.createDocumentFragment();
  
  limitedProducts.forEach(product => {
    const clone = template.content.cloneNode(true);
    fillTemplate(clone, product);
    fragment.appendChild(clone);
  });

  productsList.appendChild(fragment);

  return limitedProducts.length;
}

function askProductCount() {
  const userInput = prompt("Сколько карточек отобразить? От 1 до 5");
  const numberUserInput = Number(userInput);

  if (!isNaN(numberUserInput) && numberUserInput >= 1 && numberUserInput <= 5) {
    return numberUserInput;
  }

  alert("Введите число от 1 до 5!");
  return askProductCount();
}

document.addEventListener("DOMContentLoaded", () => renderCards(askProductCount()));