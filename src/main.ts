import "./style.css";
import { Particle } from "./particle";
import { elector } from "leader-tab";

class Canvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private particles: Particle[];
  private isFirst: boolean;
  private running: boolean;

  constructor() {
    this.isFirst = false;

    const isLeader = document.querySelector<HTMLParagraphElement>("#isLeader")!;

    elector({
      onLeaderElected: () => {
        console.log("I am the leader");
        this.isFirst = true;
        isLeader.style.display = "block";
      },
      onLeaderDemoted: () => {
        console.log("I got demoted");
        this.isFirst = false;
        isLeader.style.display = "none";
      },
    });

    this.canvas = document.createElement("canvas");

    this.canvas.width = window.outerWidth;
    this.canvas.height = window.innerHeight;

    this.ctx = this.canvas.getContext("2d")!;
    this.ctx.fillStyle = "#000";

    document.body.append(this.canvas);

    this.particles = new Array(10).fill(null).map((_, i) => new Particle(i));

    window.addEventListener("resize", () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    });

    const blur = document.querySelector("#blur")!;
    const stop = document.querySelector("#stop")!;

    blur.addEventListener("click", () => {
      this.canvas.classList.toggle("blur");
    });

    this.running = true;
    stop.addEventListener("click", () => {
      this.running = !this.running;

      if (this.running) {
        requestAnimationFrame(() => this.update());
      }
    });

    requestAnimationFrame(() => this.update());
  }

  update() {
    if (!this.running) return;

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
        p.draw(this.ctx, this.isFirst);
      } else {
        p.draw(this.ctx, this.isFirst);
      }
    }

    requestAnimationFrame(() => this.update());
  }
}

new Canvas();
