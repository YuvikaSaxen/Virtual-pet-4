var dog, sadDog,happyDog;
var foodS, foodStock,foodObj,addFood,milkBottle2;
var database,readGamestate,gameState;
var fedTime,FeedTime,feed,lastFed;
var currentTime;
var bedroom, garden, washroom,livingroom;
function preload()
{
	sadDog= loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  bedroom= loadImage("virtual pet images/Bed Room.png");
  garden= loadImage("virtual pet images/Garden.png");
  washroom= loadImage("virtual pet images/Wash Room.png");
  livingroom= loadImage("virtual pet images/Living Room.png");
}

function setup() {
  database= firebase.database();
	createCanvas(1000, 400);
  
  foodObj= new Food();
  foodStock= database.ref('Food');
  foodStock.on("value",readStock);
  fedTime=database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed=data.val();
})
  dog= createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  addFood=createButton("Add Food");
  addFood.position(850,95);
  addFood.mousePressed(addFoods);

  feed=createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  readGamestate= database.ref('gameState');
  readGamestate.on("value",function(data){
    gameState=data.val();
});
  }
function draw() {  
  background("yellow");

  foodObj.display();
  writeStock(foodS);

  if(foodS==0){
    dog.addImage(happyDog);
    milkBottle2.visible=false;
  }else{
    dog.addImage(sadDog);
    milkBottle2.visible= true;
  }
  fill(255,255,255);
if(lastFed>=12){
  text("Last Feed: "+ lastFed%12+"PM",350,30);
}else if(lastFed==0){
  text("Last Feed: "+ lastFed+"AM",350,30);
}else{
  text("Last Feed: "+ lastFed+"AM",350,30);
}
currentTime=hour();
  if(currentTime==(lastFed+1)){
    update("Playing");
    foodObj.garden();
  }else if(currentTime==(lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }else if(currentTime>(lastFed+2)&& currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }else{
    update("Hungry")
      foodObj.display();
    } 
    if(gameState!="Hungry"){
      feed.hide();
      addFood.hide();
      dog.remove();
    }else{
      feed.show();
      addFood.show();
      dog.addImage(sadDog);
    }
    if(gameState===1){
      dog.addImage(happyDog);
      dog.scale=0.175;
      dog.y=250;
    }
    if(gameState===2){
      dog.addImage(sadDog);
      dog.scale=0.175;
      milkBottle2.visible=false;
      dog.y=250;
    }
    var Bath= createButton("I Want To Take Bath");
    Bath.position(580,125);
    if(Bath.mousePressed(function(){
      gameState=3;
      database.ref('/').update({'gameState': gameState})
    }));
    if(gameState===3){
      dog.addImage(washroom);
      dog.scale=1;
      milkBottle2.visible=false;
    }
    var Sleep= createButton("I am very Sleepy!");
    Sleep.position(710,125);
    if(Sleep.mousePressed(function(){
      gameState=4;
      database.ref('/').update({'gameState':gameState});
    }));
    if(gameState===4){
      dog.addImage(bedroom);
      dog.scale=1;
      milkBottle2.visible=false;
    }
    var PlayInGarden= createButton("Lets Play in garden!");
    PlayInGarden.position(585,160);
    if(PlayInGarden.mousePressed(function(){
      gameState=6;
      database.ref('/').update({'gameState':gameState});
    }));
    if(gameState===6){
      dog.addImage(garden);
      dog.scale=1;
      milkBottle2.visible=false;
    }
    var Play= createButton("Lets Play!");
    Play.position(500,160);
    if(Play.mousePressed(function(){
      gameState=5;
      database.ref('/').update({'gameState':gameState});
    }));
    if(gameState===5){
      dog.addImage(livingroom);
      dog.scale=1;
      milkBottle2.visible=false;
    }
textSize(25);
drawSprites();
  }
  function readStock(data){
    foodS=data.val();
  }
function feedDog(){
  
    dog.addImage(happyDog);
  
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      Food:foodObj.getFoodStock(),
      FeedTime:hour(),
      gameState:"Hungry"
    })
  }
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}
function update(state){
  database.ref('/').update({
    gameState:state
  });
}
function writeStock(x){
database.ref('/').update({
  food:x
})
}