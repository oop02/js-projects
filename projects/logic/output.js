class Output {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.width = 50;
    this.height = 50;

    this.input = new InputOutput(this.pos.x, this.pos.y + this.height / 2);

    this.style = new Style;
  }

  checkClicked() {
    
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

    if (this.input.state == false && hovering) {
      stroke(this.style.strokeHover);
      strokeWeight(this.style.strokeWeightHover);
      fill(this.style.fillHover);
    } else
    if (this.input.state == true && !hovering) {
      stroke(this.style.strokeOn);
      strokeWeight(this.style.strokeWeightOn);
      fill(this.style.fillOn);
    } else
    if (this.input.state == true && hovering) {
      stroke(this.style.strokeOnHover);
      strokeWeight(this.style.strokeWeightOnHover);
      fill(this.style.fillOnHover);
    } else
    {
      stroke(this.style.stroke);
      strokeWeight(this.style.strokeWeight);
      fill(this.style.fill);
    }

    ellipseMode(CORNER);
    ellipse(this.pos.x, this.pos.y, this.width, this.height);
  }
}
