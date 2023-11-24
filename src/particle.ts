import { Vector } from "./vector";
import { randomNumBetween } from "./utils";

export class Particle {
  public pos: Vector;
  private vel: Vector;
  private acc: Vector;
  public radius: number;

  constructor(x: number, y: number) {
    this.pos = new Vector(x, y);
    this.vel = Vector.random(-1, 1, -1, 1);
    this.acc = new Vector(0, 0);
    this.radius = randomNumBetween(5, 50);
  }

  update() {
    this.pos = Vector.add(this.pos, this.vel);
    this.vel = Vector.add(this.vel, this.acc);
    this.acc = Vector.mult(this.acc, 0);
  }

  handleEdges(width: number, height: number) {
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
}
