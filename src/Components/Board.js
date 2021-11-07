import React from 'react';
import EventBus from './EventBus';
import {getPoints} from './PointsHelper'
import { StyledSquare } from '../styled';

export default class Board extends React.Component {

    getInitialSquareProps = function(col, row) {
      let multi = {"factor": 1, "type": "L"};
  
      if([0, 14].indexOf(col) !== -1){
        if([0, 7, 14].indexOf(row) !== -1)   multi = {"factor" : 3, "type":"W"};
        else if([3, 11].indexOf(row) !== -1) multi = {"factor" : 2, "type":"L"};
      }
      else if([1, 13].indexOf(col) !== -1){
        if([1,13].indexOf(row) !== -1)      multi = {"factor" : 2, "type":"W"};
        else if([5, 9].indexOf(row) !== -1) multi = {"factor" : 3, "type":"L"};
      }
      else if([2, 12].indexOf(col) !== -1){
        if([2, 12].indexOf(row) !== -1)     multi = {"factor" : 2, "type":"W"};
        else if([6, 8].indexOf(row) !== -1) multi = {"factor" : 2, "type":"L"};
      }
      else if([3, 11].indexOf(col) !== -1){
        if([3, 11].indexOf(row) !== -1)         multi = {"factor" : 2, "type":"W"};
        else if([0, 7, 14].indexOf(row) !== -1) multi = {"factor" : 2, "type":"L"};
      }
      else if([4, 10].indexOf(col) !== -1){
        if([4, 10].indexOf(row) !== -1) multi = {"factor" : 2, "type":"W"};
      }
      else if([5, 9].indexOf(col) !== -1){
        if([1, 5, 9, 13].indexOf(row) !== -1) multi = {"factor" : 3, "type":"L"};
      }
      else if([6, 8].indexOf(col) !== -1){
        if([2, 6, 8, 12].indexOf(row) !== -1) multi = {"factor" : 2, "type":"L"};
      }
      if(col === 7){
        if([0, 14].indexOf(row) !== -1)      multi = {"factor" : 3, "type":"W"};
        else if(row ===7)                    multi = {"factor" : 2, "type":"W"};
        else if([3, 11].indexOf(row) !== -1) multi = {"factor" : 2, "type":"L"};
      }
  
      return {
          "multiplier": multi,
          "jClass" : (multi.type + multi.factor),
          "letter" : null,
          "sealed" : false,
          "rewardTaken": false
      }
    }
  
    constructor(props) {
      super(props);
        
      let squares = Array.from(Array(15), () => new Array(15));
      for(let j=0; j < 15; j++)
          for(let i=0; i < 15; i++)
              squares[j][i] = this.getInitialSquareProps(i, j);
  
      this.state = { squares: squares, rackTileSelected: null, dirties: [], dragFromBoard: null };  
    }

    isNullLetterAtXY(x,y){
      return this.getLetterAtXY(x,y) === null;
    }

    getLetterAtXY(x,y){
        if(x < 0 || x > 14)
            return null;

        if(y < 0 || y > 14)
            return null;

        return this.state.squares[y][x].letter;
    }

    isHorizontal(){
        let dirties = this.state.dirties;
        if (dirties.length === 1)
        {
            let x = dirties[0].x;
            let y = dirties[0].y;
            return  (!this.isNullLetterAtXY(x-1, y)  || !this.isNullLetterAtXY(x+1, y) );
        }
        return dirties[0].y === dirties[1].y;
    }

    getWord(dirtyIndex, horizontalDirection) {
        let x = this.state.dirties[dirtyIndex].x;
        let y = this.state.dirties[dirtyIndex].y;
        let ret = "";
        let value = 0;
        let multi = 1;


        while(!this.isNullLetterAtXY(x, y)) {
            if(horizontalDirection) x--; else y--;
        }
        
        if(horizontalDirection) x++; else y++;
        
        while(!this.isNullLetterAtXY(x, y)) {
            let letter = this.getLetterAtXY(x, y);
            let points;
            if(letter.length === 2){
              ret += letter[1];
              points = 0;
            }
            else {
              ret += letter;
              points = getPoints(letter);
            }

            if(this.state.squares[y][x].rewardTaken)
                value+= points;
            else{
                switch(this.state.squares[y][x].multiplier.type)
                {
                    case 'W':
                        multi *= this.state.squares[y][x].multiplier.factor;
                        value += points;
                        break;
                    default: // "L"
                        value += points * this.state.squares[y][x].multiplier.factor;
                        break;
                }
            }
            if(horizontalDirection) x++; else y++;
        }
        if(ret.length <= 1)
            return null;
        
        value *= multi;
        return {word: ret, value: value};
    }

