class Bubble {
	constructor(x, y, color) {
		this.pos = createVector(x, y);
		this.radius = 10;
		this.color = color;
	}
	
	show() {
		fill(this.color);
		noStroke();
		ellipseMode(RADIUS);
		ellipse(this.pos.x, this.pos.y, this.radius);
	}
}
