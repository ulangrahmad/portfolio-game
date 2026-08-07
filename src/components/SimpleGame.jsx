import { useCallback, useEffect, useRef, useState } from "react";

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

function holdKey(keysRef, code, active) {
  if (active) keysRef.current.add(code);
  else keysRef.current.delete(code);
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
  }, []);

  const shoot = useCallback(() => {
    const state = stateRef.current;
    if (!state || state.shootCooldown > 0 || state.gameOver) return;
    state.bullets.push({ x: state.playerX + 10, y: PLAYER_Y - 8 });
    state.shootCooldown = 14;
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
        }
      }
    }

    state.bullets = state.bullets.filter((bullet) => !bullet.dead);

    if (state.lives <= 0) {
      state.gameOver = true;
      setRunning(false);
    }

    setScore(state.score);
    setLives(state.lives);
  }, [running, shoot]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const state = stateRef.current;
    if (!canvas || !state) return;

    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    ctx.fillStyle = "#161616";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.fillStyle = "rgba(255,255,255,0.12)";
    for (let i = 0; i < 28; i += 1) {
      const x = (i * 53 + state.score) % WIDTH;
      const y = (i * 37 + state.score * 2) % HEIGHT;
      ctx.fillRect(x, y, 2, 2);
    }

    ctx.fillStyle = "#f0eee8";
    for (const bullet of state.bullets) ctx.fillRect(bullet.x, bullet.y, 4, 12);

    ctx.fillStyle = "#a85656";
    for (const enemy of state.enemies) {
      ctx.fillRect(enemy.x, enemy.y, 24, 8);
      ctx.fillRect(enemy.x + 4, enemy.y + 8, 16, 8);
    }

    ctx.fillStyle = "#b8945a";
    ctx.fillRect(state.playerX + 10, PLAYER_Y, 8, 8);
    ctx.fillRect(state.playerX + 6, PLAYER_Y + 8, 16, 8);
    ctx.fillRect(state.playerX + 2, PLAYER_Y + 16, 24, 8);

    ctx.fillStyle = "#c8c4bc";
    ctx.font = "14px Inter, sans-serif";
    ctx.fillText(`SCORE ${state.score}`, 12, 22);
    ctx.fillText(`HP ${Math.max(0, state.lives)}`, WIDTH - 62, 22);

    if (state.gameOver) {
      ctx.fillStyle = "rgba(0,0,0,0.7)";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      ctx.fillStyle = "#f0eee8";
      ctx.font = "22px Space Grotesk, sans-serif";
      ctx.fillText("GAME OVER", WIDTH / 2 - 62, HEIGHT / 2);
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

  const bindHold = (code) => ({
    onMouseDown: () => holdKey(keysRef, code, true),
    onMouseUp: () => holdKey(keysRef, code, false),
    onMouseLeave: () => holdKey(keysRef, code, false),
    onTouchStart: (e) => {
      e.preventDefault();
      holdKey(keysRef, code, true);
    },
    onTouchEnd: (e) => {
      e.preventDefault();
      holdKey(keysRef, code, false);
    },
    onTouchCancel: (e) => {
      e.preventDefault();
      holdKey(keysRef, code, false);
    },
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-4 flex-wrap justify-center text-sm text-[var(--color-muted)]">
        <span>Score: {score}</span>
        <span>HP: {Math.max(0, lives)}</span>
      </div>

      <canvas
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
        className="border border-[var(--color-border)] rounded-[10px] bg-black max-w-full"
        style={{ imageRendering: "pixelated", touchAction: "none" }}
      />

      <div className="flex gap-3 flex-wrap justify-center">
        <button type="button" className="pixel-button" {...bindHold("ArrowLeft")}>
          ◄
        </button>
        <button type="button" className="pixel-button pixel-button-yellow" onClick={shoot}>
          Fire
        </button>
        <button type="button" className="pixel-button" {...bindHold("ArrowRight")}>
          ►
        </button>
        <button type="button" className="pixel-button" onClick={reset}>
          Reset
        </button>
      </div>

      <p className="text-sm text-[var(--color-muted)] text-center m-0">
        Move: A/D or arrows · Shoot: space · Hold side buttons on mobile
      </p>
    </div>
  );
}
