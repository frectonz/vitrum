export function randomNumBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function randomColor() {
  const COLORS = ["#5e6262", "#c9b373", "#853232", "#e29134", "#dee2ec"];
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}
