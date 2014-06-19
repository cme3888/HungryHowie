
//gameplay loop
Crafty.scene('Game', function() {
  this.occupied = new Array(Game.map_grid.width);
  for (var i = 0; i < Game.map_grid.width; i++) {
    this.occupied[i] = new Array(Game.map_grid.height);
    for (var y = 0; y < Game.map_grid.height; y++) {
      this.occupied[i][y] = false;
    }
  }
 
  this.player = Crafty.e('PlayerCharacter').at(5, 5);
  this.occupied[this.player.at().x][this.player.at().y] = true;

  var floor = Crafty.e(" Actor, Color, Collision, Physics, Floor")
                .color("blue")
                .attr({h:30, w:400, x:0, y:380})
 
  ///carrots all around
  for (var x = 0; x < Game.map_grid.width; x++) {
    for (var y = 0; y < Game.map_grid.height; y++) {
      var at_edge = x == 0 || x == Game.map_grid.width - 1 || y == 0 || y == Game.map_grid.height - 1;
 
     

      if (at_edge) {
        // Place a tree entity at the current tile
        Crafty.e('Carrot').at(x, y);
        this.occupied[x][y] = true;
      } else if (Math.random() < 0.06 && !this.occupied[x][y]) {
        // Place a bush entity at the current tile
        Crafty.e('Turnip').at(x, y);
        this.occupied[x][y] = true;

      }

    }
  }
 
  // ten os less cherries
  var max_cherries = 10;
  for (var x = 0; x < Game.map_grid.width; x++) {
    for (var y = 0; y < Game.map_grid.height; y++) {
      if (Math.random() < 0.02) {
        if (Crafty('Cherry').length < max_cherries && !this.occupied[x][y]) {
          Crafty.e('Cherry').at(x, y);
        }
      }
    }
  }
 
  // Show the victory screen once all cherries are visisted
  this.show_victory = this.bind('CherryVisited', function() {
    if (!Crafty('Cherry').length) {
      Crafty.scene('Victory');
    }
  });
}, function() {
  this.unbind('CherryVisited', this.show_victory);
});
 
 
// Victory scene


Crafty.scene('Victory', function() {
  // Display some text in celebration of the victory
  Crafty.e('2D, DOM, Text')
    .attr({ x: 0, y: 0 })
    .text('Victory!');
 
  // Watch for the player to press a key, then restart the game
  //  when a key is pressed
  this.restart_game = this.bind('KeyDown', function() {
    Crafty.scene('Game');
  });
}, function() {
  // Remove our event binding from above so that we don't

  this.unbind('KeyDown', this.restart_game);
});
 
//loading
Crafty.scene('Loading', function(){

  Crafty.e('2D, DOM, Text')
    .text('Loading...')
    .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
    .css($text_css);
 
  // Load our sprite map image
  Crafty.load(['assets/fruitvegsweet_sheet.png', 'assets/Untitled-1.fw.png'], function(){
    // Once the image is loaded...
 
   
      Crafty.sprite(23, 'assets/fruitvegsweet_sheet.png', {
        spr_carrot:    [0, 0],
        spr_turnip:    [6, 0],
        spr_cherry: [1.5, 1.5]
    
        });

      Crafty.sprite(100, 'assets/Untitled-1.fw.png', {
        spr_player: [0, 0]  
    
        });
      
    
 
    // Now that our sprites are ready to draw, start the game
    Crafty.scene('Game');
  })
});
Game.start();