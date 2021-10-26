import React from "react";
import EventBus from "./EventBus";

export default class WordsList extends React.Component {

    constructor(props) {
        super(props);
  
        this.state = { words: [] };
    }
    
    componentDidMount() {
        EventBus.on("Words_Played", (data) => this.setState({ words : data.words }) );
        EventBus.on("Rack_Cancel", () => this.setState({ words : [] }));
    }

    componentWillUnmount() {
        EventBus.remove("Words_Played");
        EventBus.remove("Rack_Cancel");
    }
    
    confirmWords() {
        EventBus.dispatch("Words_Confirmed", { words : this.state.words });
        this.setState( {words: [] });
    }

    render() {
        let a = [];
        let b = []

        let words = this.state.words;
        let points = 0;

        for(let i=0; i< words.length; i++){
            a.push(<li>
                    <div class="word">{words[i].word}</div>
                    <div className="wordPoints">{words[i].value}</div>
                   </li>);
            points += words[i].value;
        }
        
        if(a.length > 0){
            b.push(<div><div class="word wordTotal">TOTAL:</div><div className="wordPoints wordTotalPoints">{points}</div></div>);
            b.push(<button className="confirmWords" onClick={() => this.confirmWords()}>Confirm Words</button>);
        }

        return <fieldset className="wordsList">
                <legend>Words List</legend>
                <ul>{a}</ul>
                {b}
                </fieldset>;
    }
};