//for clouds and clouds iamge
var clouds,cloudsImage;
//for character and character image
var character,characterImage;
//for dinasaur and dinsaur image
var dinasaur,dinasaurImage;
//for invisble and visible ground
var ground,invisibleGround;
//for animals image and animals group
var elephantImg,snakeImg,lionImg,animalGroup;
//for survival time
var survivalTime;
//for gameStates
var PLAY = 2;
var END = 0;
var gameState = PLAY;
//for cloudsGroup
var cloudsGroup;
//for gameover sound
var gameOvermp3;
function preload() {
//for loading clouds image
cloudsImage = loadImage("cloud.png");
//for loading character image
characterImage = loadImage("Character.png");
//for loading dinasaur animation
dinasaurImage = loadAnimation("trex1.png","trex3.png","trex4.png");
//for loading animals image
lionImg = loadImage("lion image.jpg");
elephantImg = loadImage("elephant.png");
snakeImg = loadImage("snake.jpg");
//for loading gameover sound
gameOvermp3 = loadSound("gameover.mp3");
}

function setup() {
//for creating canvas
createCanvas(400,400);
//for creating character and adding image,velocity to it
character = createSprite(150,340,10,10);
character.addImage(characterImage);
character.scale = 0.2;
//character.debug = true
//for creating dinasaur and adding velocity,animation&changing it's collidng range
dinasaur = createSprite(50,330,10,10);
dinasaur.addAnimation("running",dinasaurImage);
dinasaur.scale = 0.9;
//dinasaur.debug = true
dinasaur.setCollider("circle",0,0);
//for creating ground  and adding velocity to it
ground = createSprite(50,370,1000,10);
ground.velocityX = -8;
//for creating invisible ground and making it invsible and adding velocity to it
invisibleGround = createSprite(50,380,1000,10);
invisibleGround.velocityX = -8;
invisibleGround.visible = false;
//for creating animal group
animalGroup = createGroup();
//for setting survival time initial value 0
survivalTime = 0;
//for creating clouds group
cloudsGroup = createGroup();
}
function draw() {
//for setting background white
background("white");
//for gamestate play
if(gameState === PLAY) {
if(ground.x>0) {
  ground.x=ground.width/2;
}
if(invisibleGround.x>0) {
  invisibleGround.x=invisibleGround.width/2;
}
if(keyDown("W")&&character.y>=339.5) {
  character.velocityY = -9;
}
character.velocityY = character.velocityY+0.3;
survivalTime = Math.round(frameCount/10);
spawnAnimal();
spawnText();
if(animalGroup.isTouching(dinasaur)) {
  animalGroup.destroyEach();
}
if(character.isTouching(animalGroup)) {
  gameState = END;
  gameOvermp3.play();
}
}
//for end gamestate
if(gameState===END) {
  ground.velocityX = 0;
  animalGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0);
  cloudsGroup.destroyEach();
  dinasaur.visible = false;
  animalGroup.destroyEach();
  character.visible = false;
  spawnText2();
  if(keyDown("R")) {
    restart();
  }
}
//for displaying clouds
spawnClouds();
//for clliding character and dinasaur with invisible and visible ground
character.collide(ground);
dinasaur.collide(invisibleGround);
//for displaying sprites
drawSprites();
//for displaying survival time
stroke("black");
textSize(13);
fill("black");
text("Suvival time:"+survivalTime,290,20);
}
//for cloud function
function spawnClouds() {
if(frameCount%50===0) {
clouds = createSprite(390,100,10,10);
clouds.addImage(cloudsImage); 
clouds.velocityX = -2;
clouds.y=Math.round(random(10,200));
clouds.lifetime = 200;
clouds.depth = character.depth;
character.depth = character.depth+1;
cloudsGroup.add(clouds);
}
}
//for giving game instruction
function spawnText() {
stroke("black");
textSize(15);
fill("black");
text("Help Mayank to escape from dinasaur.",20,20);
text("Press W for jumping",50,50);
}
//for creating animals
function spawnAnimal() {
if(frameCount%250===0) {
  animal = createSprite(380,340,10,10);
  img=Math.round(random(1,3));
  switch(img) {
    case 1:animal.addImage(elephantImg);
    break;
    case 2:animal.addImage(lionImg);
    break;
    case 3:animal.addImage(snakeImg);
    break;
  }
  animal.scale = 0.2;
  animal.velocityX = -4;
  animalGroup.add(animal);
}
}
//for displaying text of reseting game
function spawnText2() {
stroke("black");
textSize(15);
fill("black");
text("PRESS R TO RESTART",100,250);
text("GAME OVER😟😟😟",100,200);
text("YOU LOSE",150,150);
}
//for reseting game
function restart() {
  gameState = PLAY;
  dinasaur.visible = true;
  character.visible = true;
}