import { Piece } from './piece';

export class Queen extends Piece{
  
  value = 7;

  constructor(player, tile){
    super("queen", player, tile);
  }
	
  tileCheck(){
		this.clearTiles();
		this.moveTiles = this.moveTiles.concat(this.checkDirections(1,0,8,true));
		this.moveTiles = this.moveTiles.concat(this.checkDirections(0,1,8,true));
		this.moveTiles = this.moveTiles.concat(this.checkDirections(1,1,7,true));
		this.addTiles();
	}
}