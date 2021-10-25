let squares = [];

function setup() {
  createCanvas(600, 600);
  for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);
    square = new Square(x, y, 100, 100);
    squares.push(square);
  }

}

function draw() {
  background(50);
  for(s of squares) {
    s.update();
    s.show();
  }

}

function mousePressed() {
  for(s of squares) {
    if (s.hovering()) {
      s.dragging = true;
      break;
    }
  }
}

function mouseReleased() {
  for(s of squares) {
    if (s.hovering()) {
      s.dragging = false;
    }
  }
}
