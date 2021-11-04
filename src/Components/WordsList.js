import React from "react";
import { useState, useEffect } from "react/cjs/react.development";
import EventBus from "./EventBus";
// import { validWord } from "./PointsHelper";

export default function WordsList(props) {
    const [words, setWords] = useState(0);
    // const [validWords, setValidWords] =  useState(new Array());
    
    useEffect(() => {
        EventBus.on("Words_Played", (data) => {
             setWords(data.words);
            //  checkWords(data.words);
        });
        EventBus.on("Rack_Cancel", () => setWords([]));
    }, []);

    // const checkWords = (words) => {

    //     let _validWords = [];

    //     for(let i=0; i< words.length; i++)
    //         _validWords.push(validWord(words[i].word));

    //     setValidWords(_validWords);
    // }
    
    const confirmWords = () => {
        EventBus.dispatch("Words_Confirmed", { words : words });            
        setWords([]);
    }

    let a = [];
    let b = []

    let _words = words;
    // let _validWords = validWords;
    let points = 0;

    for(let i=0; i< _words.length; i++){
        a.push(<li key={"words" + i}>
                <div className="word">{_words[i].word}</div>
                {/* <div className={"wordcheck-" + (_validWords[i] ? "found" : "notfound")}></div> */}
                <div className="wordPoints">{_words[i].value}</div>

               </li>);
        points += _words[i].value;
    }
    
    if(a.length > 0){
        b.push(<div key="words_9"><div className="word wordTotal">TOTAL:</div><div className="wordPoints wordTotalPoints">{points}</div></div>);
        b.push(<button key="button_10" className="confirmWords" onClick={() => confirmWords()}>Confirm Words</button>);
    }

    return <fieldset className="wordsList">
            <legend>Words List</legend>
            <ul>{a}</ul>
            {b}
           </fieldset>;
}
