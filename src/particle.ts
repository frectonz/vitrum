import { randomColor, randomNumBetween } from "./utils";
import { Vector } from "./vector";

const BALL_X = (i: number) => `BALL-X-${i}`;
const BALL_Y = (i: number) => `BALL-Y-${i}`;

export class Particle {
  public pos: Vector;
  private vel: Vector;
  private acc: Vector;
  private radius: number;
  private color: string;
  private index: number;

  constructor(index: number) {
    this.index = index;

    this.pos = new Vector(
      randomNumBetween(10, window.screen.width),
      randomNumBetween(10, window.screen.height),
    );
    this.vel = new Vector(randomNumBetween(-5, 5), randomNumBetween(-5, 5));
    this.acc = new Vector(0, 0);
    this.radius = randomNumBetween(10, 100);

    this.color = randomColor();
  }

  update() {
    this.handleEdges(window.screen.width, window.screen.height);

    this.pos = Vector.add(this.pos, this.vel);
    this.vel = Vector.add(this.vel, this.acc);
    this.acc = Vector.mult(this.acc, 0);

    localStorage.setItem(BALL_X(this.index), this.pos.x.toString());
    localStorage.setItem(BALL_Y(this.index), this.pos.y.toString());
  }

  private handleEdges(width: number, height: number) {
    if (this.pos.x - this.radius <= 0 || this.pos.x + this.radius >= width) {
      this.vel.x *= -1;
    }
    if (this.pos.y - this.radius <= 0 || this.pos.y + this.radius >= height) {
      this.vel.y *= -1;
    }
  }

  checkCollision(particle: Particle) {
    const v = Vector.sub(this.pos, particle.pos);
    const d = v.mag();

    if (d <= this.radius + particle.radius) {
      const unitNormal = Vector.div(v, d);
      const unitTangent = unitNormal.getTangent();

      const correction = Vector.mult(unitNormal, this.radius + particle.radius);
      this.pos = Vector.add(particle.pos, correction);

      const a = this.vel;
      const b = particle.vel;

      const a_n = a.dot(unitNormal);
      const b_n = b.dot(unitNormal);
      const a_t = a.dot(unitTangent);
      const b_t = b.dot(unitTangent);

      const a_n_final =
        (a_n * (this.radius - particle.radius) + 2 * particle.radius * b_n) /
        (this.radius + particle.radius);
      const b_n_final =
        (b_n * (particle.radius - this.radius) + 2 * this.radius * a_n) /
        (this.radius + particle.radius);

      const a_n_after = Vector.mult(unitNormal, a_n_final);
      const b_n_after = Vector.mult(unitNormal, b_n_final);
      const a_t_after = Vector.mult(unitTangent, a_t);
      const b_t_after = Vector.mult(unitTangent, b_t);

      const a_after = Vector.add(a_n_after, a_t_after);
      const b_after = Vector.add(b_n_after, b_t_after);

      this.vel = a_after;
      particle.vel = b_after;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const x = localStorage.getItem(BALL_X(this.index))!;
    const y = localStorage.getItem(BALL_Y(this.index))!;

    this.pos.x = parseInt(x);
    this.pos.y = parseInt(y);

    ctx.beginPath();
    ctx.arc(
      this.pos.x - window.screenX,
      this.pos.y - window.screenY,
      this.radius,
      0,
      2 * Math.PI,
    );
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}
