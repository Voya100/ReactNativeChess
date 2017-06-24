import { Piece } from './piece';
import { Tile } from '../tile';

import { SettingsStore } from '../../stores/settings-store';

export class Pawn extends Piece{

  value = 1;
  xStart;
  yStart;
  yDir;
  enPassantRound;

  constructor(player, tile){
    super("pawn", player, tile);
    this.xStart = tile.x;
    this.yStart = tile.y;
    this.yDir = this.white ? -1 : 1;
  }

	// Sets moveTiles and hitTiles
  tileCheck(){
    this.clearTiles();
    let y = this.y();

    this.checkVerticalTile(1);
    if(this.yStart == y){
      this.checkVerticalTile(2);
    }
    this.checkDiagonalTile(1);
    this.checkDiagonalTile(-1);
    this.addTiles();
  }

	// Adds vertical tile to moveTiles/hitTiles, if needed
  checkVerticalTile(distance){
    let y = this.y() + distance*this.yDir;
    if(!Tile.tileExists(this.x(), y)){
      return;
    }
    let tile = this.tiles[y][this.x()];
    if(tile.empty() && tile.tilesBetween(this.tile).filter((tile) => !tile.empty()).length == 0){
      this.moveTiles.push(tile);
    }
  }

	// Adds diagonal tile to moveTiles/hitTiles, if needed
  checkDiagonalTile(xDir){
    let x = this.x();
    let y = this.y();
    if(!Tile.tileExists(x+xDir,y+this.yDir)){
      return;
    }
    let	tile = this.tiles[y+this.yDir][x+xDir];
    let horizontalTile = this.tiles[y][x+xDir];
    if(tile.isEnemyOf(this) || this.canUseEnPassant(horizontalTile)){
      this.moveTiles.push(tile);
    }
    this.hitTiles.push(tile);
    tile.addHitter(this);
  }

	// True if pawn can use en passant against a piece on tile
  canUseEnPassant(tile){
    if(tile.isEnemyOf(this) && tile.piece.type == 'pawn'){
      let enemyPawn = tile.piece;
      return enemyPawn.isEnPassantable();
    }
  }

  move(x, y){
    this.setEnPassantability(y);
    this.tryToDoEnPassant(x,y);
    super.move(x, y);
		// Promotion
    if(y == 0 || y == 7){
      let delay = 500 / SettingsStore.state.gameSpeed;
      setTimeout(() => {
        this.player.game.addPiece(this.x(),this.y(),this.player,"Q");
        this.die();
      }, delay)
    }
  }

	// Tries to do en passant kill when moved to tile in x, y
  tryToDoEnPassant(x, y){
    let tile = this.player.game.board[y][x];
		// En passant if movement is diagonal and target tile is empty
    if(x != this.x() && tile.empty()){
      this.player.game.board[y-this.yDir][x].piece.die();
    }
  }

	// If piece moved 2 tiles, sets enPassantRound to the current round
  setEnPassantability(y){
    if(Math.abs(this.y() - y) == 2){
      this.enPassantRound = this.player.game.round;
    }
  }

	// Checks if enemy can kill the pawn with en passant
  isEnPassantable(){
    return this.enPassantRound == this.player.game.round;
  }
}
