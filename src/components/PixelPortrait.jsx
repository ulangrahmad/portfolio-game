// Natural photo renderer. No canvas downscaling, pixelation, or forced square crop.
export default function PixelPortrait({ src, size = 128, portrait = false }) {
  return (
    <img
      src={src}
      alt="Ulang Rahmad Choliq"
      width={size}
      className={portrait ? "h-auto max-w-full object-contain" : "h-full object-cover"}
      style={{
        width: `${size}px`,
        display: "block",
        maxHeight: portrait ? "none" : `${size}px`,
      }}
    />
  );
}
