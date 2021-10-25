export default class Deck {
    push = function (arr, letter, count){
      for(var i=0;i<count; i++)
        arr.push(letter);
    }
  
    hasTiles = function(){
      return this.state.tiles.length > 0;
    }
  
    getTile = function() {
      let ind = Math.floor(Math.random()* this.state.tiles.length);
      let ret = this.state.tiles[ind];
      this.state.tiles.splice(ind,1);
      return ret;
    }
    
    constructor(){  
      let tiles = [];
      this.push(tiles, 'A', 9); this.push(tiles, 'B', 2); this.push(tiles, 'C', 2); this.push(tiles, 'D', 4);
      this.push(tiles, 'E', 12); this.push(tiles, 'F', 2); this.push(tiles, 'G', 3); this.push(tiles, 'H', 2);
      this.push(tiles, 'I', 9); this.push(tiles, 'J', 1); this.push(tiles, 'K', 1); this.push(tiles, 'L', 4);
      this.push(tiles, 'M', 2); this.push(tiles, 'N', 6); this.push(tiles, 'O', 8); this.push(tiles, 'P', 2);
      this.push(tiles, 'Q', 1); this.push(tiles, 'R', 6); this.push(tiles, 'S', 4); this.push(tiles, 'T', 6);
      this.push(tiles, 'U', 4); this.push(tiles, 'V', 2); this.push(tiles, 'W', 2); this.push(tiles, 'X', 1);
      this.push(tiles, 'Y', 2); this.push(tiles, 'Z', 1); this.push(tiles, '*', 2);
      
      this.state = { tiles : tiles };
    }
  }
  