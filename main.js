const gameBoard = document.getElementById("game-board");
const turnsElement = document.getElementById("turns");

const map = new Map(10);
placeRandomShips([{ size: 5 }, { size: 4 }, { size: 3 }, { size: 3 }]);

function placeRandomShips(ships) {
  ships.forEach((ship) => {
    let placed = false;
    while (!placed) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      const direction = Math.floor(Math.random() * 2) === 0 ? "horizontal" : "vertical";

      if (canPlaceShip(x, y, ship.size, direction)) {
        for (let i = 0; i < ship.size; i++) {
          if (direction === "horizontal") {
            map.placeShip(x + i, y);
          } else {
            map.placeShip(x, y + i);
          }
        }
        placed = true;
      }
    }
  });
}

function canPlaceShip(x, y, size, direction) {
  for (let i = 0; i < size; i++) {
    if (direction === "horizontal") {
      if (x + i >= 10 || map.cells.find(cell => cell.x === x + i && cell.y === y && cell.hasShip)) {
        return false;
      }
    } else {
      if (y + i >= 10 || map.cells.find(cell => cell.x === x && cell.y === y + i && cell.hasShip)) {
        return false;
      }
    }
  }
  return true;
}

let turns = 0;
let shipsSunk = 0;
const totalShipSize = 15; // The sum of the ship sizes (5 + 4 + 3 + 3)

function renderMap() {
  gameBoard.innerHTML = "";
  map.cells.forEach(cell => {
    const cellElement = document.createElement("div");
    cellElement.className = "cell";
    cellElement.addEventListener("click", () => {
      const hit = map.attackCell(cell.x, cell.y);
      turns++;
      turnsElement.textContent = `Turns: ${turns}`;
      if (hit) {
        shipsSunk++;
        if (shipsSunk === totalShipSize) {
          turnsElement.textContent += " All ships sunk!";
        }
      }
      cellElement.style.backgroundColor = hit ? "red" : "gray";
      cellElement.style.pointerEvents = "none";
    });
    gameBoard.appendChild(cellElement);
  });
}

renderMap();
