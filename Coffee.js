export class Coffee extends Drink {
  constructor(size, price, temperature = 85) {
    super("Coffee", size, price, temperature);
    this.beanType = beanType;
    this.milk = milk;
  }
  getCoffeeInfo() {
    return `${super.getInfoDrink()}, Зерна: ${this.beanType}, Молоко: ${
      this.milk ? "да" : "нет"
    }`;
  }

  orderCoffee(drink) {
    const served = drink.serveDrink();
    return `Заказ принят! ${served}`;
  }
}