    getHorizontalWord(dirtyIndex) {
        return this.getWord(dirtyIndex, true);
    }

    getVerticalWord(dirtyIndex) {
        return this.getWord(dirtyIndex, false);
    }

    getWords(tilesCant) {
        let dirties = this.state.dirties;
        let isMainWordHorizontal = this.isHorizontal();
        let ret = [];
        let mainWord = isMainWordHorizontal ? this.getHorizontalWord(0) : this.getVerticalWord(0);
        if(mainWord === null)
          return [];

        if(this.state.squares[7][7].letter == null)
          return [];

        ret.push(mainWord);
        let word;
        for(let i=0; i< dirties.length; i++) {
            word = isMainWordHorizontal ? this.getVerticalWord(i) : this.getHorizontalWord(i);
            if(word !== null)
                ret.push(word);
        }

        if(tilesCant === 7)
            ret.push({word: 'EXTRA BONUS', value: 50});

        return ret;
    }

    clearDirties(isCancel){
        const sq = this.state.squares;
        const dirties = this.state.dirties;

        for(let i=0; i < dirties.length; i++){
            sq[dirties[i].y][dirties[i].x].rewardTaken = true;
            if(isCancel)
              sq[dirties[i].y][dirties[i].x].letter = null;
            else
              sq[dirties[i].y][dirties[i].x].sealed = true;
          }
        
        this.setState({ squares : sq , dirties: []});
    }

    assignLetterTojoker(data) {
      const sq = this.state.squares;
      sq[data.y][data.x].letter = "*" + data.letter;
      this.setState({ squares : sq });
    }

    componentDidMount() {

        EventBus.on("Rack_TileSelected", (data) => this.setState({ rackTileSelected : data.tile, dragFromBoard: null } ));
        EventBus.on("Rack_Play", (data) => EventBus.dispatch("Words_Played", {words: this.getWords(data.tilesCant) } ));
        EventBus.on("Words_Confirmed", (data) => this.clearDirties(false));
        EventBus.on("Rack_Cancel", () => this.clearDirties(true));
        EventBus.on("JokerLetter_Selected", (data) => this.assignLetterTojoker(data));
    }

    componentWillUnmount() {
        EventBus.remove("Rack_TileSelected");
        EventBus.remove("Rack_Cancel");
        EventBus.remove("Rack_Play");
        EventBus.remove("Words_Confirmed");
        EventBus.remove("JokerLetter_Selected");
    }

    TileDragFromSquare = function(x,y)
    {
      if(this.isNullLetterAtXY(x,y))
          return;
      
        this.setState({dragFromBoard: { x: x, y: y}, rackTileSelected: null});
    }

    TileDropedOnSquare= function(x,y) {
      if(!this.isNullLetterAtXY(x,y))
          return;
      if(this.state.rackTileSelected === null && this.state.dragFromBoard == null)
          return;


       let sq = this.state.squares;
       let dirties = Object.assign([], this.state.dirties);

       let letter;
       if(this.state.rackTileSelected != null ) 
         letter = this.state.rackTileSelected.letter;
       else{
         letter = sq[this.state.dragFromBoard.y][this.state.dragFromBoard.x].letter;
         sq[this.state.dragFromBoard.y][this.state.dragFromBoard.x].letter = null;
         let i=0;
         let found = false;
         while(i<dirties.length && !found)
         {
           if( dirties[i].x === this.state.dragFromBoard.x && dirties[i].y === this.state.dragFromBoard.y) {
             dirties.splice(i, 1);
             found=true;
           }
           i++;
         }
       }
 
       sq[y][x].letter = letter;
       dirties.push({x: x, y: y});
       this.setState({squares: sq, dirties: dirties, rackTileSelected: null, dragFromBoard: null});
      EventBus.dispatch("Tile_RackToBoard", { });
      if(sq[y][x].letter.length === 2 || sq[y][x].letter === '*')
        EventBus.dispatch("Tile_JokerOnBoard", { x: x, y: y });
    };

    render(){
      var ret =[];
      for (let j = 0; j < 15; j++) {
        var rows = [];
        for (let i = 0; i < 15; i++) {
          rows.push(
            <StyledSquare 
                key={(j*15+i).toString()} 
                jClass ={this.state.squares[j][i].jClass}
                letter={this.state.squares[j][i].letter}
                sealed={this.state.squares[j][i].sealed}
                onDrop={() => this.TileDropedOnSquare(i,j)}
                onDrag={() => this.TileDragFromSquare(i,j)}
                />);
        }
        ret.push(<div key={j}>{rows}</div>);
      }
      return <div className="board">{ret}</div>;
    }
  }
