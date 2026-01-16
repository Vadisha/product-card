export class Drink {
  #temperature;
  constructor(name, size, price, temperature) {
    if (new.target === Drink) {
      throw new Error("Нельзя создавать экземпляр абстрактного класса Drink");
    }
    this.name = name;
    this.size = size;
    this.price = price;
    this.#temperature = temperature;
  }

  getInfoDrink() {
    return `Название: ${this.name}, Размер: ${this.size}, Цена: ${
      this.price
    }, Температура: ${this.getTemperature()}`;
  }

  getTemperature() {
    return this.#temperature;
  }

  setTemperature(newTemperature) {
    this.#temperature = newTemperature;
  }

  #cookDrink() {
    return `Напиток ${this.name} приготовлен`;
  }

  serveDrink() {
    this.#cookDrink();
    return `Напиток "${this.name}" размера "${this.size}" подан. Приятного аппетита!`;
  }
}
