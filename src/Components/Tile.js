import React from 'react';
import {getPoints, ItemTypes} from './PointsHelper';
import { useDrag } from 'react-dnd';

export default function Tile(props) {
    const hidden = props.visible ? "" : " hidden ";
    const selected = props.selected ? " tile-selected " : "";
    const sealed =  props.sealed ? "" : " tile-sealed";
    let useLetter = props.letter;
    let usePoints;
    if(useLetter.length === 2){ // Joker  e.g.  *A
      useLetter = useLetter[1];
      usePoints = 0;
    }
    else
      usePoints = getPoints(useLetter);

    const [, drag] = useDrag({
      type: ItemTypes.TILE,
      canDrag: (monitor) => (!props.isOnBoard || !props.sealed)
    });

    return (
      <div id={props.ID} onClick={props.onClick} className={"tile " + hidden + selected + sealed } 
      ref={drag}
      onDrag={(e) => props.onDrag(e)}
      >
        <p unselectable="on">
          {useLetter}<sub>{usePoints}</sub>
        </p>
      </div>
    );
  }
  