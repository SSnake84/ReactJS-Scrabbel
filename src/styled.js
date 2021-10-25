import React from 'react';
import styled from 'styled-components';
import Tile from './Components/Tile';

const Square = React.memo((props) => {

    // export const Square = (props) => {

    let a = props.letter == null ? "" : <Tile letter={props.letter} visible="true" />
    return (
        <div className={props.className} onClick={props.onClick}>
         {a} 
        </div>
    );
 }, (prevProps, nextProps) => {
     return prevProps.letter === nextProps.letter;}
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
  background-color: ${(props) => getBackgroundColor(props.jClass)};
  &::after{ content: ${(props) => getSquareContent(props.jClass)};};
  &:focus { outline: none; }
`;

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
