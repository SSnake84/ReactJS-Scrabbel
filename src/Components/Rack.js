import React from 'react';
import Tile from './Tile';
import Deck from './Deck';
import EventBus from "./EventBus";


export default class Rack extends React.Component {
  constructor(props) {
    super(props);
    this.state = { deck: new Deck(), tiles: [] };
    this.addMoreTiles(7);
  }
  componentDidMount() {
    EventBus.on("Tile_RackToBoard", (data) => this.removeTileFromRack(data));
    EventBus.on("Words_Confirmed", (data) => this.prepareForNextMove(data));
  }

  componentWillUnmount() {
    EventBus.remove("Tile_RackToBoard");
    EventBus.remove("Words_Confirmed");
  }

  addMoreTiles = function(amount) {
      let i=0;
      while(this.state.deck.hasTiles() && i < amount)
      {
        this.state.tiles.push(
          { 
            "letter": this.state.deck.getTile(),
            "selected":false,
            "visible": true
          });
        i++;
      }
    }
  
    handleTileClick(e) {
      let a = parseInt(e.currentTarget.id.replace('rack_tile_',''));
      let tiles = this.state.tiles;
      for(let i=0; i< tiles.length; i++)
      {
          if(i === a){
            tiles[i].selected = true;
            EventBus.dispatch("Rack_TileSelected", { tile: tiles[i] });
          }
          else
            tiles[i].selected = false;
        }
  
      this.setState({ tiles: tiles });
    };

    shuffle(){
        let tiles = this.state.tiles;
        const arr = [];
        while(tiles.length > 0)
        {
            let ind = Math.floor(Math.random()*tiles.length);
            arr.push(tiles[ind]);
            tiles.splice(ind,1);
        }
        this.setState({ tiles: arr });
    };

    cancel(){
        let tiles = this.state.tiles;
        for(let i=0; i< tiles.length; i++)
            tiles[i].visible = true;

        this.setState({ tiles: tiles });
        EventBus.dispatch("Rack_Cancel", {});
    };

    play(){
        let tiles = this.state.tiles;
        let tilesCant = 0;
        for(let i=0; i< tiles.length; i++)
            if(!tiles[i].visible)
            tilesCant++;
        if(tilesCant > 0)
          EventBus.dispatch("Rack_Play", { tilesCant: tilesCant});
    }

    removeTileFromRack(data){
        let tiles = this.state.tiles;
        for(let i=0; i< tiles.length; i++){
            if(tiles[i].selected) {
                tiles[i].selected = false;
                tiles[i].visible = false;
                break;
            }
        }
        this.setState({tiles: tiles, rackTileSelected: null });
    }

    prepareForNextMove(data){
        let tiles = this.state.tiles;
        let i=0;
        while(i<tiles.length){
            if(!tiles[i].visible)
                tiles.splice(i,1);
            else
                i++;
        }
        this.setState({tiles: tiles, rackTileSelected: null });
        this.addMoreTiles(7 - tiles.length);        
    }

    render() {
      let tiles =[];
      let i=0;
      while(i < this.state.tiles.length)
      {
        tiles.push(<Tile 
            ID={'rack_tile_' + i}
            key={'rack_tile_' + i}
            value={i}
            letter={this.state.tiles[i].letter} 
            visible={this.state.tiles[i].visible}
            ref={i}
            onClick={ (e) => this.handleTileClick(e)}
            selected={this.state.tiles[i].selected}
            isOnBoard={false}
        />);
        i++;
      }
      return (
        <div className="rack">
            <div className="rack-tiles">
                {tiles}
            </div>
            <div className="rack-actions">
                <button className="Play" onClick={() => this.play()}>Play</button>
                <button className="Cancel" onClick={() => this.cancel()}>Cancel</button>
                <button className="Shuffle" onClick={() => this.shuffle()}>Shuffle</button>
                <button className="Swap">Swap</button>
            </div>
        </div>);
    }
  }