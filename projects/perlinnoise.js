let color;

function setup() {
  createCanvas(800, 800);
  background(100);

  noLoop();
}

function draw() {
  for(let x = 0; x <= width; x++) {
    for(let y = 0; y <= height; y++) {
      value = noise(0.02 * x, 0.02 * y);

      if(value < 0.5) { // blue (water)
        stroke(0, 20, 75 + 180 * value);
      } else if (value < 0.52) { // yellow (beach)
        stroke(55 + 200 * value, 55 + 200 * value, 55);
      } else if (value < 0.6) { //green (land)
        stroke(0, 255 * value, 0);
      } else if (value < 0.75) {
        stroke(255 * value);
      } else {
        stroke(210 + 45 * value, 210 + 45 * value, 210 + 45 * value,);
      }

      point(x, y);
    }
  }
}
