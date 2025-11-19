'use strict'

//1. Функция которая принимает 2 параметра: город и температуру и выводит сообщение в консоль 

const showTemperature = (city, temperature) => {
   console.log(`Сейчас в ${city} температура ${temperature} градусов по Цельсию`);
};

showTemperature("Уфе", -10);
showTemperature("Стерлитамаке", -8); 

//2. Переменная, которая хранит внутри себя скорость звука.Функция, которая принимает 1 параметр - скорость, внутри функции происходит проверка: если переданная скорость выше скорости звука - выводим лог "Сверхзвуковая скорость", если ниже - "Дозвуковая скорость"
const SPEED_OF_SOUND = 343;

function checkSpeed(speed) {
  if (speed > SPEED_OF_SOUND) {
    console.log("Сверхзвуковая скорость");
  } else if (speed === SPEED_OF_SOUND) {
    console.log("Звуковая скорость"); 
  } else { 
    console.log("Дозвуковая скорость");
  }
}


//3.Создать переменную №1, которая содержит продукт и переменную №2, которая содержит его цену (на ваше усмотрение). Далее создаем функцию, которая принимает 1 параметр - текущий бюджет, внутри функции происходит проверка: если бюджет превышает цену товара - выводим лог "(ваше название товара) приобретён. Спасибо за покупку!", если нет - обсчитываем разницу и выводим лог "Вам не хватает X$, пополните баланс". 
const totalBudget = 1000;

function purchaseProduct(product, price) {
  if (price <= totalBudget) {
      console.log(`${product} приобретен за ${price} руб. Спасибо за покупку`);
  } else {
      const difference = price - totalBudget;
      console.log(`Вам не хватает: ${difference} руб. пополните баланс!`);
  }
}



// Примеры использования:
purchaseProduct("Хлеб", 500);
purchaseProduct("Чай", 1200);
purchaseProduct("Ноутбук", 2500);


purchaseProduct()


//4. Создание собственной функции

const currentBudget = 1000;

const buyProduct = (product, price) => {
    if (price > currentBudget) {
        console.log(`Извините, на ${product} не хватает средств на кошельке`);
    } else {
        console.log(`Поздравляю Вас с успешной покупкой продукта ${product}`);
    }
}

buyProduct("Хлеб", 500);
buyProduct("Чай", 1500);

buyProduct();

//5. Создание 3-х переменных

const userCartTotal = 0;
const availableBalance = 5000;
const discountPercentage = 15;