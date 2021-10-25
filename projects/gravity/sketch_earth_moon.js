let planets = []; // list of all planets

const g = 6.67408E-11; // G

// Camera stuff
let scl = 0.000001;
let xOff;
let yOff;


// Debug stuff
let debugCheckBox;
let debugClearButton;
let pauseButton;
let paused = false;

//graph stuff
let graph;
let graphDataX = [];
let graphDataY = [];

function setup() {
  createCanvas(1000, 800);

  // set camera pos on (0, 0)
  xOff = (width / 2)  / scl;
  yOff = (height / 2) / scl;

  //Create buttons
  debugCheckBox = createCheckbox("Debug Info"); // Debug check box
  debugClearButton = createButton("Clear Debug Info");
  debugClearButton.mousePressed(clearDebugInfo);
  pauseButton = createButton("Pause");
  pauseButton.mousePressed(pause);

  // Create planets
  let earth;
  earth = new Planet(0, 0, 5.972E+24, 5515.3, "Earth"); // real
  earth.color = color(0, 255, 100);

  let moon;
  moon = new Planet(3.626E+8, 0, 7.342E+22, 3344, "Moon"); // real
  moon.color = color(200, 200, 200);
  moon.vel.set(0, -1022); // real

  // Add planets to list
  planets.push(earth);
  planets.push(moon);

  // Create graph
  graph = new Graph(graphDataX, graphDataY);
  //graph.connect = true;
}

function draw() {
  background(0);

  if (keyIsPressed) { //camera stuff
    moveView();
  }

  if (!paused) {
    updatePlanets();
    updateGraph(planets[1].time, planets[1].vel.mag());
  } else {
    push();

    fill(255, 100, 100);
    noStroke();
    textSize(20);
    text("Paused", width - 85, 30);

    pop();
  }

  showPlanets();
  showGraph();
}

function updatePlanets() {
  for (let n = 1; n <= 100; n++) { //do calculations 100 times

    for (let i = 0; i < planets.length; i++) { // loop through all planets
      for (let j = 0; j < planets.length; j++) { // For every planet, loop through all other planets
        if (i !== j) {
          //APPLY FORCE

          let a = planets[i].pos.x - planets[j].pos.x;
          let b = planets[i].pos.y - planets[j].pos.y;
          let distanceSq = a*a + b*b; //a^2 + b^2 = c^2

          // Fg = G * (m * M) / r^2
          let gravForce = g * ((planets[i].mass * planets[j].mass) / distanceSq);

          // Get Fg in X and Y directions
          let gravForceX = (gravForce * a) / sqrt(distanceSq);
          let gravForceY = (gravForce * b) / sqrt(distanceSq);

          let gravForceVector = createVector(gravForceX, gravForceY); // Create the force vector
          planets[j].applyForce(gravForceVector); // Apply the force
        }
      }
      planets[i].update(); // Update position of planets
    }
  }
}

function showPlanets() {
  for (let p of planets) {
    push();
    scale(scl);
    translate(xOff, yOff);
    p.show();
    pop();
  }
}

function updateGraph(x, y) {
  graphDataX.push(x);
  graphDataY.push(y);
  graph.changeData(graphDataX, graphDataY);
}

function showGraph() {
  if (debugCheckBox.checked()) {
    graph.show();
  }
}



function clearDebugInfo() {
  graphDataX = [];
  graphDataY = [];
}

function pause() {
  paused = !paused;
}



//Camera stuff
function mouseWheel(event) {
  let zoomFactor = 1.1;
  if (event.delta > 0) {
    scl  /= zoomFactor;

    xOff *= zoomFactor;
    yOff *= zoomFactor;
  } else if (event.delta < 0) {
    scl  *= zoomFactor;

    xOff /= zoomFactor;
    yOff /= zoomFactor;
  }
}

function moveView() {
  if (keyIsDown(LEFT_ARROW)  || keyIsDown(65)) {
    xOff += 5 / scl;
  }
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    xOff += -5 / scl;
  }
  if (keyIsDown(UP_ARROW)    || keyIsDown(87)) {
    yOff += 5 / scl;
  }
  if (keyIsDown(DOWN_ARROW)  || keyIsDown(83)) {
    yOff += -5 / scl;
  }
}
