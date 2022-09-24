import { getInputDirection } from "./input.js";

export let SNAKE_SPEED = 5;
let snakeSpeedIncrease;
// let snakeSpeed2;
export function startGame() {
  let person = prompt("please enter snake speed 1-10", SNAKE_SPEED);
  if (person == null || person == "") {
    snakeSpeedIncrease = "User cancelled the prompt";
  } else {
    snakeSpeedIncrease = person;
    SNAKE_SPEED = snakeSpeedIncrease;
    // console.log(SNAKE_SPEED);
  }
}
console.log(snakeSpeedIncrease);

const snakeBody = [{ x: 11, y: 11 }];

let newSegment = 0;

export function update() {
  addSegment();

  const inputDirection = getInputDirection();
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }
  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}

export function draw(gameBoard) {
  snakeBody.forEach((segment) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add("snake");
    gameBoard.appendChild(snakeElement);
  });
}

export const expandSnake = function (amount) {
  newSegment += amount;
  // console.log(newSegment);
};

export const onSnake = function (position, { ignoreHead = false } = {}) {
  return snakeBody.some((segment, index) => {
    // console.log(segment, position)
    if (ignoreHead && index === 0) return false;
    return equalPosition(segment, position);
  });
};

export function getSnakeHead() {
  return snakeBody[0];
}

export function snakeInterSection() {
  return onSnake(snakeBody[0], { ignoreHead: true });
}

const equalPosition = function (pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
};

const addSegment = function () {
  // console.log(snakeBody.push({ ...snakeBody[snakeBody.length + 1] }));
  for (let i = 0; i < newSegment; i++) {
    // console.log(snakeBody.length);
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }
  newSegment = 0;
};
