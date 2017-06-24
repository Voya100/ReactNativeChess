import { Piece } from './piece';

export class Bishop extends Piece{

  value = 5;

  constructor(player, tile){
    super("bishop", player, tile);
  }

  // Moves diagonally
  tileCheck(){
    this.clearTiles();
    this.moveTiles = this.moveTiles.concat(this.checkDirections(1,1,8,true));
    this.addTiles();
  }
}
