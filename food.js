class Food{
constructor(){
}
display(){
   var addFood= createButton("Add Food");
addFood.position(500,125);
if(addFood.mousePressed(function(){
foodS=foodS+1;
gameState=2;
database.ref('/').update({'gameState':gameState})
}));
}

}
