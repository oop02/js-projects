const cols = 100;
const rows = 100;
const res = 8;

let grid;
let nextGrid;

let colors = [];

colors[0] = 0;
colors[1] = 255;


function setup() {
  grid     = createGrid(cols, rows);
  nextGrid = createGrid(cols, rows);

  //fill the grid with random cells
  for (let x = 1; x <= cols; x++) {
    for (let y = 1; y <= rows; y++) {
      let rand = random();

      if (rand < 0.1) {
        rand = 1;
      } else {
        rand = 0;
      }

      grid[x][y] = rand;
    }
  }

  createCanvas(cols * res, rows * res);
  background(100);

  frameRate(2);
  //noLoop();
}

function draw() {
  let neighbours;
  for (let x = 1; x <= cols; x++) {
    for (let y = 1; y <= rows; y++) {
      if (grid[x][y] === 0) {
        fill(colors[0]);
      } else {
        fill(colors[1]);
      }
      noStroke();
      rect((x - 1) * res, (y - 1) * res, res - 1, res - 1);
    }
  }

  //fill(255, 200, 0);
  //rect(res, res, res - 1, res - 1);


  //rules:
  for (let x = 1; x <= cols; x++) {
    for (let y = 1; y <= rows; y++) {
      neighbours = countNeighbours(x, y, 1, "moore");

      if (neighbours < 2 || neighbours > 3) {
        nextGrid[x][y] = 0;
      }
      else if (neighbours === 3) {
        nextGrid[x][y] = 1;
      }
      else {
        nextGrid[x][y] = grid[x][y];
      }
    }
  }
  grid = nextGrid;
}
