/**
 * A ball object, that could be bounce inside the game-board
 */
class Ball {
  constructor(
    diameter = 20,        // Default diameter of 20
    startPosition = { x: boardWidth() / 2, y: boardHeight() / 2 }, // start position will be the middle of the board
    startDirection = { x: randomDirection(), y: randomDirection() }, // start with a random direction
    speed = 5,            // Default speed of 5
    color = 'black'        // Default color 'black'
  ) {
    this.diameter = diameter;
    this.position = startPosition;
    this.direction = startDirection;
    this.speed = speed;
    this.color = color;
  }

  /**
   * moves this ball - set the x and y position depending of speed and direction
   */
  move() {
    this.detectEdge();
    // TODO: change the position of 'x' and 'y' to "move" the ball
  }


  /**
   * check if this ball touches one of the edges (top, right, bottom, left)
   * @returns {(string|undefined)} - return LEFT or RIGHT if collision with left or right edge is given, undefined if top or bottom edge is touched
   */
  detectEdge() {
    // left edge collision
    if (this.position.x <= 0 + this.diameter / 2) {
      this.direction.x = 1;
      return 'LEFT';
    }
    // right edge collision
    if (this.position.x >= boardWidth() - this.diameter / 2) {
      this.direction.x = -1;
      return 'RIGHT';
    }
    // TODO: TOP and BOTTOM edge collision detection
  }

  /**
   * Check if this ball touches a paddle
   * @param {Object} paddle - the paddle to be checked if an detection/collision is given
   */
  detectPaddle(paddle) {
    if (paddle.position === PaddlePosition.left) {
      if (
        this.position.y >= paddle.y &&
        this.position.y <= paddle.y + paddle.height &&
        this.position.x - this.diameter / 2 <= paddle.x + paddle.width
      ) {
        this.direction.x = 1;
        this.color = paddle.color;
        console.log('detection left');
      }
    } else {
      if (
        this.position.y >= paddle.y &&
        this.position.y <= paddle.y + paddle.height &&
        this.position.x + this.diameter / 2 >= paddle.x
      ) {
        this.direction.x = -1;
        this.color = paddle.color;
        console.log('detection right');
      }
    }
  }

  /**
   * draws this ball on its x and y position with given diameter and color
   */
  draw() {
    fill(color(this.color));
    circle(this.position.x, this.position.y, this.diameter);
  }
}
