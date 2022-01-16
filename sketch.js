var database;
var dog,happydog;
var foods,foodstock;
var dog1;
var feed,add;
var fedTime,lastFed,lastFed1;
var foodObj;
var gameState;
var bed,garden,washroom;
var currenttime=0;
function preload(){
    dog = loadImage("img/Dog.png");
    happydog = loadImage("img/happydog.png");
    bed = loadImage("img/Bed Room.png");
    garden = loadImage("img/Garden.png");
    washroom = loadImage("img/Wash Room.png");
}
function setup(){
    createCanvas(500,500);
    database = firebase.database();
    dog1 = createSprite(250,250);
    dog1.addImage("hi",dog);
    dog1.scale = 0.4;
    var f = database.ref('food')
    var gameStateRef  = database.ref('food');
        gameStateRef.on("value",function(data){
        foodstock = data.val();
    });
    feed = createButton('FEED');
    add = createButton('ADD');
    feed.size(70,40);
    add.size(70,40);
    feed.position(300,450);
    add.position(400,450);
    foodObj = new Food(50,200);
    var gameStateRef1  = database.ref('gameState');
    gameStateRef1.on("value",function(data){
    gameState = data.val();
    });
}
function draw(){
    background((46, 139, 87));
    var gameStateRef  = database.ref('lastfood');
    gameStateRef.on("value",function(data){
    lastFed = data.val();
    });
    var gameStateRef  = database.ref('lastfood1');
    gameStateRef.on("value",function(data){
    lastFed1 = data.val();
    });
    if(lastFed!==undefined){
        textSize(30);
        fill("blue");
        if(lastFed>12){
            lastFed = lastFed - 12
            text("LastFed : "+lastFed+":"+lastFed1,50,100);
        }
        else{
            text("LastFed : "+lastFed+":"+lastFed1,50,100);
        }
        
        
    }
    foodObj.display();
    addfood();
    feed1();
    if(gameState!==1){
        // 1 means hungry
        feed.hide();
        dog1.visible = false;
    }
    else{
        dog1.visible = true;
        feed.show();
    }
    currenttime = hour();
    if(lastFed+1===currenttime){
        foodObj.garden();
        //2 means playing
        gameState = 2
        database.ref('/').update({
            gameState : gameState
        });
    }
    if(lastFed+2===currenttime){
        foodObj.bedroom();
        //3 means sleeping
        gameState = 3
        database.ref('/').update({
            gameState : gameState
        });
    }
    if(lastFed+3===currenttime||lastFed+4===currenttime){
        foodObj.washroom();
        //4 means bathing
        gameState = 4
        database.ref('/').update({
            gameState : gameState
        });
    }
    else{
         //1 means hungry
         gameState = 1
         database.ref('/').update({
             gameState : gameState
         });
         foodObj.display();
    }
    drawSprites();
    textSize(35);
    stroke("red");
    strokeWeight(10);
    fill("green");
    text("Use Up arrow to feed the dog",5,30);
}
function addfood(){
    if(foodstock!==undefined){
    add.mousePressed(()=>{
        foodstock = foodstock + 1
    });
    database.ref('/').update({
        food : foodstock
    });
    }
}
function feed1(){
    dog1.addImage("hio",happydog)
    if(foodstock!==undefined){
    feed.mousePressed(()=>{
        foodstock = foodstock - 1
        database.ref('/').update({
            food : foodstock,
            lastfood : hour(),
            lastfood1 : minute()
        });
    });
    
    }
}