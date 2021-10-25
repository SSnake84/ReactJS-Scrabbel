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

        for(let i=0; i< words.length; i++)
            a.push(<li>{words[i].word + ' ' +  words[i].value}</li>);
        
        if(a.length > 0) {
            b.push(<br />);
            b.push(<button onClick={() => this.confirmWords()}>Confirm Words</button>);
        }

        return <div>
                <h3>Words List:</h3>
                <ul>{a}</ul>
                {b}
                </div>;
    }
};