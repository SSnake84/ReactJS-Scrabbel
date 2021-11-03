import React, {useEffect, useState } from "react";
import EventBus from "./EventBus";


export default function Players(props) {

    const [myData, setMyData] = useState({ index: 0, players: [{name: '', points: 0}, {name: '', points: 0}]});

    useEffect(() => {
        EventBus.on("Words_Confirmed", (data) => {
            // setTimeout(() => {
                // sumPoints(data);
                // nextPlayer();
                // EventBus.dispatch("Next_Player", {index: props.playerIndex, playersCount: players.length});
            // }, 2000);

            let d = Object.assign({}, myData);
            for(let i=0; i < data.words.length; i++){
                d.players[d.index].points += data.words[i].value;
            }
            d.index = ((d.index + 1) % d.players.length);
            setMyData(d);
        });
    }, []);

    // const sumPoints = (data) => {
    //     let _players = Object.assign({}, players);
    //     for(let i=0; i < data.words.length; i++){
    //         _players.p[players.ind.i].points += data.words[i].value;
    //     }
    //     setPlayers(_players);
    // };

    // const nextPlayer = () => {
    //     let _players = Object.assign({}, players);
    //     _players.ind = { i: ((players.ind.i + 1) % players.p.length) };
    //     setPlayers(_players);
    // };

    const addPlayer_Click = () => {
        let d = Object.assign({}, myData);
        d.players.push({name: 'Enter the name', points: 0});
        setMyData(d);
    };

    let listItems = myData.players.map((player, index) => 
        (<div key={index} className="playerDiv">
            <input
                type="text"
                placeholder="Enter the name" 
                className={(index === myData.index ? 'playerSelected' : '') }  />
            <div className="playerPoints">{ player.points }</div>
        </div>));
    
    return (<fieldset className="playersList">
                <legend>Players</legend>
                <button onClick={() => addPlayer_Click()}> Add Player</button>
                {listItems}
                <br clear="all"/>
            </fieldset>);
};