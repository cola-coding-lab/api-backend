function setup() {
  createCanvas(400, 400);
}

let y = 0;

function draw() {
  background(220);
  circle(190, y +=5, 20);
  if(y > 410) {
    y = -10;
    console.log('reset');
  }
}
