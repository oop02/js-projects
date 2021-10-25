let components = [];

function setup() {
  createCanvas(800, 600);
  background(255);
  let and1 = new AndGate(200, 200);
  let or1 = new OrGate(400, 300);
  let switch1 = new Switch(10, 200);
  let switch2 = new Switch(10, 280);
  let switch3 = new Switch(100, 360);
  let output1 = new Output(550, 300);

  switch1.connectTo(and1.input1);
  switch2.connectTo(and1.input2);
  switch3.connectTo(or1.input2)
  and1.connectTo(or1.input1);
  or1.connectTo(output1.input);

  components.push(and1);
  components.push(or1);
  components.push(switch1);
  components.push(switch2);
  components.push(switch3);
  components.push(output1);
}

function draw() {
  for (let component of components) {
    component.update();
    component.show();
  }
}

function mouseClicked() {
  for (let component of components) {
    component.checkClicked();
  }
}
