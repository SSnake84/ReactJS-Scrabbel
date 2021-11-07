import React from 'react';
import styled from 'styled-components';
import Tile from './Components/Tile';
import { ItemTypes } from './Components/PointsHelper';
import { useDrop } from 'react-dnd';

const Square = React.memo((props) => {

    // export const Square = (props) => {

    const [, drop] = useDrop(
        () => ({
            accept: ItemTypes.TILE,
            canDrop: (item, monitor) => props.letter== null,
        })
        )

    let a = props.letter == null ? "" : <Tile letter={props.letter} visible={true} isOnBoard={true} onDrag={props.onDrag} sealed={props.sealed} />
    return (
        <div className={props.className} onClick={props.onClick} onDrop={props.onDrop}  ref={drop}>
         {a} 
        </div>
    );
 }, (prevProps, nextProps) => {
     return prevProps.letter === nextProps.letter && prevProps.sealed === nextProps.sealed;}
);


export const StyledSquare = styled(Square)`
  border: 1px solid #999;
  float: left;
  line-height: 26px;
  width:26px;
  height:26px;
  padding: 0;
  text-align:center;
  font-size:9px;
  overflow:hidden;
  color: ${(props) => getColor(props.jClass)};
  background-color: ${(props) => getBackgroundColor(props.jClass)};
  &::after{ content: ${(props) => getSquareContent(props.jClass)};};
  &:focus { outline: none; }
`;

function getColor (squareType){
    switch(squareType){
        case 'W3':
        case 'L3': return "white";
        default: return "black";
    }
}

function getBackgroundColor (squareType){
    switch(squareType){
        case 'W2': return "pink";
        case 'W3': return "red";
        case 'L3': return "blue";
        case 'L2': return "cyan";
        case 'L1': return "#ddd";
        default: return "#red";
    }
}
function getSquareContent (squareType){
    switch(squareType){
        case 'W2': return "'2xW'";
        case 'W3': return "'3xW'";
        case 'L3': return "'3xL'";
        case 'L2': return "'2xL'";
        case 'L1': return "";
        default: return "";
    }
}
