let space;
let alive, dead;



function setup() {
  createCanvas(600, 600);
  space = new CellSpace(30, 30, 18);
  alive = new CellType("alive", color(255));
  dead  = new CellType("dead", color(0));
  space.randomize([alive, dead]);
}

function draw() {
  background(50);
  space.show();
}
