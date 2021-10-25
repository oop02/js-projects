let colors;
let grid = create2DArray(10, 20);

function setup() {
	createCanvas(600, 600);
	
	colors = {
		blue: color(0, 0, 255),
		red: color(255, 0, 0),
		green: color(0, 255, 0)
	}
	
	for (let row of grid) {
		for (let bubble of grid[row]) {
			//create a bubble
		}
	}
}

function draw() {
	background(50);
	bubble.show();
}

function create2DArray(cols, rows) {
	let arr = [];
	for (let i = 0; i < rows; i++) {
		arr[i] = [];
		for (let j = 0; j < cols; j++) {
			arr[i][j] = undefined;
		}
	}
	return arr;
}
