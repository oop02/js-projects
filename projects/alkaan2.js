let slider;

function setup() {
	createCanvas(1000, 600);
	background(50);
	slider = createSlider(1, 20, 5, 1);
	angleMode(DEGREES);
}

function draw() {
	
	
	//clear
	background(50);
	
	translate(10, height / 2);
	
	let value = slider.value();
	fill(255);
	noStroke();
	
	//debug
	//text(value, 30, height / 2 - 10);
	
	//draw Lines
	stroke(255);
	noFill();
	
	rotate(30);
	
	let direction = -1;
	
	for (let i = 1; i <= value; i++) {
	line(0, 0, 50, 0);
	translate(50, 0);
	
	if (i === 6) {
		rotate(30 * direction);
		line(0, 0, 0, -50 * direction);
		rotate(-30 * direction);
	}
	
	rotate(60 * direction);
	
	direction = -direction;
	}
}