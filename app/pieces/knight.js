import { Piece } from './piece';

export class Knight extends Piece{

  type = "knight";
  value = 4;

  constructor(player, tile){
    super(player, tile);
  }
  
  tileCheck(){
    this.clearTiles();
    this.moveTiles = this.moveTiles.concat(this.checkDirections(2,1,1,true));
    this.moveTiles = this.moveTiles.concat(this.checkDirections(1,2,1,true));
    this.addTiles();
  }
}