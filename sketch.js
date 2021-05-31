var sky, sky_Pic;
var star, star_Pic;
var rocket_Img, rocket_Pic;
var meteorite, meteorite_Pic;
var gameOver, gameOver_Pic;
var restart, restart_Pic;
var SilverStar,SilverStar_Pic;
var gameSound;
var explosionSound;
var pointSound;
var comet, comet_Pic;
var gameState = "Play";
var score = 0;
var count = 1;

function preload() {
  star_Pic = loadImage("Star.png");
  rocket_Pic = loadImage("Rocket.jpg");
  sky_Pic = loadImage("Night Sky.jpg");
  meteorite_Pic = loadImage("Meteo.png");
  gameOver_Pic = loadImage("GameOver.png");
  restart_Pic = loadImage("Restart.png");
  comet_Pic = loadImage("Comet.png");
  SilverStar_Pic = loadImage("SilverStar.png")
  gameSound = loadSound("Playful.mp3");
  explosionSound = loadSound("Boom.wav");
  pointSound = loadSound("Ting.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  sky = createSprite(width / 2, 200, 20, 20);
  sky.addImage(sky_Pic);
  sky.velocityY = 6;
  sky.scale = 4;

  rocket_Img = createSprite(300, height - 100, 20, 200);
  rocket_Img.addImage(rocket_Pic);
  rocket_Img.scale = 0.5;

  invisibleEdge = createSprite(width - 5, height - 500, 5, 1000);
  invisibleEdge.visible = false;
  invisibleEdge.debug = false;

  invisibleEdge2 = createSprite(width - 800, height - 5, 2000, 10);
  invisibleEdge2.visible = false;
  invisibleEdge2.debug = false;

  invisibleEdge3 = createSprite(width - 1370, height - 100, 10, 2000);
  invisibleEdge3.visible = false;
  invisibleEdge3.debug = false;

  invisibleEdge4 = createSprite(width - 500, height - 670, 2000, 10);
  invisibleEdge4.visible = false;
  invisibleEdge4.debug = false;

  gameOver = createSprite(width / 2, 300, 20, 20);
  gameOver.addImage(gameOver_Pic);
  gameOver.visible = false;

  restart = createSprite(width / 2, 400, 20, 20);
  restart.addImage(restart_Pic);
  restart.visible = false;
  restart.scale = 0.1;

  starsGroup = createGroup();
  meteoritesGroup = createGroup();
  cometsGroup = createGroup();
  SilverStarsGroup = createGroup();
  
  
  gameSound.loop();

  score = 0;
}

function draw() {
  rocket_Img.debug = false;
  rocket_Img.setCollider("rectangle", 0, 0, 50, 400);

  if (gameState === "Play") {
    
    if (sky.y > 300) {
      sky.y = sky.width / 2;
    }

    rocket_Img.velocityY = 0;
    rocket_Img.velocityX = 0;

    if (keyDown(UP_ARROW)) {
      rocket_Img.velocityY = -10;
    }
    if (keyDown(DOWN_ARROW)) {
      rocket_Img.velocityY = 10;
    }
    if (keyDown(LEFT_ARROW)) {
      rocket_Img.velocityX = -10;
    }
    if (keyDown(RIGHT_ARROW)) {
      rocket_Img.velocityX = 10;
    }

    if (rocket_Img.isTouching(invisibleEdge)) {
      rocket_Img.collide(invisibleEdge);
    }
    if (rocket_Img.isTouching(invisibleEdge2)) {
      rocket_Img.collide(invisibleEdge2);
    }
    if (rocket_Img.isTouching(invisibleEdge3)) {
      rocket_Img.collide(invisibleEdge3);
    }
    if (rocket_Img.isTouching(invisibleEdge4)) {
      rocket_Img.collide(invisibleEdge4);
    }

    if (rocket_Img.isTouching(starsGroup) ) {
      score = score + 2;
      pointSound.play();
      starsGroup.destroyEach();
      
    }
    if(rocket_Img.isTouching(SilverStarsGroup)){
      score=score+4
      pointSound.play();
      SilverStarsGroup.destroyEach();
    }

    spawnStars();
    spawnComets();
    spawnObstacles();
    SilverStars();

    if (
      rocket_Img.isTouching(meteoritesGroup) ||
      rocket_Img.isTouching(cometsGroup)
    ) {
      gameState = "END";
      explosionSound.play();
    }
  } else if (gameState === "END") {
    score = 0;
    starsGroup.destroyEach();
    meteoritesGroup.destroyEach();
    cometsGroup.destroyEach();
    SilverStarsGroup.destroyEach();
    rocket_Img.destroy();
    gameOver.visible = true;
    restart.visible = true;
    sky.velocityY = 0;
    gameSound.stop();

    if (mousePressedOver(restart)) {
      reset();
    }
  }
  drawSprites();
  textSize(30);
  fill("yellow");
  text("Score: " + score, width / 2, 50);
}

function spawnStars() {
  if (frameCount % 60 === 0) {
    star = createSprite(random(width - 500, 500), 100, 20, 20);
    star.addImage(star_Pic);
    star.velocityY = 8;
    star.scale = 0.1;
    starsGroup.add(star);
  }
}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    meteorite = createSprite(random(10, 500), 100, 20, 20);
    meteorite.addImage(meteorite_Pic);
    meteorite.velocityY = 10;
    meteorite.scale = 0.2;
    meteoritesGroup.add(meteorite);
    meteorite.debug = false;
    meteorite.setCollider("rectangle", 0, 0, 320, 500);
  }
}

function reset() {
  gameState = "Play";
  gameOver.visible = false;
  restart.visible = false;
  gameSound.play();
  meteoritesGroup.destroyEach();
  starsGroup.destroyEach();
  rocket_Img = createSprite(300, 450, 20, 200);
  rocket_Img.addImage(rocket_Pic);
  rocket_Img.scale = 0.5;
  sky.velocityY = 6;

  score = 0;
}

function spawnComets() {
  if (frameCount % 100 === 0) {
    comet = createSprite(random(10, 500), 100, 20, 20);
    comet.addImage(comet_Pic);
    comet.velocityY = 10;
    comet.scale = 0.5;
    cometsGroup.add(comet);
    comet.debug=false;
    comet.setCollider("rectangle",0,0,30,15)
  }
}

function SilverStars(){
  if(frameCount%100===0){
    SilverStar = createSprite(random(10,500,100,20,20));
    SilverStar.addImage(SilverStar_Pic);
    SilverStar.velocityY=10;
    SilverStar.scale = 0.2;
    SilverStarsGroup.add(SilverStar);
  }
}
