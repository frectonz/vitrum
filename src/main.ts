import './style.css'
import { Particle } from './particle';


class Canvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private p: Particle;

  private isFirst: boolean;

  constructor() {
    this.isFirst = window.location.hash === "#main";

    this.canvas = document.createElement("canvas");

    this.canvas.width = window.outerWidth;
    this.canvas.height = window.innerHeight;

    this.ctx = this.canvas.getContext("2d")!;
    this.ctx.fillStyle = "#000";

    document.body.append(this.canvas);

    this.p = new Particle(150, 100);

    window.addEventListener("resize", () => {
      this.canvas.width = window.outerWidth;
      this.canvas.height = window.innerHeight;
    });

    requestAnimationFrame(() => this.update());
  }

  update() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.isFirst) {
      this.p.update();
      this.p.draw(this.ctx);
    } else {
      this.p.draw(this.ctx);
    }

    requestAnimationFrame(() => this.update());
  }
}

new Canvas();
