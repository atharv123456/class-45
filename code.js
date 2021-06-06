var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["29aad922-b8ec-4268-bb90-ba6979c85038","72372a31-80ca-4deb-9253-a718154fd989","e2f78971-fa74-4fd9-9f63-71b40f59d415","1a9ca7bf-0144-4c95-b28f-2b2b29f24b40"],"propsByKey":{"29aad922-b8ec-4268-bb90-ba6979c85038":{"name":"goodplayer","sourceUrl":"assets/api/v1/animation-library/gamelab/xUV8EZgUbz2F1ZVrjlwJ_oew_ydjIiTk/category_people/black_haori.png","frameSize":{"x":150,"y":400},"frameCount":1,"looping":true,"frameDelay":2,"version":"xUV8EZgUbz2F1ZVrjlwJ_oew_ydjIiTk","categories":["people"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":150,"y":400},"rootRelativePath":"assets/api/v1/animation-library/gamelab/xUV8EZgUbz2F1ZVrjlwJ_oew_ydjIiTk/category_people/black_haori.png"},"72372a31-80ca-4deb-9253-a718154fd989":{"name":"santa1","sourceUrl":"assets/api/v1/animation-library/gamelab/9ZleRnJkMxYhfpPY2zZrrikGdZ6H6F6l/category_backgrounds/background_santa.png","frameSize":{"x":400,"y":400},"frameCount":1,"looping":true,"frameDelay":2,"version":"9ZleRnJkMxYhfpPY2zZrrikGdZ6H6F6l","categories":["backgrounds"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":400,"y":400},"rootRelativePath":"assets/api/v1/animation-library/gamelab/9ZleRnJkMxYhfpPY2zZrrikGdZ6H6F6l/category_backgrounds/background_santa.png"},"e2f78971-fa74-4fd9-9f63-71b40f59d415":{"name":"burger1","sourceUrl":null,"frameSize":{"x":300,"y":262},"frameCount":1,"looping":true,"frameDelay":12,"version":"GuqPJEbNiG9UGwQAyIKR3l4l1k_STKBy","categories":["food"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":300,"y":262},"rootRelativePath":"assets/e2f78971-fa74-4fd9-9f63-71b40f59d415.png"},"1a9ca7bf-0144-4c95-b28f-2b2b29f24b40":{"name":"virus1","sourceUrl":"assets/api/v1/animation-library/gamelab/NYXAKV8lMtBFQ4CvUgBDjrGq5xJ8.AMN/category_germs/gameplaywacky_13.png","frameSize":{"x":400,"y":398},"frameCount":1,"looping":true,"frameDelay":2,"version":"NYXAKV8lMtBFQ4CvUgBDjrGq5xJ8.AMN","categories":["germs"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":400,"y":398},"rootRelativePath":"assets/api/v1/animation-library/gamelab/NYXAKV8lMtBFQ4CvUgBDjrGq5xJ8.AMN/category_germs/gameplaywacky_13.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var player1;
var backGround;
var food;
var virus;
var rand;
var rand1;
var score=0;
var burgerGroup,coronaGroup;
var gameState="PLAY";


playSound("assets/category_whoosh/alien_ship_flyby_whoosh_3_slow.mp3",true);

//making background
backGround=createSprite(200,200,200,200);
backGround.setAnimation("santa1");

//making the player
player1=createSprite(55,200,5,5) ;
player1.setAnimation("goodplayer");
player1.scale=0.3;



burgerGroup = new Group();
coronaGroup = new Group();




function draw() {



if(gameState==="PLAY"){
spawnfood();
spawndeath();
player1.y=World.mouseY;



if(burgerGroup.isTouching(player1)){
score=score+1;
burgerGroup.destroyEach();
}
drawSprites();

if(coronaGroup.isTouching(player1)){
gameState="END";
coronaGroup.destroyEach();
textSize(30);
fill("red");
text("GameOver,Well Played",70,365);
burgerGroup.destroyEach();
}

}
else if(gameState==="END"){
burgerGroup.setVelocityXEach(0);
coronaGroup.setVelocityXEach(0);
textSize(16);
fill("yellow");
text("Press space key to restart",100,30);
stopSound();
playSound("assets/category_explosion/air_explode_bonus_5.mp3", false);

}

if(keyDown("space")){
reset();
}





textSize(20);
fill("white");
text("score=" +score,300,20);


}

function spawnfood(){
rand=Math.round(random(50,420));

if(frameCount%10==0){
food=createSprite(410,rand,100,100);
//food.x=rand;
food.setAnimation("burger1");
food.scale=0.13;
food.velocityX=-12;
burgerGroup.add(food);
}
}


function spawndeath(){
rand1=Math.round(random(50,420));

if(frameCount%25==0){
virus=createSprite(410,rand,100,100);
//food.x=rand;
virus.setAnimation("virus1");
virus.scale=0.1;
virus.velocityX=-6;
coronaGroup.add(virus);
}
}

function reset(){
gameState="PLAY";
playSound("assets/category_whoosh/alien_ship_flyby_whoosh_3_slow.mp3",true);
score=0;
}
// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
