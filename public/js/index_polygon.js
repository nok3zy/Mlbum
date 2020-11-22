const PI2 = Math.PI * 2;

export class Polygon {
  constructor(x, y, radius, items) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.sides = items.length;
    this.items = items;
    this.rotate = 0;
  }
  
  animate(ctx, moveX) {
    ctx.save();

    const angle = PI2 / this.sides;


    ctx.translate(this.x, this.y);

    this.rotate -= moveX * 0.005;
    ctx.rotate(this.rotate);

    for (let i = 0; i < this.sides; i++) {
      const x = this.radius * Math.cos(angle * i);
      const y = this.radius * Math.sin(angle * i);

      ctx.save();
    
      ctx.translate(x, y);
      ctx.rotate((((360 / this.sides) * i + 45) * Math.PI) / 180);
      this.items[i].animate(ctx);
      
      ctx.fill();
      ctx.closePath();
    

      ctx.restore();
    }

    ctx.restore();
  }
}
