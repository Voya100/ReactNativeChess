import Reflux from 'reflux';
import { colors } from '../components/colors';

import { SettingsStore, SettingsActions } from './settings-store';
import { RoundStateStore } from './round-state-store';

export var BoardActions = Reflux.createActions([
  'clearBoard',
  'setBoard',
  'updateAllTiles',
  'updateTile'
]);

export class BoardStore extends Reflux.Store{

  constructor(){
    super();
    // board[y][x] = {tile, color}
    this.state = {board: [],};
    this.listenables = BoardActions;
    // Board needs to be set again when board gets reversed
    this.listenTo(SettingsActions.setBoardReversed, this.updateBoard)
  }

  clearBoard(){
    this.setState({board: []});
  }

  setBoard(board, reversed = SettingsStore.state.boardReversed){
    if(reversed){
      board = Array(8).fill(1).map((x,j) => Array(8).fill(1).map((x,i) => {
        let tile = board[7-i][j];
        return {tile, color: this.tileColor(tile)}
      }));
    }else{
      board = board.map((row) => row.map((tile => {
        return {tile: tile, color: this.tileColor(tile)}
      })));
    }
    this.setState({board});
  }

  updateAllTiles(){
    let board = this.state.board.map(row => 
        row.map(data => {
          let color = this.tileColor(data.tile);
          return color == data.color ? data : {tile: data.tile, color};
        })
    );
    this.setState({board});
  }

  updateBoard(reversed){
    this.setBoard(RoundStateStore.state.game.board, reversed);
  }

  updateTile(tile){
    let x = this.getX(tile.x, tile.y);
    let y = this.getY(tile.x, tile.y);
    let tileColor = this.tileColor(tile);
    let board = this.state.board;
    if(board[y][x].color != tileColor){
      let row = board[y];
      row = this.replaceAtIndex(row, x, {tile, color: tileColor});
      board = this.replaceAtIndex(board, y, row);
      this.setState({board});
    }
  }

  tileColor(tile){
    if(tile.highlighted()){
      return colors.highlightTile;
    }else if(tile.markedMovable()){
      if(tile.empty()){
        return colors.movableTile;
      }else{
        return colors.enemyTile;
      }
    }else{
      return (tile.x + tile.y) % 2 == 0 ? colors.blackTile : colors.whiteTile;
    }
  }

  getX(x,y){
    return SettingsStore.state.boardReversed ? 7-y : x;
  }

  getY(x,y){
    return SettingsStore.state.boardReversed ? x : y;
  }

  replaceAtIndex(array, index, value){
    return [...array.slice(0,index), value, ...array.slice(index+1)];
  }
}