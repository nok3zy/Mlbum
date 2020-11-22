const PI2 = Math.PI * 2;

const COLORS = [
    "#F23869",
    "#BF3056",
    "#8C233F",
    "#40101D",
    "#590902",

    "#D9B504",
    "#F29F05",
    "#D97904",
    "#BF0404",
    "#730202",

    "#898b8a",
    "#fae0df",
    "#f6f5f1"
];

export class Polygon {
  constructor(x, y, radius, sides) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.sides = sides;
    this.rotate = 0;
  }

  clickPolygon(r,g,b){
      let clickvalue = '#';
      
      if(r.length == 1 ) r = '0'+r;
      if(g.length == 1 ) g = '0'+g;
      if(b.length == 1 ) b = '0'+b;

      clickvalue += (r.toUpperCase()+g.toUpperCase()+b.toUpperCase());
      
      for(let i =0; i <this.sides;i++){
        if(COLORS[i]==clickvalue){
            console.log(`${i}번째 그룹`);
        }
      }
      
  }

  animate(ctx,moveX) {
    ctx.save();
  
    const angle = PI2 / this.sides;
    const angle2 = PI2 /4;
    
    ctx.translate(this.x, this.y);

    this.rotate -= moveX * 0.008;
    ctx.rotate(this.rotate);

    for (let i = 0; i < this.sides; i++) {
      const x = this.radius * Math.cos(angle * i);
      const y = this.radius * Math.sin(angle * i);
      
      ctx.save();
      
      ctx.fillStyle =COLORS[i];
      ctx.translate(x,y);
            
      ctx.rotate(((360/this.sides)*i +45)* Math.PI / 180 );
      ctx.beginPath();
      for (let j = 0 ; j<4;j++){
        const x2 = 250 * Math.cos(angle2*j);
        const y2 = 250 * Math.sin(angle2*j);
        
        
        (j==0)? ctx.moveTo(x2,y2) : ctx.lineTo(x2,y2);
        
      }
      
      ctx.fill();
    
       
      //text position
      ctx.rotate(((360/this.sides))* Math.PI / 180 );
      ctx.textAlign="center";
      //text content
      ctx.font='48px malgun gothic';
      ctx.fillStyle="white";
      ctx.textBaseline="middle";
      ctx.fillText(`${i}`,0,0);

      ctx.restore();
    }
    ctx.restore();
  }
}
