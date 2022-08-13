class Game {
    constructor() {

      this.resetButton = createButton("");
    }
    
    getState(){
      database.ref("gameState").on("value", data=>{
          gameState = data.val();
      })
    }

    update(state){
      database.ref("/").update({
        gameState : state
      })

    }
  
    start() {
      form = new Form();
      form.display();
      player = new Player();
      playerCount = player.getCount();

      p1 = createSprite(width/2 - 50, height-50,20, 20);
      p1.shapeColor = "green";
      p1.addImage(playerImg);
      p2 = createSprite(width/2 + 50, height-50,20 ,20);
      p2.shapeColor = "red"
      p2.addImage(playerImg2);

      players = [p1, p2];
      
      base1 = createSprite(200, 200, 50, 50);
      base2 = createSprite(2000, 200, 50, 50);
    }

    handleElements() {
      form.hide();

      this.resetButton.class("resetButton");
      this.resetButton.position(width / 2 + 230, 100);
  
    }
  
    play() {
      this.handleElements();
      this.playerControl();
      this.handleResetButton();
      Player.getPlayersInfo();
      
      if (allPlayers !== undefined) {
        image(bg,-width*4, -height*4, width*5, height*5);


        var index =0;
        for(var plr in allPlayers){
          index  = index +1;
         
          var x = allPlayers[plr].positionX;
          var y = height- allPlayers[plr].positionY;

          console.log(players[index-1].position);

          players[index-1].position.x = x;
          players[index-1].position.y = y;

          if(index == player.index){
            this.handleBullets(index);
            camera.position.x = players[index-1].position.x
            camera.position.y = players[index-1].position.y
          }
        }

        
  
        drawSprites();
      }
    }
    playerControl(){
      if (keyIsDown(UP_ARROW)){
        player.positionY += 10;
        player.update();
      }
      if (keyIsDown(DOWN_ARROW)){
        player.positionY -= 10;
        player.update();
      }
      if (keyIsDown(RIGHT_ARROW) && player.positionX <width*4 -100){
        player.positionX += 10;
        player.update();
      }
      if (keyIsDown(LEFT_ARROW) && player.positionX > 100){
        player.positionX -= 10
        player.update();
      }

    }

    handleBullets(index){
      if(keyDown("space") && player.bullets>0){
        player.bullets -=1;
        player.update();
        this.spawnBullets(index)
      }
    }

    spawnBullets(index){
      var b = createSprite(players[index-1].positionX, players[index-1].positionY, 10, 10);
      if(players[index-1]==0){
        b.velocityX=30;
      }else{
        b.velocityX=-30;
      }
      b.addImage(bullet);
      b.scale=0.07
    }

    handleResetButton() {
      this.resetButton.mousePressed(() => {
        database.ref("/").set({
          playerCount: 0,
          gameState: 0,
          players: {}
        });
        window.location.reload();
      });
    }
  }
  