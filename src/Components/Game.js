import React from 'react';
import Board from './Board';
import Rack from './Rack';
import WordsList from './WordsList';
import Players from './Players';
import JokerLetter from './JokerLetter.js';


export default class Game extends React.Component {
  
    render () {
      return (
    <div className="game">
        <div className="game-board">
        <Board />
        <br clear="all" />
        <br clear="all" />
        <Rack />
        </div>
        <div className="right-pane">
            <Players />
            <WordsList />
        </div>
        <JokerLetter />
    </div>
      );
    }
  };
  