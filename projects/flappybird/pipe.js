class Pipe {
  constructor(x, y, pipeWidth, gapSize) {
    this.x = x;
    this.gapPos = y;
    this.pipeWidth = pipeWidth;
    this.gapSize = gapSize;

    this.scored = false;

    this.bottomPipeY = this.gapPos + this.gapSize / 2;
    this.bottomPipeHeight = height - this.gapPos - this.gapSize / 2;

    this.topPipeY = 0;
    this.topPipeHeight = this.gapPos - this.gapSize / 2;
  }

  move() {
    this.x-= 4; //move left
  }

  show() {
    push();
    fill(0, 150, 0);
    stroke(0);
    strokeWeight(3);
    rect(this.x, this.bottomPipeY, this.pipeWidth, this.bottomPipeHeight); //bottom pipe
    rect(this.x, this.topPipeY, this.pipeWidth, this.topPipeHeight); //top pipe
    pop();
  }

  update() {
    this.move();
    this.show();
  }
}
