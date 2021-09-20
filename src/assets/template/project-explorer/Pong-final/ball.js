class Ball {
  constructor(
    diameter = 20,
    startPosition = { x: 0, y: 0 },
    startDirection = { x: 1, y: 1 },
    speed = 5,
    color = 'black'
  ) {
    this.diameter = diameter;
    this.position = startPosition;
    this.direction = startDirection;
    this.speed = speed;
    this.color = color;
  }

  move() {
    // this.detectEdge();
    this.position.x += this.speed * this.direction.x;
    this.position.y += this.speed * this.direction.y;
  }

  detectEdge() {
    // left edge collision
    if (this.position.x <= 0 + this.diameter / 2) {
      this.direction.x = 1;
      return 'LEFT';
    }
    // right edge collission
    if (this.position.x >= boardWidth() - this.diameter / 2) {
      this.direction.x = -1;
      return 'RIGHT';
    }
    // top edge collision
    if (this.position.y <= 0 + this.diameter / 2) {
      this.direction.y = 1;
    }
    // bottom edge collision
    if (this.position.y >= boardHeight() - this.diameter / 2) {
      this.direction.y = -1;
    }
  }

  detectPaddle(paddle) {
    if (paddle.position === PaddlePosition.left) {
      if (
        this.position.y >= paddle.y &&
        this.position.y <= paddle.y + paddle.height &&
        this.position.x - this.diameter / 2 <= paddle.x + paddle.width
      ) {
        this.direction.x = 1;
        this.color = paddle.color;
        console.log('detection');
      }
    } else {
      if (
        this.position.y >= paddle.y &&
        this.position.y <= paddle.y + paddle.height &&
        this.position.x + this.diameter / 2 >= paddle.x
      ) {
        this.direction.x = -1;
        this.color = paddle.color;
        console.log('detection');
      }
    }
  }

  draw() {
    fill(color(this.color));
    circle(this.position.x, this.position.y, this.diameter);
  }
}
