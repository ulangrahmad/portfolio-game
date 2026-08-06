import { useEffect, useRef } from "react";

export default function PixelMonster({ size = 48, variant = "ghost" }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    canvas.width = size;
    canvas.height = size;
    ctx.clearRect(0, 0, size, size);

    const px = (x, y, c) => {
      ctx.fillStyle = c;
      ctx.fillRect(x, y, 1, 1);
    };

    const s = size / 16;
    ctx.scale(s, s);

    if (variant === "ghost") {
      // Body
      for (let x = 5; x <= 10; x++) {
        for (let y = 3; y <= 11; y++) {
          if (y === 11 && (x === 5 || x === 7 || x === 9)) continue;
          px(x, y, "#ff5277");
        }
      }
      // Eyes
      px(6, 5, "#fff");
      px(8, 5, "#fff");
      px(6, 6, "#000");
      px(8, 6, "#000");
    } else if (variant === "monster") {
      // Body
      for (let x = 4; x <= 11; x++) {
        for (let y = 4; y <= 12; y++) px(x, y, "#38b000");
      }
      // Spikes
      px(5, 3, "#38b000");
      px(7, 3, "#38b000");
      px(9, 3, "#38b000");
      // Eyes
      px(6, 6, "#fff");
      px(9, 6, "#fff");
      px(6, 7, "#000");
      px(9, 7, "#000");
      // Fangs
      px(7, 9, "#fff");
      px(8, 9, "#fff");
    } else if (variant === "coin") {
      // Outer
      for (let y = 4; y <= 11; y++) {
        px(5, y, "#ffd000");
        px(10, y, "#ffd000");
      }
      for (let x = 6; x <= 9; x++) {
        px(x, 3, "#ffd000");
        px(x, 12, "#ffd000");
      }
      // Inner
      for (let x = 6; x <= 9; x++) {
        for (let y = 4; y <= 11; y++) px(x, y, "#fff000");
      }
      // Dollar sign
      px(7, 5, "#000");
      px(8, 5, "#000");
      px(7, 7, "#000");
      px(8, 7, "#000");
      px(7, 9, "#000");
      px(8, 9, "#000");
      px(7, 10, "#000");
      px(8, 10, "#000");
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }, [size, variant]);

  return <canvas ref={ref} style={{ imageRendering: "pixelated", display: "block" }} />;
}