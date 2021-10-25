let iterations = 30;

function setup() {
  createCanvas(400, 400);
  //noLoop();
  colorMode(HSB);
  angleMode(DEGREES);
}

function draw() {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let pos = getRealPosition(x, y);

      let mandelbrotValue = juliaSet(new ComplexNumber(pos.x, pos.y));
      let col;
      if (mandelbrotValue == 0) {
        col = color(0);
      } else {
        //map number of iterations to a fancy color
        let h = map(mandelbrotValue, 1, iterations, 240, 0);
        col = color(h, 100, 100);
      }
      set(x,y, col);
    }
  }
  updatePixels();
}

function getRealPosition(x, y) {
  x = map(x, 0, width - 1, -2, 2);
  y = map(y, 0, height - 1, -2, 2);
  return createVector(x, y);
}

//returns number of iterations when c is outside
//returns 0 when c is inside
function mandelbrotSet(c) {
  let z = new ComplexNumber(0, 0);
  for (let i = 1; i <= iterations; i++) {
    z.square();
    z.add(c);
    if (outsideMandelbrotSet(z)) {
      return i;
    }
  }
  return 0;
}

function juliaSet(z) {
  //let pos = getRealPosition(mouseX, mouseY); //map to mouse (turn loop on)
  //let pos = createVector(-0.8, 0.185); //set value
  let pos = createVector(0.8*cos(4*frameCount % 360), 0.8*sin(4*frameCount % 360));

  let c = new ComplexNumber(pos.x, pos.y);
  for (let i = 1; i <= iterations; i++) {
    z.square();
    z.add(c);
    if (outsideMandelbrotSet(z)) {
      return i;
    }
  }
  return 0;
}

function outsideMandelbrotSet(c) {
  let x = c.real;
  let y = c.imaginary;
  return x*x + y*y > 4;
}
