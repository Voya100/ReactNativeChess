import { Piece } from './piece';

export class Rook extends Piece{

  type = "rook";
  value = 5;
	hasMoved = false;

  constructor(player, tile){
    super("rook", player, tile);
  }

	move(x, y, changeTurn = true){
		super.move(x, y, changeTurn);
		this.hasMoved = true;
	}

	tileCheck(){
		this.clearTiles();
		this.moveTiles = this.moveTiles.concat(this.checkDirections(1,0,8,true));
		this.moveTiles = this.moveTiles.concat(this.checkDirections(0,1,8,true));
		this.addTiles();
	}
}