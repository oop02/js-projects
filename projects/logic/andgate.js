class AndGate {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.width = 100;
    this.height = 100;

    this.input1 = new InputOutput(this.pos.x, this.pos.y + this.height * 0.25);
    this.input2 = new InputOutput(this.pos.x, this.pos.y + this.height * 0.75);
    this.output = new InputOutput(this.pos.x + this.width, this.pos.y + this.height * 0.5);

    this.connectedTo;
    this.connected = false;

    this.style = new Style();
  }

  connectTo(input) {
    this.connectedTo = input;
    this.connected = true;
  }

  checkClicked() {

  }

  update() {
    this.output.state = this.input1.state && this.input2.state;
    if (this.connected) {
      this.connectedTo.state = this.output.state;
    }
  }

  show() {
    let hovering = false;
    if (
      mouseX >= this.pos.x &&
      mouseX <= this.pos.x + this.width &&
      mouseY >= this.pos.y &&
      mouseY <= this.pos.y + this.height
    ) {
      hovering = true;
    }

    if (this.output.state == false && hovering) {
      stroke(this.style.strokeHover);
      strokeWeight(this.style.strokeWeightHover);
      fill(this.style.fillHover);
    } else
    if (this.output.state == true && !hovering) {
      stroke(this.style.strokeOn);
      strokeWeight(this.style.strokeWeightOn);
      fill(this.style.fillOn);
    } else
    if (this.output.state == true && hovering) {
      stroke(this.style.strokeOnHover);
      strokeWeight(this.style.strokeWeightOnHover);
      fill(this.style.fillOnHover);
    } else
    {
      stroke(this.style.stroke);
      strokeWeight(this.style.strokeWeight);
      fill(this.style.fill);
    }

    beginShape();
    vertex(this.pos.x + this.width / 2, this.pos.y);
    vertex(this.pos.x, this.pos.y);
    vertex(this.pos.x, this.pos.y + this.height);
    vertex(this.pos.x + this.width / 2, this.pos.y + this.height);
    endShape();

    ellipseMode(CORNER);
    arc(this.pos.x, this.pos.y, this.width, this.height, -HALF_PI, HALF_PI);

    if (this.connected) {
      line(this.output.pos.x, this.output.pos.y, this.connectedTo.pos.x, this.connectedTo.pos.y);
    }
  }
}
