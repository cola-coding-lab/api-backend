const PaddlePosition = {
  left: 'LEFT',
  right: 'RIGHT',
};

class Paddle {
  constructor(color = 'white', position = PaddlePosition.left, height = 50, width = 20, y = 10) {
    this.width = width;
    this.height = height;
    this.y = y;
    this.color = color;
    this.position = position;
    this.points = 0;

    if (this.position === PaddlePosition.left) {
      this.x = 10;
    } else {
      this.x = boardWidth() - 10 - this.width;
    }

  }

  draw() {
    fill(color(this.color));
    rect(this.x, this.y, this.width, this.height);
  }

  up(distance = 5) {
    this.y -= distance;
    if (this.y < 0) {
      this.y = 0;
    }
  }

  down(distance = 5) {
    this.y += distance;
    if (this.y > boardHeight() - this.height) {
      this.y = boardHeight() - this.height;
    }
  }
}
