let bird;
let birdImg
let pipes = [];
let count = 0;
let score = 0;
let highscore = score;

const g = 0.8;

function preload() {
  birdImg = loadImage('flappybird.png');
}

function setup() {
  createCanvas(800, 700);
  background(50);

  bird = new Bird(height / 2); //create the bird (start the game)
}

function draw() {
  background(180, 180, 255); //reset canvas

  //update bird
  bird.update();

  //loop over all pipes
  for (let i = pipes.length - 1; i >= 0; i--) {
    //update pipe
    pipes[i].update();

    //add to score if pipe passed the bird
    if (pipes[i].x < width / 2 && !pipes[i].scored) {
      score++;
      pipes[i].scored = true;
    }

    //delete pipe if offscreen
    if (pipes[i].x < -pipes[i].pipeWidth) {
      pipes.splice(i, 1);
    }

    //check if pipe collides with bird, if so restart the game
    //bottom pipe
    if (pipes[i].x < bird.x + bird.diameter &&
       pipes[i].x + pipes[i].pipeWidth > bird.x &&
       pipes[i].bottomPipeY < bird.y + bird.diameter &&
       pipes[i].bottomPipeHeight + pipes[i].bottomPipeY > bird.y) {
        resetGame();
        break;
    } else
    if (pipes[i].x < bird.x + bird.diameter &&
       pipes[i].x + pipes[i].pipeWidth > bird.x &&
       pipes[i].topPipeY < bird.y + bird.diameter &&
       pipes[i].topPipeHeight + pipes[i].topPipeY > bird.y) {
        resetGame();
        break;
    }
  }

  // check if bird hits top / bottom
  if (bird.y > height || bird.y + bird.diameter < 0) {
    resetGame(); //reset game if so
  }

  // timer for when to add pipes
  count++;
  if (count >= 100) { //adds pipe every 100 frames
    count = 0;

    //create pipe
    let pipeWidth = 80;
    let gapSize = 200;
    let gapPos = random(gapSize / 2 + 10, height - (gapSize / 2 + 10));

    let pipe = new Pipe(width + 10, gapPos, pipeWidth, gapSize);
    pipes.push(pipe);
  }

  //show text
  push();

  fill(255);
  stroke(0);
  textFont('consolas');
  //show score
  strokeWeight(4);
  textSize(60);
  textAlign(CENTER);
  text(score, width / 2, 60);

  //show highscore
  strokeWeight(2);
  textSize(20);
  textAlign(LEFT);
  text('Highscore: ' + highscore, 5, 20);

  pop();
}

function mousePressed() {
  bird.vel = -12; //push bird up
}

function resetGame() {
  pipes = [];
  count = 0;
  if (score > highscore) { //set a new highscore
    highscore = score;
  }
  score = 0;
  bird = new Bird(height / 2);
}

/*
if (rect1.x < rect2.x + rect2.width &&
   rect1.x + rect1.width > rect2.x &&
   rect1.y < rect2.y + rect2.height &&
   rect1.height + rect1.y > rect2.y) {
    // collision detected!
}
*/
