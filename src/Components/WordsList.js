import React from "react";
import { useState, useEffect } from "react/cjs/react.development";
import EventBus from "./EventBus";

export default function WordsList(props) {
    const [words, setWords] = useState([]);
    
    useEffect(() => {
        EventBus.on("Words_Played", (data) => setWords(data.words));
        EventBus.on("Rack_Cancel", () => setWords([]));
    }, []);
    
    const confirmWords = () => {
        EventBus.dispatch("Words_Confirmed", { words : words });
        setWords([]);
    }

    let a = [];
    let b = []

    let _words = words;
    let points = 0;

    for(let i=0; i< _words.length; i++){
        a.push(<li key={"words" + i}>
                <div className="word">{_words[i].word}</div>
                <div className="wordPoints">{_words[i].value}</div>
               </li>);
        points += _words[i].value;
    }
    
    if(a.length > 0){
        b.push(<div><div className="word wordTotal">TOTAL:</div><div className="wordPoints wordTotalPoints">{points}</div></div>);
        b.push(<button className="confirmWords" onClick={() => confirmWords()}>Confirm Words</button>);
    }

    return <fieldset className="wordsList">
            <legend>Words List</legend>
            <ul>{a}</ul>
            {b}
           </fieldset>;
}
