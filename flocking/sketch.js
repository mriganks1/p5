let boids = [];
let alignSlider, cohesionSlider, separationSlider;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  for (let i = 0; i < 100; i++) {
    let x = random(width);
    let y = random(height);
    boids.push(new Boid(createVector(x, y)));
  }
}

function draw() {
  background(51);
  let newBoids = [...boids];
  // for (let b of newBoids) {
  // }
  // boids = [...newBoids];
  for (let boid of boids) {
    boid.handleEdge();
    boid.flock(newBoids);
    boid.avoid(createVector(mouseX, mouseY));
    boid.update();
    boid.show();
  }
}

function addObstacle() {}
