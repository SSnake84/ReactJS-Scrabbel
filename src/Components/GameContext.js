import {createContext} from "react";

const GameContext = createContext();

// {
//     playerIndex: 0,
//     players: [{name: '', points: 0},{name:'', points: 0}],
//     nextPlayer = () => { playerIndex = (playerIndex+1) % players.length; },
//     sumPoints: (words) => {}

//   });

export default GameContext;