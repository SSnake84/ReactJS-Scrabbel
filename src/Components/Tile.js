import React from 'react';
import {getPoints} from './PointsHelper';

export default function Tile(props) {
    const hidden = props.visible ? "" : " hidden ";
    const selected = props.selected ? " tile-selected " : "";
    let useLetter = props.letter;
    let usePoints;
    if(useLetter.length === 2){ // Joker  e.g.  *A
      useLetter = useLetter[1];
      usePoints = 0;
    }
    else
      usePoints = getPoints(useLetter);
    return (
      <div id={props.ID} onClick={props.onClick} className={"tile " + hidden + selected }  >
        <p unselectable="on">
          {useLetter}<sub>{usePoints}</sub>
        </p>
      </div>
    );
  }
  