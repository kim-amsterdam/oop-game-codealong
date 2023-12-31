/************ MAKING THE PLAYER CLASS ************/
class Player {
  constructor() {
    this.width = 20;
    this.height = 10;
    this.positionX = 50 - (this.width / 2);
    this.positionY = 0;
    this.domElement = null;
console.log(this.positionX)
    this.createDomElement();
  }
  createDomElement() {
    this.domElement = document.createElement("div");

    this.domElement.id = "player";
    this.domElement.style.width = this.width + "vw"; // whenever I create a dom element, I create an id with this information.
    this.domElement.style.height = this.height + "vh"; // concatenating a number and a string is not always ideal, but it will work in this case.
    this.domElement.style.left = this.positionX + "vw"; // concatenating a number and a string is not always ideal, but it will work in this case.
    this.domElement.style.bottom = this.positionY + "vh"; // concatenating a number and a string is not always ideal, but it will work in this case.

    const parentElm = document.getElementById("board"); //linking to the id board in the div we made to start the game in.
    parentElm.appendChild(this.domElement); //makes a new div inside the board div we already had
  }
  moveLeft() {
    this.positionX--;
    this.domElement.style.left = this.positionX + "vw";
  }
  moveRight() {
    this.positionX++;
    this.domElement.style.left = this.positionX + "vw";
  }
}

/************ MAKING THE OBSTACLES CLASS ************/
class Obstacle {
  constructor() {
    this.width = 20;
    this.height = 10;
    this.positionX = 50;
    this.positionY = 100;
    this.domElement = null;

    this.createDomElement();
  }
  createDomElement() {
    this.domElement = document.createElement("div");

    this.domElement.className = "obstacle";
    this.domElement.style.width = this.width + "vw";
    this.domElement.style.height = this.height + "vh";
    this.domElement.style.left = this.positionX + "vw";
    this.domElement.style.bottom = this.positionY + "vh";

    const parentElm = document.getElementById("board");
    parentElm.appendChild(this.domElement);
  }
  moveDown() {
    this.positionY -= 1;
    this.domElement.style.bottom = this.positionY + "vw";
  }
}

const player = new Player(); //every time you make a new Player, you invoke the class
const obstaclesArr = []; // will store instances of the class Obstacle

/************ CREATES THE OBSTACLES ************/
setInterval(() => {
  const newObstacle = new Obstacle();
  obstaclesArr.push(newObstacle);
}, 5000);

/************ MAKING THE OBSTACLES MOVE & DETECT COLLISION ************/
setInterval(() => {
  obstaclesArr.forEach((obstacleInstance) => {
    obstacleInstance.moveDown();
    if (
        player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
        player.positionX + player.width > obstacleInstance.positionX &&
        player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
        player.positionY + player.height > obstacleInstance.positionY
    ) {
        console.log("Game over my fren!");
        location.href = "./gameover.html"
    }
  });
}, 50); 

//detecting + invoking when pressed left or right key
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    player.moveLeft();
  } else if (event.key === "ArrowRight") {
    player.moveRight();
  }
});
