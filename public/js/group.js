class App{
    constructor(){
        this.addBtn = document.querySelector("#addBtn");
        this.modal = document.querySelector(".modal");
        this.imgs = document.getElementsByTagName("img");

        this.addBtn.addEventListener("click",this.clickBtn.bind(this),false);
        window.addEventListener("click",this.clickWindow.bind(this),false);
        
        for(let i =0;i<this.imgs.length;i++){
            this.imgs[i].addEventListener("click",function(){
            console.log(`img${i} click`);
            });
        }
    }
    
    clickBtn(){
        console.log("btn click");
        this.modal.style.display="block";
    }

    clickWindow(event){
        if (event.target == this.modal){
            console.log("window click");
            this.modal.style.display="none";
        }
    }
}
    

window.onload=()=>{
 new App();   
}