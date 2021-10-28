import React, { useEffect, useContext } from "react";
import EventBus from "./EventBus";
import GameContext from "./GameContext";

const Players = (props) => {

    const { players, playerIndex, sumPoints, nextPlayer, addPlayer } = useContext(GameContext);
            
    useEffect(() => {
        EventBus.on("Words_Confirmed", (data) => {
            sumPoints(data.words);
            nextPlayer();
        });
    }, []);

    let listItems = [];
    for(let i=0; i< players.length; i++) {
        listItems.push(
            <div key={'player' + i} className="playerDiv">
                <input
                    type="text"
                    placeholder="Enter the name" 
                    className={(i === playerIndex ? 'playerSelected' : '') }  />
                <div className="playerPoints">{ players[i].points }</div>
            </div>
        );
    }

    return (
        <fieldset className="playersList">
            <legend>Players</legend>
            <button onClick={() => addPlayer()}> Add Player</button>
            {listItems}
            <br clear="all"/>
        </fieldset>)
};

export default Players;