//const width = 800;
//const height = 800;

const PI = 3.14159265358979323846264338;

const scaleX = 1;
const scaleY = 1;

const accuracy = 0.01;

let minX;
let maxX;
let minY;
let maxY;

let minXSlider;
let maxXSlider;
let minYSlider;
let maxYSlider;



let func = function(x) {
  //return sin(x);
}

let resX;
let resY;

function setup() {
  createCanvas(800, 800)


  //CREATE INPUTS
  let div = createDiv(); //div for sliders etc.
  //main input box
  let input = createInput('Typ hier een formule...');
  input.input(onInput);
  input.parent(div);
  createElement('br').parent(div);
  //slider min X
  createElement('label', 'min X').parent(div);
  minXSlider = createSlider(-30, 30, -5, 0);
  minXSlider.parent(div);
  createElement('br').parent(div);
  //slider max X
  createElement('label', 'max X').parent(div);
  maxXSlider = createSlider(-30, 30, 5, 0);
  maxXSlider.parent(div);
  createElement('br').parent(div);
  //slider min Y
  createElement('label', 'min Y').parent(div);
  minYSlider = createSlider(-30, 30, -5, 0);
  minYSlider.parent(div);
  createElement('br').parent(div);
  //slider max Y
  createElement('label', 'max Y').parent(div);
  maxYSlider = createSlider(-30, 30, 5, 0);
  maxYSlider.parent(div);

  //noLoop();
}

function onInput() {
  let value = this.value();

  let temp;

  try{
    eval("temp = function(x) { return " + value + "; };");
    temp(1);
  }catch(e){
    return;
  }

  func = temp;

  //clear();
  //redraw();
}


function createGrid() {

}

function drawLine(ax, ay, bx, by) {
  line(ax * resX, -ay * resY, bx * resX, -by * resY);
}


function draw() {
  minX = minXSlider.value();
  maxX = maxXSlider.value();
  minY = minYSlider.value();
  maxY = maxYSlider.value();

  resX = width / (maxX - minX);
  resY = height / (maxY - minY);

  background(50);

  //create axis
  stroke(100);
  strokeWeight(2);

  translate(-(minX * resX), -(minY * resY));
  drawLine(minX, 0, maxX, 0);
  drawLine(0, minY, 0, maxY);


  //create grid
  stroke(75);
  strokeWeight(1);

  if (resX > 10 && resY > 10) {
    createGrid();
  }

  //draw
  stroke(100, 100, 255);
  strokeWeight(1);

  let xOld = minX;
  let yOld = func(minX);
  let xNew;
  let yNew;

  for(let x = minX; x <= maxX+accuracy; x += accuracy) {

    xNew = x;
    yNew = func(x);

    drawLine(xOld, yOld, xNew, yNew);

    xOld = xNew;
    yOld = yNew;
  }
}
