import Reflux from 'reflux';
import { colors } from '../components/colors';

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
    this.state = {board: [], reversed: false};
    this.listenables = BoardActions;
  }

  clearBoard(){
    this.setState({board: []});
  }

  setReversed(reversed){
    this.setState({reversed});
  }

  setBoard(board){
    if(this.state.reversed){
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
    let board = this.state.board.map(row => row.map(data => {
      let color = this.tileColor(data.tile);
      return color == data.color ? data : {tile: data.tile, color};
    }));
    this.setState({board});
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
    return this.state.reversed ? 7-y : x;
  }

  getY(x,y){
    return this.state.reversed ? x : y;
  }

  replaceAtIndex(array, index, value){
    return [...array.slice(0,index), value, ...array.slice(index+1)];
  }
}