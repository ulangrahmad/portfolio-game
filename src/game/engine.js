// Game logic for a simple 8-bit platformer
// This is a placeholder and will need more complex implementation for a real game

let score = 0;
let playerX = 0;
let playerY = 0;
let gravity = 0.5;
let velocityY = 0;
let isJumping = false;

export function initGame() {
  score = 0;
  playerX = 50; // Start in middle
  playerY = 100; // Ground level
  velocityY = 0;
  isJumping = false;
  console.log("Game Initialized!");
}

export function updateGame(deltaTime) {
  // Apply gravity
  velocityY += gravity;
  playerY += velocityY;

  // Ground collision
  if (playerY > 100) {
    playerY = 100;
    velocityY = 0;
    isJumping = false;
  }

  // Simple movement (for demo, assume input from elsewhere)
  playerX += 1 * deltaTime; // Move right
  if (playerX > 200) playerX = 0;

  score += 1;
  // console.log(`Score: ${score}, Player: (${playerX.toFixed(0)}, ${playerY.toFixed(0)})`);
}

export function jump() {
  if (!isJumping) {
    velocityY = -10; // Jump strength
    isJumping = true;
  }
}

export function getGameState() {
  return { score, playerX, playerY, isJumping };
}
