import { randomNumBetween } from "./utils";

export class Vector {
  constructor(
    public x: number,
    public y: number,
  ) {
    this.x = x;
    this.y = y;
  }

  static add(vector1: Vector, vector2: Vector) {
    return new Vector(vector1.x + vector2.x, vector1.y + vector2.y);
  }

  static sub(vector1: Vector, vector2: Vector) {
    return new Vector(vector1.x - vector2.x, vector1.y - vector2.y);
  }

  static mult(vector: Vector, scalar: number) {
    return new Vector(vector.x * scalar, vector.y * scalar);
  }

  static div(vector: Vector, scalar: number) {
    return new Vector(vector.x / scalar, vector.y / scalar);
  }

  copy() {
    return new Vector(this.x, this.y);
  }

  dot(vector: Vector) {
    return this.x * vector.x + this.y * vector.y;
  }

  mag() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  getTangent() {
    return new Vector(-this.y, this.x);
  }

  static random(minX: number, maxX: number, minY: number, maxY: number) {
    return new Vector(
      randomNumBetween(minX, maxX),
      randomNumBetween(minY, maxY),
    );
  }
}
