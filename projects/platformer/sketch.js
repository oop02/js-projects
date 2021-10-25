let player;
let platforms = [];
let g;
let offset;
let stickman;

function preload() {
  stickman = loadImage('stickman.png')
}


function setup() {
  createCanvas(800, 600);
  background(50);
  rectMode(CENTER);

  g = createVector(0, 0.7);
  offset = createVector(0, 0);
  player = new Player(0, 0);
}

function draw() {
  translate(width / 2, height / 2);
  background(50);
  offset.set(player.pos.x, player.pos.y);

  push();
  stroke(0, 255, 0);
  line(-width / 2, height - offset.y, width / 2, height - offset.y);
  pop();

  update();
  render();


  text("player X = " + player.pos.x, -100, -200);
  text("player Y = " + player.pos.y, -100, -180);

}

function mousePressed() {
  let platform = new Platform(mouseX + offset.x - width / 2, mouseY + offset.y - height / 2, 200, 20);
  platforms.push(platform);
}

function update() {
  //update player
  if(player.onGround() && player.vel.y >= 0) {
    player.vel.y = 0;
  } else {
    player.applyForce(g);
  }
  player.move();
  //player.show();

  //update platforms
  /*for (let p of platforms) {
    p.show(offset);
  }*/
}

function render() {
  player.show(stickman);
  for (let p of platforms) {
    p.show(offset);
  }
}
