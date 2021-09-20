var ball;
var p1;
var p2;

function setup() {
  createCanvas(boardWidth(), boardHeight());   // = game-board (full screen)
  // TODO: create a Ball and two Paddles (for the two players)
}

function draw() {
  background(220);

  // TODO:
  // * draw ball and players (paddles)
  // * move ball
  // * check if ball collides with an edge
  // * check if ball collides with an paddle
  // * ...

  checkKeyboardInput();
}

/**
 * print the current points of both players on the game-board
 */
function printPoints() {
  textSize(32);
  fill(0);
  text(`P1: ${p1.points} | P2: ${p2.points}`, boardWidth() / 2 - 82, 20 + 32);
}

/**
 * navigation for the players
 */
function checkKeyboardInput() {
  // 'W' is pressed
  if (keyIsDown(KEY_W)) {
    // TODO
  }
  // 'S' is pressed
  if (keyIsDown(KEY_S)) {
    // TODO
  }
  // 'UP-Arrow' is pressed
  if (keyIsDown(UP_ARROW)) {
    // TODO
  }
  // 'DOWN-Arrow' is pressed
  if (keyIsDown(DOWN_ARROW)) {
    // TODO
  }
}
