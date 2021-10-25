import React from "react";
import EventBus from "./EventBus";

export default class Players extends React.Component {

    constructor(props) {
        super(props);
        let players = [{name: 'Enter the name', points: 0}];
        let playerIndex = 0;

        this.state = { players: players, playerIndex: playerIndex};
    }

    componentDidMount() {
        EventBus.on("Words_Confirmed", (data) => {
            this.sumPoints(data);
            this.nextPlayer();
        });
      }
    
    componentWillUnmount() {
        EventBus.remove("Words_Confirmed");
    }

    sumPoints(data){
        let players = this.state.players;
        for(let i=0; i < data.words.length; i++)
        players[this.state.playerIndex].points += data.words[i].value;
        this.setState({players: players});
    }
    nextPlayer(){
        this.setState({ playerIndex: (this.state.playerIndex + 1) % this.state.players.length});
    }

    addPlayer_Click(){
        let players = this.state.players;
        players.push({name: 'Enter the name', points: 0});
        this.setState({ players: players});
    }
    render() {
        let listItems = this.state.players.map((player, index) => 
            (<div key={index} className="playerDiv">
                <input
                    type="text"
                    placeholder="Enter the name" 
                    className={(index === this.state.playerIndex ? 'playerSelected' : '') }  />
                <div className="playerPoints">{ player.points }</div>
            </div>));
        
        return (<div className="playersList">
                    <button onClick={() => this.addPlayer_Click()}>Add Player</button>
                    {listItems}
                    <br clear="all"/>
                </div>);
    }
};