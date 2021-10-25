class Switch {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.width = 80;
    this.height = 50;

    this.output = new InputOutput(this.pos.x + this.width, this.pos.y + this.height / 2);

    this.connectedTo;
    this.connected = false;

    this.style = new Style;
  }

  connectTo(input) {
    this.connectedTo = input;
    this.connected = true;
  }

  checkClicked() {
    if (
      mouseX >= this.pos.x &&
      mouseX <= this.pos.x + this.width &&
      mouseY >= this.pos.y &&
      mouseY <= this.pos.y + this.height
    ) {
      this.switchState();
    }
  }

  update() {

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

    rect(this.pos.x, this.pos.y, this.width, this.height);

    if (this.connected) {
      line(this.output.pos.x, this.output.pos.y, this.connectedTo.pos.x, this.connectedTo.pos.y);
    }
  }

  switchState() {
    this.output.state = !this.output.state;
    if (this.connected) {
      this.connectedTo.state = this.output.state;
    }
  }
}
