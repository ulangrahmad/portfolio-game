import { useCallback, useEffect, useRef, useState } from "react";
import { sfx } from "../utils/sfx";

const WIDTH = 420;
const HEIGHT = 360;
const PLAYER_Y = HEIGHT - 42;

function makeEnemy(id) {
  return {
    id,
    x: 20 + Math.random() * (WIDTH - 40),
    y: -20,
    speed: 0.7 + Math.random() * 0.9,
  };
}

export default function SimpleGame() {
  const canvasRef = useRef(null);
  const keysRef = useRef(new Set());
  const frameRef = useRef(0);
  const stateRef = useRef(null);
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);

  const reset = useCallback(() => {
    stateRef.current = {
      playerX: WIDTH / 2 - 12,
      bullets: [],
      enemies: [makeEnemy(1), makeEnemy(2), makeEnemy(3)],
      score: 0,
      lives: 3,
      nextId: 4,
      shootCooldown: 0,
      gameOver: false,
    };
    setScore(0);
    setLives(3);
    setRunning(true);
    sfx.start();
  }, []);

  const shoot = useCallback(() => {
    const state = stateRef.current;
    if (!state || state.shootCooldown > 0 || state.gameOver) return;
    state.bullets.push({ x: state.playerX + 10, y: PLAYER_Y - 8 });
    state.shootCooldown = 14;
    sfx.select();
  }, []);

  const update = useCallback(() => {
    const state = stateRef.current;
    if (!state || !running || state.gameOver) return;

    if (keysRef.current.has("ArrowLeft") || keysRef.current.has("KeyA")) state.playerX -= 4;
    if (keysRef.current.has("ArrowRight") || keysRef.current.has("KeyD")) state.playerX += 4;
    if (keysRef.current.has("Space")) shoot();

    state.playerX = Math.max(8, Math.min(WIDTH - 32, state.playerX));
    state.shootCooldown = Math.max(0, state.shootCooldown - 1);

    state.bullets = state.bullets
      .map((bullet) => ({ ...bullet, y: bullet.y - 7 }))
      .filter((bullet) => bullet.y > -12);

    state.enemies = state.enemies.map((enemy) => ({ ...enemy, y: enemy.y + enemy.speed }));

    for (const enemy of state.enemies) {
      if (enemy.y > HEIGHT) {
        state.lives -= 1;
        enemy.x = 20 + Math.random() * (WIDTH - 40);
        enemy.y = -20;
        enemy.speed = 0.7 + Math.random() * 0.9;
        sfx.error();
      }
    }

    for (const bullet of state.bullets) {
      for (const enemy of state.enemies) {
        const hit = Math.abs(bullet.x - enemy.x) < 18 && Math.abs(bullet.y - enemy.y) < 18;
        if (hit) {
          bullet.dead = true;
          enemy.x = 20 + Math.random() * (WIDTH - 40);
          enemy.y = -20;
          enemy.speed = 0.8 + Math.random() * 1.2;
          state.score += 10;
          sfx.coin();
        }
      }
    }

    state.bullets = state.bullets.filter((bullet) => !bullet.dead);

    if (state.lives <= 0) {
      state.gameOver = true;
      setRunning(false);
      sfx.error();
    }

    setScore(state.score);
    setLives(state.lives);
  }, [running, shoot]);

  const drawPixelShip = (ctx, x, y) => {
    ctx.fillStyle = "#00f0ff";
    ctx.fillRect(x + 10, y, 8, 8);
    ctx.fillRect(x + 6, y + 8, 16, 8);
    ctx.fillRect(x + 2, y + 16, 24, 8);
    ctx.fillStyle = "#ffd000";
    ctx.fillRect(x + 10, y + 24, 8, 6);
  };

  const drawEnemy = (ctx, x, y) => {
    ctx.fillStyle = "#ff5277";
    ctx.fillRect(x, y, 24, 8);
    ctx.fillRect(x + 4, y + 8, 16, 8);
    ctx.fillRect(x, y + 16, 6, 6);
    ctx.fillRect(x + 18, y + 16, 6, 6);
    ctx.fillStyle = "#fff";
    ctx.fillRect(x + 6, y + 9, 4, 4);
    ctx.fillRect(x + 14, y + 9, 4, 4);
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const state = stateRef.current;
    if (!canvas || !state) return;

    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    ctx.fillStyle = "#110826";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.fillStyle = "rgba(255,255,255,0.18)";
    for (let i = 0; i < 32; i += 1) {
      const x = (i * 53 + state.score) % WIDTH;
      const y = (i * 37 + state.score * 2) % HEIGHT;
      ctx.fillRect(x, y, 2, 2);
    }

    ctx.fillStyle = "#ffffff";
    for (const bullet of state.bullets) ctx.fillRect(bullet.x, bullet.y, 4, 12);
    for (const enemy of state.enemies) drawEnemy(ctx, enemy.x, enemy.y);
    drawPixelShip(ctx, state.playerX, PLAYER_Y);

    ctx.fillStyle = "#ffd000";
    ctx.font = "24px VT323";
    ctx.fillText(`SCORE ${state.score}`, 12, 26);
    ctx.fillText(`HP ${Math.max(0, state.lives)}`, WIDTH - 70, 26);

    if (state.gameOver) {
      ctx.fillStyle = "rgba(0,0,0,0.72)";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      ctx.fillStyle = "#ff5277";
      ctx.font = "48px VT323";
      ctx.fillText("GAME OVER", WIDTH / 2 - 95, HEIGHT / 2);
    }
  }, []);

  useEffect(() => {
    const down = (event) => {
      keysRef.current.add(event.code);
      if (event.code === "Space") event.preventDefault();
    };
    const up = (event) => keysRef.current.delete(event.code);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  useEffect(() => {
    if (!stateRef.current) reset();

    const loop = () => {
      update();
      draw();
      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, [draw, reset, update]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-4 flex-wrap justify-center text-xl">
        <span className="text-[var(--color-game-yellow)]">SCORE: {score}</span>
        <span className="text-[var(--color-game-pink)]">HP: {Math.max(0, lives)}</span>
      </div>

      <canvas
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
        className="border-4 border-white bg-black max-w-full"
        style={{ imageRendering: "pixelated" }}
      />

      <div className="flex gap-3 flex-wrap justify-center">
        <button 
          className="pixel-button" 
          onMouseDown={() => keysRef.current.add("ArrowLeft")} 
          onMouseUp={() => keysRef.current.delete("ArrowLeft")}
          onTouchStart={(e) => { e.preventDefault(); keysRef.current.add("ArrowLeft"); }}
          onTouchEnd={(e) => { e.preventDefault(); keysRef.current.delete("ArrowLeft"); }}
        >◄</button>
        <button className="pixel-button pixel-button-yellow" onClick={shoot}>FIRE</button>
        <button 
          className="pixel-button" 
          onMouseDown={() => keysRef.current.add("ArrowRight")} 
          onMouseUp={() => keysRef.current.delete("ArrowRight")}
          onTouchStart={(e) => { e.preventDefault(); keysRef.current.add("ArrowRight"); }}
          onTouchEnd={(e) => { e.preventDefault(); keysRef.current.delete("ArrowRight"); }}
        >►</button>
        <button className="pixel-button" onClick={reset}>RESET</button>
      </div>

      <p className="text-xl text-[var(--color-game-cyan)] text-center">
        MOVE: A/D OR ARROWS · SHOOT: SPACE
      </p>
    </div>
  );
}
