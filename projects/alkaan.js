let countSlider, cSizeSlider, hSizeSlider, spaceSlider, lineWidthSlider;

let types = [];
types[1] = 'methaan';
types[2] = 'ethaan';
types[3] = 'propaan';
types[4] = 'butaan';
types[5] = 'pentaan';
types[6] = 'hexaan';
types[7] = 'heptaan';
types[8] = 'octaan';
types[9] = 'nonaan';
types[10] = 'decaan';


function setup() {
  createCanvas(displayWidth, 400);

  //sliders = createDiv();


  countSlider = createSlider(1, 10, 4, 1);
  createElement('label', 'Number of C-atoms');
  createElement('br');

  cSizeSlider = createSlider(10, 100, 50, 1);
  createElement('label', 'Size of C-atoms');
  createElement('br');

  hSizeSlider = createSlider(10, 100, 30, 1);
  createElement('label', 'Size of H-atoms');
  createElement('br');

  spaceSlider = createSlider(0, 50, 20, 1);
  createElement('label', 'Space between atoms');
  createElement('br');

  lineWidthSlider = createSlider(1, 10, 3, 1);
  createElement('label', 'width of lines between atoms');

  //countSlider.parent(sliders);
  //cSizeSlider.parent(sliders);
  //hSizeSlider.parent(sliders);
  //spaceSlider.parent(sliders);
  //lineWidthSlider.parent(sliders);
}

function draw() {
  background(200);

  var count = countSlider.value();
  var cSize = cSizeSlider.value();
  var hSize = hSizeSlider.value();
  var space = spaceSlider.value();
  var lineWidth = lineWidthSlider.value();

  let result = "";

  let x = hSize / 2;

  fill(255);
  noStroke();
  ellipse(x, height / 2, hSize, hSize);

  x += hSize / 2;

  stroke(100);
  strokeWeight(lineWidth);
  line(x, height / 2, x + space, height / 2);

  x += space + cSize / 2;

  for(i = 1; i <= count; i++) { // C
    fill(0);
    noStroke();
    ellipse(x, height / 2, cSize, cSize);

    fill(255);
    noStroke();
    ellipse(x, height / 2 + cSize / 2 + space + hSize / 2, hSize, hSize);
    ellipse(x, height / 2 - cSize / 2 - space - hSize / 2, hSize, hSize);

    stroke(100);
    strokeWeight(lineWidth);
    line(x, height / 2 + cSize / 2, x, height / 2 + cSize / 2 + space);
    line(x, height / 2 - cSize / 2, x, height / 2 - cSize / 2 - space);

    x += cSize / 2;

    stroke(100);
    strokeWeight(lineWidth);
    line(x, height / 2, x + space, height / 2);

    x += space + cSize / 2;

  }

  x += -(cSize / 2) + hSize / 2;

  fill(255);
  noStroke();
  ellipse(x, height / 2, hSize, hSize);

  fill(0);
  textSize(30);

  if (count === 1) {
    result = "(CH4)";
  } else {
    result = "(C" + count + "H" + (2 * count + 2) + ")";
  }

  text(types[count], 10, 30);
  text(result, 10, 60);
}
