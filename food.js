import { randomGridPosition } from "./grid.js";
import { expandSnake, onSnake, SNAKE_SPEED } from "./snake.js";


let food = getRandomFoodPosition();
const EXPANSION_RATE = SNAKE_SPEED;
console.log(EXPANSION_RATE)

export function update() {
  if (onSnake(food)) {
    scoreSpeed(EXPANSION_RATE);
    expandSnake(EXPANSION_RATE);
    food = getRandomFoodPosition();
  }
}

let scoreCount = document.getElementById("score-count");
let scoreNumber = 0;

function scoreSpeed(amount) {
  console.log(amount)
  scoreNumber += amount;
  scoreCount.innerText = scoreNumber;
}

export function draw(gameBoard) {
  const foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  gameBoard.appendChild(foodElement);
}

function getRandomFoodPosition() {
  let newFoodPosition;
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
  }
  return newFoodPosition;
}
