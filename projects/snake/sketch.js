let snake;
let food = [];
let score = 0;
let highscore = 0;


let state = {
  running: 0,
  paused: 1,
  menu: 2
}
let gameState = state.menu;

function setup() {
  createCanvas(windowWidth, windowHeight);
  snake = new Snake(width / 2, height / 2);
}

function draw() {
  if (gameState === state.running) {

    if (frameCount % 60 === 0) {
      score++;
    }

    addFood();

    let dir = createVector(mouseX, mouseY);
    let speed =  5 + snake.segments.length * 0.1;
    snake.move(dir, speed); //move in the direction of the mouse

    for (let i = food.length - 1; i >= 0; i--) {
      if (snake.eat(food[i])) { // if the snake eats the food...
        food.splice(i, 1); //remove the food
        score += 10;
      }
    }

    if (snake.dead()) {
      gameState = state.menu;
      if (score > highscore) {
        highscore = score;
      }
      score = 0;
      snake = new Snake(width / 2, height / 2);
    }
  }
  else if (gameState === state.menu) {
    food = [];
  }
  renderFrame();
}

function addFood() {
  let maxFood = 10;
  if (food.length < maxFood) {
    let x = random(50, width - 50);
    let y = random(50, height - 50);
    let newFood = new Food(x, y);
    food.push(newFood);
    return true;
  } else {
    return false;
  }
}

function renderFrame() {
  if (gameState === state.running || gameState === state.paused) {
    push();
    background(50);
    snake.show();
    for (let f of food) {
      f.show();
    }
    //show score
    fill(255);
    noStroke();
    textSize(30);
    text("Score: " + score, 10, 40);
    text("Highscore: " + highscore, 10, 80);
    pop();
    if (gameState === state.paused) {
      push();
      fill(255, 50, 50);
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(50);
      text("Paused", width / 2, height / 2);
      pop();
    }
  }
  else if (gameState === state.menu) {
    push();
    background(50);
    fill(255, 50, 255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(50);
    text("Snake", width / 2, height / 2);
    fill(255);
    textSize(30);
    text("Press space to start", width / 2, height / 2 + 50);
    fill(150);
    text("Highscore: " + highscore, width / 2, height / 2 + 100);
    pop();
  }
}

function keyPressed() {
  if (gameState === state.menu) {
    if (keyCode === 32) { //32 = space
      gameState = state.running;
    }
  } else if (gameState === state.running) {
    if (keyCode === 27) { // 27 = escape
      console.log("pause");
      gameState = state.paused;
    }
  } else if (gameState === state.paused) {
    if (keyCode === 27) {
      console.log("unpause");
      gameState = state.running;
    }
  }
}
