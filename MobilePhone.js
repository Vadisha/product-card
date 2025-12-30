import { Device } from './Device.js';

class MobilePhone extends Device {
  constructor(brand, model, storage, operatingSystem, screenSize) {
    super(brand, model, storage, operatingSystem);
    this.screenSize = screenSize;
  }

  getInfo() {
    console.log(`Brand: ${this.brand} ${this.model}, Storage: ${this.storage}, OS: ${this.operatingSystem}, Screen Size: ${this.screenSize}`);
  }
}

const MobilePhone1 = new MobilePhone('Apple', 'iPhone 13', '128GB', 'iOS', '6.1"');
const MobilePhone2 = new MobilePhone('Samsung', 'Galaxy S21', '256GB', 'Android', '6.2"');
const MobilePhone3 = new MobilePhone('Poco', 'F5', '256GB', 'Android', '6.67"');

MobilePhone1.getInfo();
MobilePhone2.getInfo();
MobilePhone3.getInfo();