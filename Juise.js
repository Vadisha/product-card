export class Juice extends Drink {
  constructor(size, price, temperature = 10, juiceType, fresh = false) {
    super("Juice", size, price, temperature);
    this.juiceType = juiceType;
    this.fresh = fresh;
  }
}