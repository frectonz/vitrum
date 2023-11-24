import './style.css'
import { randomColor } from './utils';
import { Particle } from './particle';


class Canvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private p: Particle;

  constructor(private screenWidth: number, private screenHeight: number) {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d")!;

    document.body.append(this.canvas);

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx.fillStyle = randomColor();

    this.p = new Particle(100, 100);

    requestAnimationFrame(() => this.update());
  }

  update() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.p.update();
    this.p.handleEdges(this.screenWidth, this.screenHeight);

    this.ctx.beginPath();
    this.ctx.arc(
      this.p.pos.x,
      this.p.pos.y,
      this.p.radius,
      0,
      2 * Math.PI,
    );
    this.ctx.fill();
    this.ctx.closePath()

    requestAnimationFrame(() => this.update());
  }
}

// @ts-ignore
const screen = await window.getScreenDetails();
new Canvas(screen.currentScreen.width, screen.currentScreen.width);
