class Container {
    constructor(x) {
        this.location = x;
        this.width = ballDiameter + 6;
        this.height = ballDiameter * 4 + 15;

        this.balls = [];
    }

    addBall(ball) {
        ball.pos.x = this.location;
        let baseY = margin_top + this.height - ballDiameter/2 - 3;
        ball.pos.y = baseY - (this.balls.length)*(3+ballDiameter);
        this.balls.push(ball);
    }


    show() {
        push();
        stroke(255);
        noFill();

        beginShape();
        vertex(this.location - this.width/2, margin_top); // top left
        vertex(this.location - this.width/2, margin_top + this.height) // bottom left
        vertex(this.location + this.width/2, margin_top + this.height) // bottom right
        vertex(this.location + this.width/2, margin_top); // top right
        endShape();

        pop();

        for(let b of this.balls) {
            b.show();
        }
    }
}