export class Lemonade extends Drink {
  constructor(size, price, temperature = 5, flavor, carbonated = true) {
    super("Lemonade", size, price, temperature);
    this.flavor = flavor;
    this.carbonated = carbonated;
  }
}