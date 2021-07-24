var dog, sadDog,happyDog;
var foodS, foodStock,foodObj,addFood,milkBottle2,milkBottle1,milkBottle;
var database,readGamestate,gameState;
var fedTime,feed,lastFed;
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
	milkBottle= loadImage("Milk.png");
}

function setup() {
  database= firebase.database();
	createCanvas(1000, 800);
  
  foodObj= new Food();
  foodStock= database.ref('Food');
  foodStock.on("value",readStock);
foodStock.set(20);

 milkBottle2= createSprite(600,300,150,150);
  milkBottle2.addImage(milkBottle);
  milkBottle2.scale=0.15;
	
	milkBottle1= createSprite(600,300,150,150);
  milkBottle1.addImage(milkBottle);
  milkBottle1.scale=0.15;
	
  dog= createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
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
      dog.y= 175;
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
	var gameStateRef=database.ref('gameState');
  gameStateRef.on('value',function(data){
    gameState = data.val();
  });
drawSprites();
textSize(25);
	fill("black");
  text("Milk Bottles Remaining  "+foodS,170,440);

  }
  function readStock(data){
    foodS=data.val();
  }
function writeStock(x){
database.ref('/').update({
  food:x
})
}
