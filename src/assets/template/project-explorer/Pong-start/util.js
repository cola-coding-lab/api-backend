const PADDING = 10;

const KEY_W = 87;
const KEY_S = 83;

/**
 * width for the game-board, will be the available window width minus some global PADDING
 * @returns {number} - the width for the game-board
 */
function boardWidth() {
  return windowWidth - PADDING;
}

/**
 * height for the game-board, will be the available window height minus some global PADDING
 * @returns {number} - the height for the game-board
 */
function boardHeight() {
  return windowHeight - PADDING;
}

/**
 * p5.js function which will be called every time the browser window will resize
 */
function windowResized() {
  resizeCanvas(boardWidth(), boardHeight());
}

/**
 * helper function to get a random direction (+1 or -1)
 * @returns {(1 | -1)} - random direction
 */
function randomDirection() {
  return Math.random() > 0.5 ? -1 : 1;
}


/**
 * helper for debugging/stopping the game-loop
 */
function keyPressed() {
  if (keyCode === 32) { // press space to enter debug mode in browser
    debugger;
  }
}
