import {
  update as updateSnake,
  draw as drawSnake,
  SNAKE_SPEED,
  getSnakeHead,
  snakeInterSection,
  startGame
} from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js";
import { outsideGrid } from "./grid.js";

let lastRenderTime = 0;
let gameOver = false;
let gameStart = true;
const gameBoard = document.getElementById("game-board");

console.log(SNAKE_SPEED);
if (gameStart) {
  if (window.location.pathname == "/") {
    startGame();
    main();
  } else {
    main();
  }
}
// function startGame() {

// }

function main(currentTime) {
  // console.log(window.location.pathname);
  if (gameOver) {
    if (confirm("you lost, press ok to restart")) {
      window.location = "/";
    }
    // startGame();
    return;
  }

  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
  // console.log("Render");
  lastRenderTime = currentTime;
  // console.log(secondsSinceLastRender);

  update();
  draw();
}
window.requestAnimationFrame(main);
// main()

function update() {
  updateSnake();
  updateFood();
  checkDeath();
}
function draw() {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeInterSection();
}
