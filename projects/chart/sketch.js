let chartDataX = [];
let chartDataY = [];
let x = 0;
let y;
let chart;

function setup() {
  createCanvas(800, 600);

  chart = new Graph(chartDataX, chartDataY);
}

function draw() {
  background(0);
  chart.show();
  
  y = sin(x);
  chartDataX.push(x);
  chartDataY.push(y);
  chart.changeData(chartDataX, chartDataY);
  x += 0.1;
  
}
