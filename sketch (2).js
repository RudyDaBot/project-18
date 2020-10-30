var bananaGroup, obstaclesGroup, monkeyImage;

var bananaImage, obstacleImage;

var bg, backgroundImage;

var PLAY, END, gameState;

 var invisibleGround, count;

var monkey;

function preload() {
  
  backgroundImage=loadImage("jungle.jpg");
  
  bananaImage=loadImage("banana.png");
  obstacleImage=loadImage("stone.png");
  
  
  monkeyImage=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png"); 

}

function setup() {
  createCanvas(400, 400);
 bg=createSprite(200,200,10,10);
  bg.addImage("bg",backgroundImage)
  
 
  
  monkey = createSprite(200,320,20,50);
monkey.addAnimation("monkey", monkeyImage);

monkey.setCollider("circle",0,0,30);
  
  PLAY = 1;
  
  END = 0;

  count=0;
  
  gameState = PLAY;
  
  bg.x = bg.width /2;
  bg.velocityX=-1;
  

 invisibleGround=createSprite(200,360,420,20);
invisibleGround.visible=false;
  
  textSize(18);
textFont("Georgia");
textStyle(BOLD);

//scale and position the monkey
monkey.scale = 0.1;
monkey.x = 50;
  
   bananaGroup=new Group();
  obstaclesGroup=new Group();
}

function draw() {
  background("white");
  if(gameState === PLAY){
    //move the ground
//coudnt get the score on the screen so made it into console
    //scoring

     monkey.collide(invisibleGround);
    
     //jump when the space key is pressed
   if(keyDown("space") && monkey.y >= 300){
      monkey.velocityY=-12;
     
    }
  if (bg.x < 0){
      bg.x = bg.width/2;
    }
    //add gravity
   monkey.velocityY = monkey.velocityY + 0.8;
    
    
    
    
    
    
    //spawn the clouds
    spawnBananas();
  
    //spawn obstacles
    spawnObstacles();
    
    //End the game when trex is touching the obstacle
    if(obstaclesGroup.isTouching(monkey)){
   
     monkey.scale=0.1;
    count=0;
     
    }
  }
  
 
  if(keyDown("r")) {
    reset();
  }
  
  //console.log(trex.y);
  
  if (monkey.isTouching(bananaGroup)) {
    
    bananaGroup.destroyEach();
   count=count+2;
  } 
  
  switch(count) {
      case 10: monkey.scale = 0.12;
           break;
      case 20: monkey.scale = 0.14;
           break;
      case 30: monkey.scale = 0.16;
           break;
      case 40: monkey.scale = 0.18;
        
        
    }
   
    drawSprites();
  
  stroke("white");
  textSize=20;
  fill("white");
  text("score: " + count, 30,30);
   
}
  
  
 
 

function spawnObstacles() {
  if(frameCount % 130 === 0) {
    var obstacle = createSprite(400,365,10,40);
    obstacle.velocityX = - (6 + 3);
    if(obstacle.isTouching(monkey)){
   
      gameState = END;

     
    }
    //generate random obstacles
   
    obstacle.addAnimation("Stone", obstacleImage);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.15;
    obstacle.lifetime = 70;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnBananas() {
  //write code here to spawn the clouds
  if (frameCount % 40 === 0) {
    var banana = createSprite(400,320,40,10);
    banana.y = random(250,350);
    banana.addAnimation("Banana", bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 134;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    bananaGroup.add(banana);
  }
  
}