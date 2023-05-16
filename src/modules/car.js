export class Car {
  #maxTank;
  constructor(brand, model, maxTank) {
    this.brand = brand;
    this.model = model;
    this.#maxTank = maxTank;
    this.nowTank = Math.floor(Math.random() * maxTank);
    this.id = Math.floor(Math.random() * 10000000);
  }

  getTitle() {
    return `${this.brand} ${this.model}`;
  }

  setModel(model) {
    this.model = model;
    return this; // для чейнинга
  }

  get needPetrol() {
    return this.#maxTank - this.nowTank;
  }

  fillUp() {
    this.nowTank = this.#maxTank;
    return this; // для чейнинга
  }

  get maxTank() {
    return this.#maxTank;
  }

  set maxTank(data) {
    console.log(`Нельзя поменять значение на ${data}`);
  }

  static string = 'Новый автомобиль';

  static logger(str) {
    console.log(str);
  }

  static from({ brand, model, maxTank }) {
    const car = new Car(brand, model, maxTank);
    Car.logger(Car.string + car.getTitle());
    return car;
  }
}

export class PassangerCar extends Car {
  typeCar = 'Passanger';
  constructor(brand, model, maxTank, typeFuel = 'petrol') {
    super(brand, model, maxTank);
    this.typeFuel = typeFuel;
  }
}

export class Truck extends Car {
  typeCar = 'Truck';
  constructor(brand, model, maxTank, typeFuel = 'diesel') {
    super(brand, model, maxTank);
    this.typeFuel = typeFuel;
  }
}

export class GasCar extends Car {
  typeCar = 'GasCar';
  constructor(brand, model, maxTank, typeFuel = 'gas') {
    super(brand, model, maxTank);
    this.typeFuel = typeFuel;
  }
}
