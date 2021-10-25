/* Formulas:

rho = m / v
v = m / rho

F = m * a
a  = F / m

*/


class Planet {
  constructor(x, y, mass, density, name) {
    this.name = name;

    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.force = createVector(0, 0);

    this.mass = mass; //kg
    this.density = density; //kg m^-3
    this.volume = this.mass / this.density; //m^3
    this.radius = pow(3 * (this.volume / (4 * PI)), 1 / 3); //m

    this.time = 0; //s
    this.timeStep = 20; //s

    //style

    this.color = color(255, 255, 255);
  }

  applyForce(force) {
    this.force.add(force);
  }

  update() {
    this.acc.set(this.force.x / this.mass, this.force.y / this.mass);
    let deltaVel = createVector(this.acc.x * this.timeStep, this.acc.y * this.timeStep);
    this.vel.add(deltaVel);
    let deltaPos = createVector(this.vel.x * this.timeStep, this.vel.y * this.timeStep);
    this.pos.add(deltaPos);

    this.force.set(0, 0);

    this.time += this.timeStep;
  }


  show() {
    fill(this.color);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 2 * this.radius);
  }
}
