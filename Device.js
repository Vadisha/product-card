//3. Создать структуру на ваш выбор, как было показано в лекции (имеется ввиду - с машинами/бьюти-продуктами). Придумайте свою структуру и реализуйте наследуемость классов

export class Device {
  constructor(brand, model, storage, operatingSystem) {
    this.brand = brand;
    this.model = model;
    this.storage = storage;
    this.operatingSystem = operatingSystem;
  }
}

