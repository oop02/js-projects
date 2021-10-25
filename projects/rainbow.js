let col = 0;
let slider;
let silderLabel;

function setup() {
  createCanvas(800, 600);
  colorMode(HSB);
  slider = createSlider(0, 20, 0.2, 0.1);
  sliderLabel = createElement("label", "test");
}

function draw() {
  background(col, 255, 255);
  sliderLabel.elt.innerText = slider.value();

  if (col >= 360) {
    col = 0;
  }

  col += slider.value();
}
