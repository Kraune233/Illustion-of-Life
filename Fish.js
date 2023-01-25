class Fish {
  constructor(x, y) {
  /* Just to add some individuality to the fish wiggle */
  this.pos = createVector(x, y);
    /* Make a random veposity */
  this.vel = createVector(random(-1, 1), random(-1, 1));
  }
  
  show() {
    let s = random(-90,90);
    let d = random(0.1, 0.4);
    this.pos.add(this.vel);

    push();
    translate(this.pos.x, this.pos.y);
    scale(d * 0.5);
    /* Get the direction and add 90 degrees. */
    rotate(this.vel.heading() - random(radians(90))) * random(-radians(90), radians(90));

    beginShape();
    for (let i = 0; i <= 180; i += 20) {
      let x = sin(radians(i)) * i / 3;
      let angle = sin(radians(i + s + frameCount * 5)) * 50;
      stroke(122, 0, 0);
      noFill();
      vertex(x - angle, i * 2);
      ellipse(600, 290, 20, 20);
    }
    for (let i = 180; i >= 0; i -= 20) {
      let x = sin(radians(i)) * i / 3;
      let angle = sin(radians(i + s + frameCount * 5)) * 50;
      stroke(122, 0, 0);
      noFill();
      vertex(-x - angle, i * 2);
    }
    endShape();
    pop();
  }

  boundaries() {
    // detect if the fish touch the boundaries
    // and turn around 
    if (this.pos.x < -100) {
      this.pos.x = width + 100;
    }
    if (this.pos.x > width + 100) {
      this.pos.x = -100;
    } 
    if (this.pos.y < -100) {
      this.pos.y = height + 190;
    }
    if (this.pos.y > height + 100) {
      this.pos.y = -100;
    }
  }
}