export class IMAGE{
    constructor(img){
        this.img =img;
        
        this.imgwidth = 800;
        this.imgHeight = 530;

        this.viewWidth = 200;
        this.viewHeight = 132;

        this.viewWidthHalf = this.viewWidth /2;
    }

    draw(ctx){
        this.animate(ctx);
    }

    animate(ctx){
        ctx.save();
        ctx.drawImage(
            this.img,
            0, // 원본 사진 시작점 x
            0, // 원본 사진 시작점  y
            this.imgwidth, // 끝점 x
            this.imgHeight, // 끝점 y

            this.viewWidthHalf, //draw 시작위치 x
            this.viewHeight, // draw 시작위치 y
            
            this.viewWidth, // draw 이미지 크기
            this.viewHeight // draw 이미지 크기
        );
        ctx.restore();
    }
}
    