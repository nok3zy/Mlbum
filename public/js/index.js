import {Polygon} from "./index_polygon.js";
import {IMAGE} from "./index_image.js";
class App{
    constructor(){
        this.canvas = document.querySelector(".pic_canvas")
        this.ctx= this.canvas.getContext("2d");
        this.items=[];
        
        
        this.pixelRatio = window.devicePixelRatio > 1 ? 2:1 ;
        
        window.addEventListener("resize",this.resize.bind(this),false);
        this.resize()
        
        
        for(let i =1; i<15;i++){
          const img=new Image();
          img.onload=()=>{
            this.loaded(img);
            this.resize();
          };
          // img.src=`./image/${i}.jpg`; //html상에서의.
          img.src=`/public/image/${i}.jpg`;
          
        }
        
        window.requestAnimationFrame(this.animate.bind(this));
      }
      
      loaded(img){
        this.items.push(new IMAGE(img));
    }

    resize(){
        console.log(this.items);
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;
 
        this.canvas.width= this.stageWidth*this.pixelRatio;
        this.canvas.height= this.stageHeight*this.pixelRatio;
        this.ctx.scale(this.pixelRatio,this.pixelRatio);

        this.polygon = new Polygon(
            this.stageWidth /2,
            this.stageHeight/2, 
            this.stageHeight/3.5, 
            this.items
        )
    }
    
    animate(){
        window.requestAnimationFrame(this.animate.bind(this));
        
        this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight);
        
        this.polygon.animate(this.ctx,0.88);
    }

}

window.onload = () =>{
    new App();
}