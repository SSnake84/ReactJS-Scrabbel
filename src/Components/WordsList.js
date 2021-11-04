import React from "react";
import { useState, useEffect } from "react/cjs/react.development";
import EventBus from "./EventBus";
import { validWord } from "./PointsHelper";

export default class WordsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { words:[], validWords:[] };
    }

    componentDidMount() {
        EventBus.on("Words_Played", (data) => {
            this.setState({words: data.words});
            this.checkWords(data.words);
       });
       EventBus.on("Rack_Cancel", () => this.setState({words: []}));
   }

   componentWillUnmount() {
        EventBus.remove("Words_Played");
        EventBus.remove("Rack_Cancel");
    }

    checkWords = (words) => {

        let _validWords = [];

        for(let i=0; i< words.length; i++)
            _validWords.push(validWord(words[i].word));

        this.setState({ validWords: _validWords});
    }

    confirmWords = () => {
        EventBus.dispatch("Words_Confirmed", { "words": this.state.words});
        this.setState({"words": []});
    }

    render() {
        let a = [];
        let b = []

        let _words = this.state.words;
        let _validWords = this.state.validWords;
        let points = 0;

        for(let i=0; i< _words.length; i++){
            a.push(<li key={"words" + i}>
                    <div className="word">{_words[i].word}</div>
                    <div className={"wordcheck-" + (_validWords[i] ? "found" : "notfound")}></div>
                    <div className="wordPoints">{_words[i].value}</div>

                </li>);
            points += _words[i].value;
        }
        
        if(a.length > 0){
            b.push(<div key="words_9"><div className="word wordTotal">TOTAL:</div><div className="wordPoints wordTotalPoints">{points}</div></div>);
            b.push(<button key="button_10" className="confirmWords" onClick={() => this.confirmWords()}>Confirm Words</button>);
        }

        return <fieldset className="wordsList">
                <legend>Words List</legend>
                <ul>{a}</ul>
                {b}
            </fieldset>;
    }
}