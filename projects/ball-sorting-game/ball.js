class Ball {
    constructor(color) {

        this.color = color;

        this.pos = createVector(0, 0);
    }

    show() {
        push();
        fill(this.color);
        noStroke();

        circle(this.pos.x, this.pos.y, ballDiameter);

        pop();
    }
}
