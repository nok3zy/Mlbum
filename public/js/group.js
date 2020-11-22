class App{
    constructor(){
        this.addBtn = document.querySelector("#addBtn");
        this.addModal = document.querySelector(".addBtn_modal");
        this.picModal = document.querySelector(".pic_modal");
        this.imgs = document.getElementsByTagName("img");

        this.addBtn.addEventListener("click",this.clickBtn.bind(this),false);
        window.addEventListener("click",this.clickWindow.bind(this),false);
        
        for(let i =0;i<this.imgs.length;i++){
            this.imgs[i].addEventListener("click",this.clickImg.bind(this),false);
        }
    }
    
    clickImg(i){
        console.log(`img${i} click`);
        this.picModal.style.display="block";
    }

    clickBtn(){
        console.log("btn click");
        this.addModal.style.display="block";
    }

    clickWindow(event){
        if (event.target == this.addModal){
            console.log("window click");
            this.addModal.style.display="none";
        }else if(event.target == this.picModal){
            this.picModal.style.display="none";
        }
    }
}
    

window.onload=()=>{
 new App();   
}