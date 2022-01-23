var bg,bgImg;
var player, shooterImg, shooter_shooting;
var gost_1, gost_img_1,gost_img_2,gost_img_3,gost_img_4;
var gostgroup;
var score = 0;
var bullet_left = 50;
var bullets, bullet_img, bulletgroup;
var life = 3;
var heart1, heart2, heart3;
var heart_img1, heart_img2, heart_img3;
var obstacle, obsticle_img;
var border_right,border_left,border_up,border_down;
var playButton,playButtonImg;
var gameState="start";


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png");
  gost_img_1 = loadImage("assets/gost_1.png");
  gost_img_2 = loadImage("assets/gost_2.png");
  gost_img_3 = loadImage("assets/gost_3.png");
  gost_img_4 = loadImage("assets/gost_4.png");
  bullet_img = loadImage("assets/bullet.png");
  heart_img1 = loadImage("assets/heart_1.png");
  heart_img2 = loadImage("assets/heart_2.png");
  heart_img3 = loadImage("assets/heart_3.png");
  playButtonImg=loadImage("assets/PlayButton.png");
//  obsticle_img = loadImage("asstes/rock_1.png")

  bgImg = loadImage("assets/bg.jpeg")

  bulletgroup = new Group();
  gostgroup = new Group();


}

function setup() {

  
  createCanvas(displayWidth-151,displayHeight-218);
//canvas.position(0,10)
  //adding the background image
  bg =    createSprite(displayWidth/2,displayHeight/2,20,20)
bg.addImage(bgImg)
bg.scale = 1.3
//     bg.velocityX = -6 ;
  

//creating the player sprite
player = createSprite(300, 500, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.4
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   border_right = createSprite(1430, displayHeight/2, 10, displayHeight); 
   border_left = createSprite(60, displayHeight/2, 10, displayHeight);
   border_up = createSprite(displayWidth/2, 20, displayWidth, 10);
   border_down = createSprite(displayWidth/2, 600, displayWidth, 10);

   border_up.visible = false;
   border_down.visible = false;
   border_right.visible = false;
   border_left.visible = false;
   

   playButton=createSprite(width/2,height/2+125);
   playButton.addImage(playButtonImg);
   playButton.scale=0.15;
   playButton.visible = false;


}

function draw() {
  background(0);


  //START Gamestate
//if(gameState==="start"){
//  textSize(25);
//  fill(254,182,21);
//  stroke("white");
//  text("Instructions :\n 1) Use arrow keys to move  \n 2) Avoid rocks and reach 1000 score in Level 1 \n 3) You have to save  from Jafar in Level 2",width/2-250,height/2-50);
//  bg.visible = true;
//  gost_1.visible = false
// 
//  playButton.visible = true;
//    player.visible = true;
//  if(mousePressedOver(playButton)){
//   // resetSound.play();	   // clear();
//    gameState="LevelOne";
//  }
//}



  
  player.collide(border_up);
  player.collide(border_down);
  
  if(frameCount%50===0){
    spawn_gosts();
  }

  if(bulletgroup.isTouching(gostgroup)){
  // gost_1 .destroy();
    gost_1.remove()
    bulletgroup.destroyEach();
    score = score + 1;
  
  }




  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-10
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+10
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
  spawn_bullets();
  bullet_left = bullet_left - 1;
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
  
if ( bullet_left <= 0 || player.isTouching(gostgroup)){
  gameOver()
}

if(score === 5){
  nextLevel()
}

drawSprites();
fill("black");
textSize(30);
stroke("cyan");
text(mouseX+","+mouseY, mouseX, mouseY );
text("score = " + score,1000, 40);
text("bullets left = " + bullet_left, 1200, 40);


}

function spawn_gosts(){
  var gost_y = Math.round( random (30,600));
  gost_1 = createSprite(1400, gost_y,  60, 60);
  gost_1.velocityX = -(10+score/10);
  var gost_random = Math.round( random(1,4));
  switch(gost_random){
    case 1 : gost_1.addImage(gost_img_1);
    break;
    case 2 : gost_1.addImage(gost_img_2);
    break;
    case 3 : gost_1.addImage(gost_img_3);
    break;
    case 4 : gost_1.addImage(gost_img_4);
    break;
    default:break;

  }

  gost_1.lifetime =130;
  gost_1.scale = 2;
  gostgroup.add(gost_1);
  gost_1.rotationSpeed = 3
}

function spawn_bullets(){
  bullets = createSprite(player.x, player.y, 20,20);
  bullets.addImage(bullet_img);
  bullets.scale = 0.5;
  bullets.velocityX = 30;
  bullets.lifeTime = 120;
  bulletgroup.add(bullets);
}

function gameOver() {
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}

function nextLevel() {
  swal({
    title: `Awesome!${"\n"}Rank${"\n"}${score}`,
    text: "You have  successfully completed LEVEL 1",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr55CZpQ3WqNG_aoyw0KAmQzmAFCUt0z9pUqJ1dAi_IuIGdiFYurtbTBXtOcixIjq2VdI&usqp=CAU",
    imageSize: "100x100",
    confirmButtonText: "click to play LEVEL 2"
  },
  function(isConfirm) {
    if (isConfirm) {
      location.reload();
    }
  }
  );
}
