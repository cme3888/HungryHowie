// The Grid component allows an element to be located
//  on a grid of tiles
Crafty.c('Grid', {
  init: function() {
            this.attr({
               w: Game.map_grid.tile.width,
               h: Game.map_grid.tile.height
          })
    },
 
  // Locate this entity at the given position on the grid
  at: function(x, y) {
    if (x === undefined && y === undefined) {
      return { x: this.x/Game.map_grid.tile.width, y: this.y/Game.map_grid.tile.height }
    } else {
      this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height });
      return this;
    }
  }
});
 

Crafty.c('Actor', {
  init: function() {
    this.requires('2D, Canvas, Grid');
  },
});
 

Crafty.c('Carrot', {
  init: function() {
    this.requires('Actor, Solid, spr_carrot')
      

  },
});
 
Crafty.c('Turnip', {
  init: function() {
    this.requires('Actor, Solid, spr_turnip');
      
  },
});
 
// This is the player-controlled character
Crafty.c('PlayerCharacter', {
  init: function() {
    this.requires('Actor, Fourway, Color, Collision')
      .fourway(4)
      .color('white')
      .stopOnSolids()
      .onHit('Cherry', this.visitCherry)
      .stopOnSolids();
     
  },

 
 
  //  hits an entity with the "Solid" component
  stopOnSolids: function() {
    this.onHit('Solid', this.stopMovement);
 
    return this;
  },
 
  // Stops the movement
  stopMovement: function() {
    this._speed = 0;
    if (this._movement) {
      this.x -= this._movement.x;
      this.y -= this._movement.y;
    }
  },
 
  // Respond to this player visiting a village
  visitCherry: function(data) {
    foood = data[0].obj;
    foood.visit();
  }
});
 
Crafty.c('Cherry', {
  init: function() {
    this.requires('Actor, spr_cherry');
  },
 
  // visit to cherry
  visit: function() {
    this.destroy();
    Crafty.trigger('CherryVisited', this);
  }
});
