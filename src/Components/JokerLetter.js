import React from "react";
import EventBus from "./EventBus";
import { useState, useEffect } from "react";

export default function JokerLetter(props) {

    const [x,setX] = useState(null);
    const [y,setY] = useState(null);
    const [visible, setVisible] = useState(false);

    useEffect( () =>{
        EventBus.on("Tile_JokerOnBoard", (data) => {
            setX(data.x);
            setY(data.y);
            setVisible(true);
        });
    }, []);

    const handleClick = (chr) => {
         EventBus.dispatch("JokerLetter_Selected", {x: x, y: y, letter: chr});
         setX(null);
         setY(null);
         setVisible(false);
    }

    if(!visible)
        return "";

    let letters=[];
    for (let  i = 65; i <= 90; i++){
        let chr = String.fromCharCode(i);
        letters.push(<div 
        key={'jok_' + chr} 
        className="jokerLetter" 
        onClick={() => handleClick(chr)}>{chr}</div>);
    }

    return (<div className="divJokerLetter modal">
        <div className="modal-content">
            {letters}
        </div>
    </div>);
}