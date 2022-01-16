class Food{
    constructor(x,y){
        this.image = loadImage("img/Milk.png");
        var foodstock,lastfed;
        
    }
    display(){
        imageMode(CENTER);
        image(this.image,720,720,70,70); 
        if(foodstock!=0){
            for(var i=0;i<foodstock;i++){
                if(i%10==0){
                    this.x=80;
                    this.y=this.y+50;
                }
                image(this.image,this.x,this.y,50,50)
                this.x = this.x + 30
            }
        }
    }
    bedroom(){
        background(bed);
    }
    washroom(){
        background(wash);
    }
    garden(){
        background(garden);
    }
}