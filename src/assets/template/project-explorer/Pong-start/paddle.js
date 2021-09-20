const PaddlePosition = {
  left : 'LEFT',
  right: 'RIGHT',
};

/**
 * A paddle object, that appears on the left or right side of the game-board
 */
class Paddle {
  constructor(
    color = 'white',    // Default color will be 'white'
    position = PaddlePosition.left,  // Default position will be 'left'
    height = 50,       // Default height will be 50
    width = 20,        // Default width will be 20
    y = 10             // Default y (start point) will be 10
  ) {
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

  /**
   * draws this paddle on its x and y position with given width and height and color
   */
  draw() {
    fill(color(this.color));
    rect(this.x, this.y, this.width, this.height);
  }

  /**
   * moves the position (y) of this paddle upwards
   * @param {number} distance - the distance, how far the paddle should move upwards
   */
  up(distance = 5) {
    this.y -= distance;
    if (this.y < 0) {
      this.y = 0;
    }
  }

  /**
   * moves the position (y) of this paddle downwards
   * @param {number} distance - the distance, how far the paddle should moved downwards
   */
  down(distance = 5) {
    this.y += distance;
    if (this.y > boardHeight() - this.height) {
      this.y = boardHeight() - this.height;
    }
  }
}
