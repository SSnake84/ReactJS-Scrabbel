import React, {useState} from 'react';
import Board from './Board';
import Rack from './Rack';
import WordsList from './WordsList';
import Players from './Players';
import JokerLetter from './JokerLetter';
import GameContext from './GameContext';


export default function Game() {

  const [playerIndex, setPlayerIndex] = useState(0);
  const [players, setPlayers] = useState([{name: '', points: 0}, {name: '', points: 0}]);

  const addPlayer = () =>{
    let _players = [...players];
    _players.push({name: '', points: 0});
    setPlayers(_players);
  };

  const nextPlayer = () => {
    setPlayerIndex((playerIndex+1) % players.length);
  };

  const sumPoints = (words) => {
      console.log('points ' + playerIndex);
      let _players = [...players];
      for(let i=0; i < words.length; i++)
          _players[playerIndex].points += words[i].value;
      setPlayers(_players);
  };

  return (<GameContext.Provider value={{ players, playerIndex, addPlayer, nextPlayer, sumPoints}}>
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
    </GameContext.Provider>);
}
  