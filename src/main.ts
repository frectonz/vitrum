import "./style.css";
import { Particle } from "./particle";

class Canvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private particles: Particle[];

  private isFirst: boolean;

  constructor() {
    this.isFirst = window.location.hash === "#main";

    this.canvas = document.createElement("canvas");

    this.canvas.width = window.outerWidth;
    this.canvas.height = window.innerHeight;

    this.ctx = this.canvas.getContext("2d")!;
    this.ctx.fillStyle = "#000";

    document.body.append(this.canvas);

    this.particles = new Array(30)
      .fill(null)
      .map((_, i) => new Particle(i, this.isFirst));

    window.addEventListener("resize", () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    });

    const blur = document.querySelector("#blur")!;

    blur.addEventListener("click", () => {
      this.canvas.classList.toggle("blur");
    });

    requestAnimationFrame(() => this.update());
  }

  update() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.isFirst) {
      this.particles.forEach((current, i) => {
        const rest = this.particles.slice(i + 1);
        rest.forEach((particle) => {
          particle.checkCollision(current);
        });
      });
    }

    for (const p of this.particles) {
      if (this.isFirst) {
        p.update();
        p.draw(this.ctx);
      } else {
        p.draw(this.ctx);
      }
    }

    requestAnimationFrame(() => this.update());
  }
}

new Canvas();
