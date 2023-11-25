export function randomNumBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function randomColor() {
  const COLORS = ["#050305", "#120a3d", "#412854", "#4cc35b", "#68da23"];
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

export function isCircleOriginContained(
  { x: circleX, y: circleY }: { x: number; y: number },
  {
    x: rectX,
    y: rectY,
    width: rectWidth,
    height: rectHeight,
  }: { x: number; y: number; width: number; height: number },
): boolean {
  // Calculate the distance between the circle's origin and the rectangle's center
  const distanceX = Math.abs(circleX - (rectX + rectWidth / 2));
  const distanceY = Math.abs(circleY - (rectY + rectHeight / 2));

  // Check if the distance is within the rectangle's bounds
  return distanceX <= rectWidth / 2 && distanceY <= rectHeight / 2;
}

export function doesCircleOverlapRectangle(
  {
    x: circleX,
    y: circleY,
    radius: circleRadius,
  }: { x: number; y: number; radius: number },
  {
    x: rectX,
    y: rectY,
    width: rectWidth,
    height: rectHeight,
  }: { x: number; y: number; width: number; height: number },
): boolean {
  // Find the closest point in the rectangle to the circle
  const closestX = Math.max(rectX, Math.min(circleX, rectX + rectWidth));
  const closestY = Math.max(rectY, Math.min(circleY, rectY + rectHeight));

  // Calculate the distance between the circle's origin and the closest point in the rectangle
  const distanceX = circleX - closestX;
  const distanceY = circleY - closestY;

  // Check if the distance is within the circle's radius
  return distanceX ** 2 + distanceY ** 2 <= circleRadius ** 2;
}
