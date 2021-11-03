import React, { useState, useEffect } from 'react';
import Board from './Board';
import Rack from './Rack';
import WordsList from './WordsList';
import Players from './Players';
import JokerLetter from './JokerLetter.js';
import EventBus from './EventBus';


export default function Game(props) {
  const [playerIndex, setPlayerIndex] = useState(0);
  
  useEffect(() => {
    EventBus.on("Next_Player", (data) => {
      setPlayerIndex((data.index + 1) % data.playersCount);
    });
  }, []);

  return (
    <div className="game">
        <div className="game-board">
        <Board />
        <br clear="all" />
        <br clear="all" />
        <Rack />
        </div>
        <div className="right-pane">
            <Players playerIndex={playerIndex} />
            <WordsList />
        </div>
        <JokerLetter />
    </div>
    );
}