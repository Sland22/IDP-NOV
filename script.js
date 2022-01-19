let snake 
let rez = 20; // how big game resolution is, higer is more stretched 
let food;
let w;
let h;

function setup() {
  createCanvas(600, 400);// game size
  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(10)
  snake = new Snake();
  foodLocation();
}

function foodLocation() { //food spawn
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);

}

function keyPressed() { //direction of snake
  if (keyCode === LEFT_ARROW) {
    snake.setDir(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    snake.setDir(1, 0);
  } else if (keyCode === DOWN_ARROW) {
    snake.setDir(0, 1);
  } else if (keyCode === UP_ARROW) {
    snake.setDir(0, -1);
  } else if (key == 'q') { // add 1 cube to snake per press
    snake.grow();
  }

}

function draw() {
  scale(rez);
  background(255, 255, 0);
  if (snake.eat(food)) {
    foodLocation();
  }
  snake.update(); // size change
  snake.show();


  if (snake.endGame()) {
    print("END GAME");// in console
    background(0);
    noLoop();
  }

  noStroke();
  fill(255, 0, 0);
  rect(food.x, food.y, 1, 1); //food shape/color 
}

class Snake {
  
  constructor() { // snake creation 
  	this.body = [];
    this.body[0] = createVector(floor(w/2), floor(h/2));
    this.xdir = 0;
    this.ydir = 0;
    this.len = 0;
  }
  
  setDir(x, y) { //direction
  	this.xdir = x;
    this.ydir = y;
  }
  
  update() {
  	let head = this.body[this.body.length-1].copy();
    this.body.shift(); 
    head.x += this.xdir;
    head.y += this.ydir;
    this.body.push(head);
  }
  
  grow() {
  	let head = this.body[this.body.length-1].copy();
    this.len++;
    this.body.push(head);
  }
  
  endGame() {
  	let x = this.body[this.body.length-1].x;
    let y = this.body[this.body.length-1].y;
    if(x > w-1 || x < 0 || y > h-1 || y < 0) {
       return true;
    }
    for(let i = 0; i < this.body.length-1; i++) {
    	let part = this.body[i];
      if(part.x == x && part.y == y) {
      	return true;
      }
    }
    return false;
  }
  
  eat(pos) {
  	let x = this.body[this.body.length-1].x;
    let y = this.body[this.body.length-1].y;
    if(x == pos.x && y == pos.y) {
      this.grow();
      return true;
    }
    return false;
  }
  
  show() {
  	for(let i = 0; i < this.body.length; i++) {
    	fill(0);
      noStroke();
      rect(this.body[i].x, this.body[i].y, 1, 1)
    }
  }

}

// help from https://www.youtube.com/watch?v=AaGK-fj-BAM
// found game from https://www.google.com/search?q=snake+game&rlz=1C1GTPM_enUS902US902&oq=snake+game&aqs=chrome..69i57j0i67j0i433i512j0i131i433i512j0i433i512j69i60j69i61l2.1440j0j4&sourceid=chrome&ie=UTF-8 
//https://p5js.org/examples/interaction-snake-game.html