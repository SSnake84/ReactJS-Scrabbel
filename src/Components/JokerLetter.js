import React from "react";
import EventBus from "./EventBus";

export default class JokerLetter extends React.Component {

    constructor(props) {
        super(props);
        this.state = { x: null, y: null, visible: false };
      }
  
    componentDidMount() {
        EventBus.on("Tile_JokerOnBoard", (data) => {
            this.setState({ x : data.x, y: data.y, visible: true })
        });
    }

    componentWillUnmount() {
        EventBus.remove("Tile_JokerOnBoard");
    }

    handleClick(chr){
         EventBus.dispatch("JokerLetter_Selected", {x: this.state.x, y: this.state.y, letter: chr});
         this.setState({ x :null, y: null, visible: false });
    }

    render () {
         if(!this.state.visible)
             return "";

        let letters=[];
        for (let  i = 65; i <= 90; i++){
            let chr = String.fromCharCode(i);
            letters.push(<div 
                key={'jok_' + chr} 
                className="jokerLetter" 
                onClick={() => this.handleClick(chr)}>{chr}</div>);
        }
        
        return (<div className="divJokerLetter modal">
                <div className="modal-content">
                    {letters}
                </div>
               </div>);
    }
}