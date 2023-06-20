// Set up the delay between frames
const delay = 1000;

// Initialize the canvas and context
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Set up the initial snake position and size
const snakeSize = 20;

let snake;
let food;
let dx;
let dy;

// Function to draw the snake and food on the canvas
const draw = () => {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move the snake
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  // Check if the snake has collided with the walls
  if (
    (head.x < 0 ||
    head.x >= canvas.width ||
    head.y < 0 ||
    head.y >= canvas.height)
    || 
    (snake.filter(el => el.x === head.x && el.y === head.y).length > 1)
  )
  {
    // Game over
    alert("Game over!");
    resetGame();
    return;
  }

  // Check if the snake has collided with the food
  if (head.x === food.x && head.y === food.y) {
    // Generate new food position
    generateFood();
  } else {
    // Remove the tail of the snake
    snake.pop();
  }

  // Draw the snake
  ctx.fillStyle = "green";
  snake.forEach(segment => {
    ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize);
  });

  // Draw the food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, snakeSize, snakeSize);

  // Call the draw function again after the delay
  setTimeout(draw, delay);
}

// Function to generate new food position
const generateFood = () => {
  food.x = Math.floor(Math.random() * (canvas.width / snakeSize)) * snakeSize;
  food.y = Math.floor(Math.random() * (canvas.height / snakeSize)) * snakeSize;

  // Check if the new food position overlaps with the snake, generate again if so
  for (let i = 0; i < snake.length; i++) {
    if (snake[i].x === food.x && snake[i].y === food.y) {
      generateFood();
      break;
    }
  }
}

// Function to handle keyboard input
const handleInput = (event) => {
  const key = event.key;

  if (key === "ArrowUp" && dy !== snakeSize) {
    dx = 0;
    dy = -snakeSize;
  } else if (key === "ArrowDown" && dy !== -snakeSize) {
    dx = 0;
    dy = snakeSize;
  } else if (key === "ArrowLeft" && dx !== snakeSize) {
    dx = -snakeSize;
    dy = 0;
  } else if (key === "ArrowRight" && dx !== -snakeSize) {
    dx = snakeSize;
    dy = 0;
  }
}

const resetGame = () => {
    snake = [{ x: 0, y: 0 }];

    // Set up the initial food position
    food = { x: 100, y: 100 };

    // Set up the initial snake movement
    dx = snakeSize;
    dy = 0;
    generateFood();
}

// Attach the input event listener
document.addEventListener("keydown", handleInput);

// Start the game loop
resetGame();
draw();
