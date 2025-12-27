import { Device } from './Device.js';

class Tablet extends Device {
  constructor(brand, model, storage, operatingSystem, hasKeyboard) {
    super(brand, model, storage, operatingSystem);
    this.hasKeyboard = hasKeyboard;
  }
  
  getInfo() {
    console.log(`Brand of this tablet is ${this.brand} ${this.model} it has a storage: ${this.storage} and operating system for ${this.operatingSystem}`);
  }
}

const tablet1 = new Tablet('Apple', 'iPad Pro', '256GB', 'iPadOS', true);
const tablet2 = new Tablet('Samsung', 'Galaxy Tab S7', '128GB', 'Android', false);    

tablet1.getInfo();
tablet2.getInfo();