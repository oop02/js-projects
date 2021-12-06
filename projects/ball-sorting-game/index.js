const ballDiameter = 70;

const margin_top = 100;
const margin_sides = 40;

let colorlist;

let containers = [];
const containerCount = 4;

let holdingBall;
let holding = false;

function setup() {
    createCanvas(1200, 600);

    colorlist = [
        color(255, 100, 100), // red
        color(100, 255, 100), // green
        color(100, 100, 255), // blue
        color(255, 255, 100), // yellow
        color(255, 100, 255), // magenta
        color(100, 255, 255), // cyan
        color(255, 255, 255), // white
        color(100, 100, 100), // gray
    ];

    let totalWidth = containerCount*(ballDiameter+6) + (containerCount - 1)*margin_sides;
    let beginX = (width - totalWidth)/2 + ballDiameter/2 + 3;

    for(let i = 0; i < containerCount; i++) {
        containers[i] = new Container(beginX + i*(ballDiameter + margin_sides + 6));
    }

    let balls = [];
    for(let i = 0; i < containerCount - 2; i++) {
        for(let j = 0; j < 4; j++) {
            balls.push(new Ball(colorlist[i]));
        }
    }
    shuffle(balls, true);
    for(let i = 0; i < containerCount - 2; i++) {
        for(let j = 0; j < 4; j++) {
            containers[i].addBall(balls[i+j*(containerCount - 2)]);
        }
    }
}

function draw() {
    background(50);
    for(let c of containers) {
        c.show();
    }

    if(holding) {
        holdingBall.pos.x = mouseX;
        holdingBall.show();
    }
}

function mousePressed() {
    for(let c of containers) {
        if(
        abs(mouseX - c.location) < ballDiameter/2 + 3 && 
        !holding && 
        c.balls.length != 0) 
        {
            holdingBall = c.balls.pop();
            holding = true;
            holdingBall.pos.y = margin_top - ballDiameter/2 - 3;
        } 
        else if(
        abs(mouseX - c.location) < ballDiameter/2 + 3 && 
        holding && 
        c.balls.length < 4 &&
        (c.balls.length == 0 || c.balls[c.balls.length-1].color == holdingBall.color)) 
        {
            c.addBall(holdingBall);
            holding = false;
        }
    }
}