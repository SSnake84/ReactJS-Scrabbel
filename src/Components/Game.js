import React from 'react';
import Board from './Board';
import Rack from './Rack';
import WordsList from './WordsList';
import Players from './Players';
import JokerLetter from './JokerLetter';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export default function Game (props) {
  return (
  <DndProvider backend={HTML5Backend} debugMode="true">
    <div className="game">
      <>
        <div className="game-board">
          <Board />
          <br clear="all" />
          <br clear="all" />
          <Rack />
        </div>
      </>
      <div className="right-pane">
        <Players />
        <WordsList />
      </div>
      <JokerLetter />
    </div>
    <span id="footer">&copy; 2021 Jose Enser Solutions. All rights reserved.</span>
  </DndProvider>
  );
};
  