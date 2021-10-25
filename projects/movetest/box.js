class Square {
  constructor(x, y, w, h) {
    this.pos = createVector(x, y);
    this.width = w;
    this.height = h;
    this.dragging = false;
  }

  hovering() {
    if (
      mouseX >= this.pos.x &&
      mouseX <= this.pos.x + this.width &&
      mouseY >= this.pos.y &&
      mouseY <= this.pos.y + this.height
    ) {
      return true;
    } else {
      return false;
    }
  }

  update() {
    if (this.dragging) {
      let newX = mouseX - this.width / 2;
      let newY = mouseY - this.height / 2;
      this.pos.set(newX, newY);
    }
  }

  show() {
    if (this.hovering()) {
      fill(200);
    } else {
      fill(255);
    }
    rect(this.pos.x, this.pos.y, this.width, this.height);
  }
}
