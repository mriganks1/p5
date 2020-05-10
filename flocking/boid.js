class Boid {
  position;
  velocity;
  acceleration;
  maxForce = random(1, 3);
  maxSpeed = random(5, 8);
  followPerception = 100;
  avoidPerception = 50;

  constructor(pos) {
    this.position = pos;
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(2, 4));
    this.acceleration = createVector();
  }

  flock(others, avoid) {
    let followTotal = 0;
    let avoidTotal = 0;
    let alignment = createVector();
    let cohesion = createVector();
    let seperation = createVector();
    push();
    translate(this.position.x, this.position.y);
    for (let other of others) {
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      let angle = degrees(this.position.angleBetween(other.position));
      // console.log(angle);
      if (
        other != this &&
        d < this.followPerception &&
        angle > -45 &&
        angle < 45
      ) {
        alignment.add(other.velocity);
        cohesion.add(other.position);
        followTotal++;
      }
      if (
        other != this &&
        d < this.avoidPerception &&
        angle > -30 &&
        angle < 30
      ) {
        let dist = p5.Vector.sub(this.position, other.position);
        dist.div(d * d);
        seperation.add(dist);
        avoidTotal++;
      }
    }
    pop();
    if (followTotal > 0) {
      alignment.div(followTotal);
      alignment.setMag(this.maxSpeed);
      alignment.sub(this.velocity);
      alignment.limit(this.maxForce);

      cohesion.div(followTotal);
      cohesion.sub(this.position);
      cohesion.setMag(this.maxSpeed);
      cohesion.sub(this.velocity);
      cohesion.limit(this.maxForce);
    }
    if (avoidTotal > 0) {
      seperation.div(avoidTotal);
      seperation.setMag(this.maxSpeed);
      seperation.sub(this.velocity);
      seperation.limit(this.maxForce * 1.2);
    }
    // alignment.mult(alignSlider.value());
    // cohesion.mult(cohesionSlider.value());
    // seperation.mult(cohesionSlider.value());

    // this.avoid(avoid);

    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
    this.acceleration.add(seperation);
  }

  avoid(pt) {
    // console.log(pt);
    push();
    fill("red");
    noStroke();
    ellipse(pt.x, pt.y, 20);
    translate(this.position.x, this.position.y);
    let seperation = createVector();
    let steer = createVector();
    let dist = p5.Vector.sub(pt, this.position);
    let angle = degrees(this.position.angleBetween(pt));
    let d = dist.mag();
    if (d < this.avoidPerception && angle > -135 && angle < 135) {
      seperation.add(dist);
      seperation.mult(-1);
      steer = p5.Vector.sub(seperation, this.velocity);
      steer.setMag(this.maxSpeed);
      // steer.sub(this.position);
      steer.limit(this.maxForce * 1.5);
    }
    this.acceleration.add(steer);
    pop();
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
  }

  show() {
    // push();
    // stroke("green");
    // strokeWeight(2);
    // translate(this.position.x, this.position.y);
    // line(0, 0, this.velocity.x * 10, this.velocity.y * 10);
    // pop();
    stroke(255);
    strokeWeight(5);
    point(this.position.x, this.position.y);
  }

  handleEdge() {
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }
    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
  }
}
