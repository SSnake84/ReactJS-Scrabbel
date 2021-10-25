import React from 'react';
import {getPoints} from './PointsHelper';

export default class Tile extends React.Component {
    
    render() {
        const hidden = this.props.visible ? "" : " hidden ";
        const selected = this.props.selected ? " tile-selected " : "";
        let useLetter = this.props.letter;
        let usePoints;
        if(useLetter.length === 2){ // Joker  e.g.  *A
          useLetter = useLetter[1];
          usePoints = 0;
        }
        else
          usePoints = getPoints(useLetter);
      return (
        <div id={this.props.ID} onClick={this.props.onClick} className={"tile " + hidden + selected }  >
          <p unselectable="on">
            {useLetter}<sub>{usePoints}</sub>
          </p>
        </div>
      );
    }
  }
  