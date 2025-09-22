export type ArrowKey = "ArrowRight" | "ArrowLeft" | "ArrowDown" | "ArrowUp";


export function getCandidateIndex(key: ArrowKey, index: number, rows: number, cols: number): number {
  const total = rows * cols;
  switch (key) {
    case "ArrowRight":
      return (index + 1) % total;
    case "ArrowLeft":
      return (index - 1 + total) % total;
    case "ArrowDown":
      // move one row down (clamp to last index)
      return Math.min(index + cols, total - 1);
    case "ArrowUp":
      // move one row up (clamp to 0)
      return Math.max(index - cols, 0);
    default:
      return index;
  }
}
