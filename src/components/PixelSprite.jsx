import { useEffect, useRef } from "react";

// Pixel Sprite drawn via HTML5 Canvas
// No external images needed — renders at runtime

export default function PixelSprite({ size = 64, mood = "idle" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    const s = size;
    canvas.width = s;
    canvas.height = s;

    // Clear
    ctx.clearRect(0, 0, s, s);

    const px = (x, y, color) => {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, 1, 1);
    };

    const scale = s / 16; // 16x16 grid
    ctx.scale(scale, scale);

    // === BODY (simple character) ===
    // Hat
    px(5, 2, "#ff5277");
    px(6, 2, "#ff5277");
    px(7, 2, "#ff5277");
    px(8, 2, "#ff5277");
    px(9, 2, "#ff5277");
    px(10, 2, "#ff5277");

    // Face
    px(6, 3, "#ffd0a0");
    px(7, 3, "#ffd0a0");
    px(8, 3, "#ffd0a0");
    px(9, 3, "#ffd0a0");

    // Eyes
    px(7, 4, "#000");
    px(9, 4, "#000");

    // Mouth
    if (mood === "happy") {
      px(7, 5, "#000");
      px(8, 5, "#000");
      px(9, 5, "#000");
    } else {
      px(8, 5, "#000");
    }

    // Neck
    px(7, 6, "#ffd0a0");
    px(8, 6, "#ffd0a0");

    // Shirt body
    for (let x = 5; x <= 10; x++) px(x, 7, "#00f0ff");
    for (let x = 5; x <= 10; x++) px(x, 8, "#00f0ff");
    for (let x = 5; x <= 10; x++) px(x, 9, "#00f0ff");

    // Arms
    px(4, 8, "#ffd0a0");
    px(11, 8, "#ffd0a0");

    // Pants
    for (let x = 5; x <= 10; x++) px(x, 10, "#171717");
    for (let x = 5; x <= 7; x++) px(x, 11, "#171717");
    for (let x = 8; x <= 10; x++) px(x, 11, "#171717");

    // Shoes
    px(5, 12, "#ff5277");
    px(6, 12, "#ff5277");
    px(9, 12, "#ff5277");
    px(10, 12, "#ff5277");

    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }, [size, mood]);

  return <canvas ref={canvasRef} style={{ imageRendering: "pixelated", display: "block" }} />;
}