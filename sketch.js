var game;
var database
var form;
var player;
var playerCount =0, gameState =0;
var allPlayers = [];
var base1, base2, middle;
var bullet;
var p1, p2;
var players =[];
var bg;
var playerImg, playerImg2;
function preload(){
  
  bg = loadImage("dirt.jpg");
  playerImg = loadImage("player1.png")
  bullet = loadImage("bullet.png")
  playerImg2 = loadImage("player2.png")
}

function setup() 
{

  createCanvas(windowWidth, windowHeight);
  database = firebase.database()
  game = new Game();
  game.getState();
  game.start();
}

function draw() 
{
background(51);
if(playerCount ==2){
  game.update(1);

}

if(gameState == 1){
  game.play();
}


}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

