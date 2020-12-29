import {Polygon} from "./user_polygon.js";


class App{
    constructor(){
        this.canvas = document.querySelector(".canvas");
        this.ctx= this.canvas.getContext("2d");
        const crew_code = document.querySelector(".crew_code").innerText;
        const crew_name = document.querySelector(".crew_name").innerText;
        this.user_id = document.querySelector(".user_id").innerText;
        console.log(crew_name);
        this.code = this.getCrew(crew_code);
        this.name = this.getCrew(crew_name);        
        console.log(this.code,this.name);
        this.pixelRatio = window.devicePixelRatio > 1 ? 2:1 ;
        

        window.addEventListener("resize",this.resize.bind(this),false);
        this.resize()

        this.isDown = false;
        this.moveX=0;
        this.offsetX =0;
        
        document.addEventListener('pointerdown',this.onDown.bind(this),false);
        document.addEventListener("pointermove",this.onMove.bind(this),false);
        document.addEventListener("pointerup",this.onUp.bind(this),false);
        this.canvas.addEventListener("click",this.onClick.bind(this),false);


        window.requestAnimationFrame(this.animate.bind(this));
    }

    getCrew(crew){
        let temp = crew.replace("<","");
        temp = temp.replace(">","");
        return temp.split(",");
    }

    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;
 
        this.canvas.width= this.stageWidth*this.pixelRatio;
        this.canvas.height= this.stageHeight*this.pixelRatio;
        this.ctx.scale(this.pixelRatio,this.pixelRatio);

        this.polygon = new Polygon(
            this.stageWidth /2,
            // this.stageHeight/2,   // 폴리곤 중간배치
            this.stageHeight+(this.stageHeight/4),   //폴리곤 하단배치
            // this.stageHeight/4,   // 폴리곤 중간배치
            this.stageHeight/1.5,  //폴리곤 하단배치
            8
        )
    }

    animate(){
        window.requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight);

        this.moveX *= 0.92;

        this.polygon.animate(this.ctx,this.moveX,this.name);
    }

    onDown(e){
        this.isDown = true;
        this.moveX=0;
        this.offsetX = e.clientX;
    }

    onMove(e){
        if(this.isDown){
            this.moveX = e.clientX - this.offsetX
            this.offsetX = e.clientX;
        }
    }

    onUp(e){
        this.isDown = false;
    }

    onClick(e){        
        const x = e.offsetX;
        const y = e.offsetY;
        const color = this.ctx.getImageData(x,y,1,1).data;
        const r=color[0] , g =color[1], b= color[2],a=color[3];
        
        if(!(r==0 && g ==0 && b==0)){
            this.polygon.clickPolygon(r.toString(16),g.toString(16),b.toString(16),this.code,this.user_id);
         //   console.log(color);
        }  
    }

}

window.onload = () =>{
    new App();
}