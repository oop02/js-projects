class Snake {
  constructor(x, y) {
    this.segments = []; // list of all segments (index 0 is the head)
    this.addSegment(x, y); // add the first segment (head)
  }

  show() {
    for (let s of this.segments) {
      s.show(); // show all segments in the list of segments
    }
  }

  move(destination, speed) {
    this.segments[0].move(destination, speed); //move the head in the direction of the destination

    // following code will move the other segments
    if (this.segments.length > 1) { // only move other segments if there are more
      for (let i = 1; i < this.segments.length; i++) { //start at 1 (head already moved)
        let segment = this.segments[i];
        let nextSegment = this.segments[i - 1];
        let distance = dist(segment.pos.x, segment.pos.y, nextSegment.pos.x, nextSegment.pos.y);
        let speed = distance - segment.radius - nextSegment.radius; // speed = size of the gap between segments
        segment.move(nextSegment.pos, speed); // move the segment
      }
    }
  }

  eat(food) {
    let head = this.segments[0];
    let tail = this.segments[this.segments.length - 1];
    let distance = dist(head.pos.x, head.pos.y, food.pos.x, food.pos.y);
    if (distance < head.radius + food.radius) { // if food piece overlaps head
      /*let newPos;
      let dx;
      let dy;
      if (this.segments.length = 1) {
        dx = tail.pos.x - mouseX;
        dy = tail.pos.y - mouseY;
      } else {
        let beforeTail = this.segments[this.segments.length - 2];
        dx = beforeTail.pos.x - tail.pos.x;
        dy = beforeTail.pos.y - tail.pos.y;
      }
      newPos = createVector(dx, dy);
      newPos.setMag(tail.radius * 2);*/
      let newPos = createVector(tail.pos.x, tail.pos.y + tail.radius * 2);
      this.addSegment(newPos.x, newPos.y); //add a new segment below the tail
      return true;
    } else {
      return false;
    }
  }

  addSegment(segmentX, segmentY) {
    this.segments.push(new Segment(segmentX, segmentY)); // add a new segment to the list of segments
  }

  dead() {
    let head = this.segments[0];

    if (head.pos.x < head.radius || head.pos.x > width - head.radius || head.pos.y < head.radius || head.pos.y > height - head.radius) { // hit the edges
      return true;
    }

    if (dist(head.pos.x, head.pos.y, mouseX, mouseY) < head.radius) { //hit the mouse
      return true;
    }

    for (let i = 1; i < this.segments.length; i++) { // hit the tail
      let segment = this.segments[i];
      let distance = dist(head.pos.x, head.pos.y, segment.pos.x, segment.pos.y);
      if (distance < head.radius + segment.radius - 1) {
        return true;
      }
    }
    return false;
  }
}

class Segment {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.radius = 10;
    this.color = random(360);
  }

  show() {
    colorMode(HSB)
    fill(this.color, 100, 100);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 2 * this.radius);
  }

  move(destination, speed) {
    let dirX = destination.x - this.pos.x;
    let dirY = destination.y - this.pos.y;
    let dir = createVector(dirX, dirY); // vector pointing in the right direction
    dir.setMag(speed); // set the right speed
    this.pos.add(dir);
  }
}
