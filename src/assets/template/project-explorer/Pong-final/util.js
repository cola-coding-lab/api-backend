const PADDING = 10;

const KEY_W = 87;
const KEY_S = 83;


function boardWidth() {
  return windowWidth - PADDING;
}

function boardHeight() {
  return windowHeight - PADDING;
}

function windowResized() {
  resizeCanvas(boardWidth(), boardHeight());
}
