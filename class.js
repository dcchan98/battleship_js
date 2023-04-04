class Cell {
    constructor(x, y, hasShip) {
      this.x = x;
      this.y = y;
      this.hasShip = hasShip;
      this.hit = false;
    }
  
    attack() {
      this.hit = true;
      return this.hasShip;
    }
  }
  
  class Map {
    constructor(size) {
      this.size = size;
      this.cells = this.generateCells(size);
    }
  
    generateCells(size) {
      let cells = [];
      for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
          cells.push(new Cell(x, y, false));
        }
      }
      return cells;
    }
  
    placeShip(x, y) {
      const cell = this.cells.find(cell => cell.x === x && cell.y === y);
      if (cell) {
        cell.hasShip = true;
      }
    }
  
    attackCell(x, y) {
      const cell = this.cells.find(cell => cell.x === x && cell.y === y);
      if (cell) {
        return cell.attack();
      }
      return false;
    }
  }
  