
var bg,bgimage,overimage;
var player,playeri,playerr,playerl,dead,deadsound;
var lb,rb,ub,db;
var coinimage,coin,coingroup;
var enemy,enemyimage,enemygroup;
var count=0;
var coinsound,buttons;
var gameState="serve";


function preload(){
  
   bgimage=loadImage("tower.png");
  playeri=loadImage("11.png");
  playerl=loadImage("11left.png");
  playerr=loadImage("11right.png");
  coinimage=loadImage("Coin.png");
  enemyimage=loadImage("enemyBlack1.png")
  coinsound=loadSound("bonusMeterFull.wav")
  buttons=loadSound("buttonClick.wav")
  dead=loadImage("Dead.png");
  deadsound=loadSound("splat.wav")
  overimage=loadImage("over.jpg")
  
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  bg=createSprite(windowWidth/2,windowHeight/2,2,2);
  bg.addImage(bgimage);
    bg.scale=windowWidth*windowHeight/160000
  player=createSprite(windowWidth/2,windowHeight/2+50);
  
  lb=createSprite(-5,windowHeight/2,5,windowHeight);
  rb=createSprite(windowWidth+5,200,5,windowHeight);
  ub=createSprite(windowWidth/2,-5,windowWidth,5);
  db=createSprite(windowWidth/2,windowHeight+5,windowWidth,5);
 coingroup=new Group();
  enemygroup=new Group();
}

function draw() {
  background("black");
  drawSprites();
   textSize(25)
  fill("red")
  text("coins "+count,10,25)
  if(gameState==="serve"){
    fill("red")
    textSize(17);
    text("press Space/Touch to start",windowWidth/2-100,windowHeight/2);
    player.visible=false;
    bg.velocityY=0; 
    if(touches.length>0||keyDown("space")){
      gameState="play"
      touches=[];
      count=0
    }
  }
  if(gameState==="play"){
    coins();
  enemys();
  if(bg.y>windowHeight-140){
    bg.y=40
  }
  bg.velocityY=2+count/3;
    player.visible=true;
  player.addImage(playeri)
  player.scale=bg.scale/11;
  
  player.bounceOff(lb);
  player.bounceOff(rb);
  player.bounceOff(ub);
  player.bounceOff(db);
  
  player.velocityX=0;
  player.velocityY=0;
  
    player.x=mouseX;
    player.y=mouseY;
    if(player.x<windowWidth/2-40){
      player.addImage(playerl)
    }
    if(player.x>windowWidth/2+40){
      player.addImage(playerr)
    }
    
  if(player.isTouching(coingroup)){
    coingroup.destroyEach();
    count=count+1;
    coinsound.play();
  }
    if(player.isTouching(enemygroup)){
    gameState="end"; 
      deadsound.play();
      over=createSprite(windowWidth/2-10,windowHeight/2)
      over.addImage(overimage)
      over.scale=bg.scale/6;
  }
    
    }
  if(gameState==="end"){  
      reset();
    if(touches.length>0){
      gameState="serve"
      over.lifetime=0;
      touches=[];
    }
  }
  //console.log(bg.scale)
}
function coins(){
  if(frameCount%40===0){
    coin=createSprite(random(50,windowWidth-50),-2,20,20);
    coin.addImage(coinimage);
    coin.scale=bg.scale/69.099;
    coin.velocityY=bg.velocityY;
    coin.lifetime=coin.velocityY/windowHeight
    coingroup.add(coin);
    coin.debug=false;
    coin.setCollider("circle",0,0,500)
    console.log(coin.scale)
  }
}
function enemys(){
    if(frameCount%80===0){
    enemy=createSprite(random(50,windowWidth-50),-2,20,20);
    enemy.addImage(enemyimage);
    enemy.velocityY=bg.velocityY+count/10;
    enemy.lifetime=enemy.velocityY/windowHeight;
      enemygroup.add(enemy);
      enemy.scale=bg.scale/2
  }
  }
function reset(){
  player.addImage(dead)
      bg.velocityY=0;
      player.velocityX=0;
      player.velocityY=0;
      coingroup.destroyEach();
      enemygroup.setVelocityYEach(0);
    enemygroup.destroyEach();
  
}