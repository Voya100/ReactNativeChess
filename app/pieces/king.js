import { Piece } from './piece';
import { Tile } from '../game/tile';

export class King extends Piece{

  value = 10;
	hasMoved = false;

  constructor(player, tile){
    super("king", player, tile);
  }

	move(x, y){
		if(Math.abs(this.x() - x) == 2){
			this.castling(x,y);
		}
		super.move(x,y);
		this.hasMoved = true;
	}

	// Moves rook to the correct tile as in castling special move
	// x and y: coordinates the king tries tries to move to
	castling(x, y){
		let targetTile = this.tiles[y][x];
		let kingDir = x < this.x() ? -1 : 1;
		let tilesInRooksDirection = targetTile.checkDirection(kingDir,0,8);
		let rookTile = tilesInRooksDirection[tilesInRooksDirection.length-1];
		if(rookTile.empty() || rookTile.piece.type != 'rook'){
			console.log("Error: Invalid castling call");
		}else{
			rookTile.piece.move(x-kingDir, y, false);
		}

	}

	tileCheck(){
		this.clearTiles();
		this.moveTiles = this.moveTiles.concat(this.checkDirections(1,0,1,true));
		this.moveTiles = this.moveTiles.concat(this.checkDirections(0,1,1,true));
		this.moveTiles = this.moveTiles.concat(this.checkDirections(1,1,1,true));
		this.addTiles();
	}

	// Adds tiles related to castling. Must be done after all other tileChecks have been done
	castlingCheck(){
		// King must not have moved and must not be in check
		if(this.hasMoved || this.threats().length != 0){
			return;
		}
		for(let i = 0; i < this.player.rooks.length; i++){
			let rook = this.player.rooks[i];
			let target = this.castlingTargetTile(rook);
			if(this.canDoCastlingWithRook(rook, target)){
				this.moveTiles.push(target);
				this.player.moveTiles.push(target);
				target.addMover(this);
			}
		}
	}

	canDoCastlingWithRook(rook, target){
		if(rook.hasMoved || rook.y() != this.y() || target == null){
			return false;
		}
		let tilesBetween = target.tilesBetween(this.tile);
		tilesBetween.push(target);
		let tilesWithPieces = tilesBetween.filter((tile) => !tile.empty());
		let dangerTiles = tilesBetween.filter((tile) => tile[this.player.enemy.color + "Hits"].length != 0);
		if(tilesWithPieces.length != 0 || dangerTiles.length != 0){
			return false;
		}
		return true;
	}

	// Tile to which king will move in castling
	castlingTargetTile(rook){
		let x = this.x() + 2*(rook.x() < this.x() ? -1 : 1);
		if(!Tile.tileExists(x,this.y())){
			return null;
		}else{
			return this.tiles[this.y()][x]
		}
	}

}