import './style.css';
import {Truck, PassangerCar, GasCar} from './modules/car';
import {Station} from './modules/station';

const open = document.querySelector('.open');
const car = document.querySelector('.car');

const testArray = {
  passangerCar: [
    ['Opel', 'Crossland', 45],
    ['Opel', 'Grandland X', 53],
    ['Mazda', 'cx-5', 55],
    ['BMW', 'M5', 68],
    ['BMW', 'X5', 80],
    ['BMW', 'X5d', 80, 'diesel'],
    ['BMW', 'X3', 65],
    ['BMW', '5', 66],
  ],
  truck: [
    ['MAN', 'TGS', 400],
    ['MAN', 'TGX', 300],
    ['Mercedes-Benz', 'Actros', 450],
    ['Mercedes-Benz', 'Actros L', 650],
    ['Volvo', 'FH16', 700],
    ['Volvo', 'FM', 700],
    ['Volvo', 'FMX', 540],
  ],
  gasCar: [
    ['Opel', 'Astra', 45],
    ['Lada', 'Vesta', 50],
    ['UAZ', 'Patriot', 70],
    ['Volkswagen', 'Passat', 50],
  ],
};

const getTestCar = () => {
  const typeBool = Math.random();
  const listCar = (typeBool < 0.4) ?
    testArray.passangerCar : (0.4 <= typeBool && typeBool < 0.7) ?
    testArray.gasCar : testArray.truck;

  const randomCar = listCar[(Math.floor(Math.random() * listCar.length))];
  return (typeBool < 0.4) ?
  new PassangerCar(...randomCar) : (0.4 <= typeBool && typeBool < 0.7) ?
  new GasCar(...randomCar) : new Truck(...randomCar);
};

const station = new Station([
  {
    type: 'petrol',
    count: 1,
    speed: 5,
  },
  {
    type: 'diesel',
    count: 1,
    speed: 20,
  },
  {
    type: 'gas',
    count: 1,
    speed: 3,
  },
], '.app');

open.addEventListener('click', () => {
  station.init();
  console.log(station);
  open.remove();
  car.style.display = 'block';
  car.addEventListener('click', () => {
    station.addCarQueue(getTestCar());
  });
});
