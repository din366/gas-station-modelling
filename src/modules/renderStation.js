export class RenderStation {
  constructor(app, station) {
    this.app = app;
    this.station = station;
    this.init();
  }

  init() {
    this.wrapper = document.createElement('div');
    this.wrapper.style.cssText = `
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: minmax(100px, 1fr);
    align-items: top;
    justify-content: space-between;
    `;
    this.renderStation();
  }

  renderStation(leavesClient) {
    this.wrapper.textContent = '';
    const queueList = this.createQueue();
    const columns = this.createColums();
    if (leavesClient) {
      const leavesClientTable = this.createLeavesClientTable(leavesClient);
      this.wrapper.append(queueList, columns, leavesClientTable);
    } else {
      this.wrapper.append(queueList, columns);
    }

    document.querySelector(this.app).append(this.wrapper);
  }

  createQueue() {
    const list = document.createElement('ul');
    list.style.height = '150px';
    list.style.overflowY = 'scroll';
    this.station.queue.forEach(car => {
      const item = document.createElement('li');
      item.textContent = `${car.getTitle()}`;
      item.classList.add(car.typeCar);
      list.append(item);
    });
    return list;
  }

  createColums() {
    const columns = document.createElement('ul');
    columns.classList.add('columns');

    this.station.filling.forEach(column => {
      const itemColumn = document.createElement('li');
      itemColumn.style.minHeight = '150px';
      itemColumn.classList.add(column.type);

      const columnName = document.createElement('p');
      columnName.textContent = column.type;
      itemColumn.append(columnName);

      if (column.car) {
        const itemCar = document.createElement('p');
        const car = column.car;
        itemCar.textContent = car.getTitle();
        itemCar.classList.add(car.typeCar);

        const span = document.createElement('span');
        span.dataset.id = car.id;
        itemCar.append(span);
        itemColumn.append(itemCar);
      }
      columns.append(itemColumn);
    });
    return columns;
  }

  createLeavesClientTable(clients) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('leaves-client-wrapper');
    const title = document.createElement('p');
    title.textContent = 'Обработанные клиенты:';
    const columns = document.createElement('ul');
    columns.classList.add('leaves-client');
    clients.map(item => {
      const itemLi = document.createElement('li');
      itemLi.textContent =
        `${item.brand} ${item.model} - client ID = ${item.id}`;
      columns.append(itemLi);
    });
    wrapper.append(title, columns);
    return wrapper;
  }

  renderCheckFuel(car, nowTank) {
    if (car.maxTank < nowTank) {
      nowTank = car.maxTank;
    }
    document.querySelector(`[data-id = '${car.id}']`)
      .textContent = `(${nowTank} / ${car.maxTank})`;
  }
}
