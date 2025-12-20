// 2. Импортируем массив объектов продуктовых карточек
import { products } from "./products.js";

// 3. Создаём и реализуем шаблон для продуктовых карточек
const productsList = document.getElementById("products-list");
const productTemplate = document.getElementById("card-template");

function fillProductTemplate(clone, product) {
  const image = clone.querySelector(".product_image");
  image.src = `./images/${product.imgName}.png`;
  image.alt = product.name;

  clone.querySelector(".product-category").textContent = product.category;
  clone.querySelector(".product-name").textContent = product.name;
  clone.querySelector(".product-description").textContent = product.description;

  const compositionTitle = clone.querySelector(".product-composition-text");
  compositionTitle.textContent = "состав:";

  const compList = clone.querySelector(".product-composition");
  compList.innerHTML = "";
  product.composition.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("product-compound-item");
    li.textContent = item;
    compList.appendChild(li);
  });

  clone.querySelector(".product_price-text").textContent = "Цена:";
  clone.querySelector(".product_price").textContent = `${product.price} ₽`;
}

function renderProductCards(productsArray) {
  productsList.innerHTML = "";

  const fragment = document.createDocumentFragment();

  productsArray.forEach((product) => {
    const templateContent = productTemplate.content.cloneNode(true);
    fillProductTemplate(templateContent, product);
    fragment.appendChild(templateContent);
  });

  productsList.appendChild(fragment);
}

// 4. reduce: строка из названий продуктов, разделённых точкой с запятой
const productNamesString = products.reduce((acc, product, index) => {
  if (index === 0) {
    return product.name;
  }
  return `${acc}; ${product.name}`;
}, "");

// 5. reduce: объект, где ключ — название продукта, а значение — описание
const nameToDescriptionMap = products.reduce((acc, product) => {
  acc[product.name] = product.description;
  return acc;
}, {});

// 6*. При старте страницы спрашиваем, сколько карточек отобразить (от 1 до 5)
function askProductCount() {
  const userInput = prompt("Сколько карточек отобразить? От 1 до 5");
  const numberUserInput = Number(userInput);

  if (!Number.isNaN(numberUserInput) && numberUserInput >= 1 && numberUserInput <= 5) {
    return numberUserInput;
  }

  alert("Введите число от 1 до 5!");
  return askProductCount();
}

function renderCards(count = products.length) {
  const limitedProducts = count ? products.slice(0, count) : products;
  renderProductCards(limitedProducts);
}

document.addEventListener("DOMContentLoaded", () => {
  const count = askProductCount();
  renderCards(count);
});