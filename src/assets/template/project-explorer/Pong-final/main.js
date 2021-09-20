let ball;
let p1;
let p2;

function setup() {
  createCanvas(boardWidth(), boardHeight());
  ball = new Ball(
    30,
    { x: boardWidth() / 2, y: boardHeight() / 2 },
    {
      x: Math.random() < 0.5 ? -1 : 1,
      y: Math.random() < 0.5 ? -1 : 1,
    }
  );
  p1 = new Paddle('blue', PaddlePosition.left, 150);
  p2 = new Paddle('red', PaddlePosition.right, 150);
}

function draw() {
  background(220);

  printPoints();

  ball.draw();
  p1.draw();
  p2.draw();

  ball.move();

  ball.detectPaddle(p1);
  ball.detectPaddle(p2);

  if (ball.detectEdge() === 'LEFT') {
    ball.color = 'black';
    p2.points++;
  }
  if (ball.detectEdge() === 'RIGHT') {
    ball.color = 'black';
    p1.points++;
  }

  if (keyIsDown(KEY_W)) {
    p1.up();
  }
  if (keyIsDown(KEY_S)) {
    p1.down();
  }
  if (keyIsDown(UP_ARROW)) {
    p2.up();
  }
  if (keyIsDown(DOWN_ARROW)) {
    p2.down();
  }
}

function printPoints() {
  textSize(32);
  fill(0);
  text(`P1: ${p1.points} | P2: ${p2.points}`, boardWidth() / 2 - 82, 20 + 32);
}

function keyPressed() {
  if (keyCode === 32) {
    debugger;
  }
}
