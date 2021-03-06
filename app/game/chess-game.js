import { Tile } from './tile';
import { Bishop } from './pieces/bishop';
import { King } from './pieces/king';
import { Knight } from './pieces/knight';
import { Pawn } from './pieces/pawn';
import { Queen } from './pieces/queen';
import { Rook } from './pieces/rook';
import { HumanPlayer } from './players/human-player';
import { ComputerPlayer } from './players/computer-player';

import { SettingsStore } from '../stores/settings-store';
import { PieceActions } from '../stores/piece-store';
import { BoardActions } from '../stores/board-store';
import { RoundStateActions } from '../stores/round-state-store';

export class ChessGame {
  
  // Properties, are set in reset
  board = [];
  white;
  black;
  gameActive = false;
  gamePaused = false;
  turn;
  round;
  gameId = 0;
  activePlayer;
  winner;

  constructor() { 
    this.settings = SettingsStore;
  }
  
  reset(){
    this.gameActive = false;
    
    this.gameId++;
    
    this.board = [];
    PieceActions.clearPieces();
    RoundStateActions.setGameEnded(false, '');
    
    this.white = this.settings.state.whiteIsComputer ? new ComputerPlayer("white", this) : new HumanPlayer("white", this);
    this.black = this.settings.state.blackIsComputer ? new ComputerPlayer("black", this) : new HumanPlayer("black", this);
    
    this.white.enemy = this.black;
    this.black.enemy = this.white;
    
    this.setActivePlayer(this.white);

    this.setRound(1);
    this.setUp();
    this.gameActive = true;
    this.turn = true;
    // Small delay so that ui has time to add pieces before computer starts its moves
    setTimeout(() => this.run(), 500);
  }

  setActivePlayer(player){
    this.activePlayer = player;
    RoundStateActions.setActivePlayerColor(player.color);
  }

  setRound(round){
    this.round = round;
    RoundStateActions.setRound(round);
  }
  
  // Sets the board and adds all the pieces
  setUp(){
    this.fillBoard();
    this.addPieces();
    this.doTileChecks();
    this.turn = true;
  }

  // Makes empty tiles for the board
  fillBoard(){
    this.board = [];
    for(let j = 0; j < 8; j++){
      this.board[j] = [];
      for(let i = 0; i < 8; i++){
        this.board[j][i] = new Tile(i,j,this);
      }
    }
    BoardActions.setBoard(this.board);
  }
  
  addPieces(){
    let positions = this.settings.state.piecePositions;
    let row1 = positions[0];
    let row2 = positions[1];
    for(let i = 0; i < 8; i++){
      this.addPiece(i, 7, this.white,row1[i], false);
      this.addPiece(i, 0, this.black,row1[i], false);
      this.addPiece(i, 6, this.white,row2[i], false);
      this.addPiece(i, 1, this.black,row2[i], false);
    }
    PieceActions.setPieces([...this.white.pieces, ...this.black.pieces]);
  }
  
  // Adds piece to the board
  addPiece(x, y, player, type, updateStore = true){
    let piece;
    let tile = this.board[y][x];
    player.pieceId++;
    switch(type){
      case "P":
        piece = new Pawn(player,tile);
        break;
      case "R":
        piece = new Rook(player,tile);
        break;
      case "B":
        piece = new Bishop(player,tile);
        break;
      case "K":
        piece = new Knight(player,tile);
        break;
      case "Q":
        piece = new Queen(player,tile);
        break;
      case "X":
        piece = new King(player,tile);
        break;		
      default:
        piece = null;
        return;
    }
    player.addPiece(piece);
    this.board[y][x].piece = piece;
    if(updateStore){
      PieceActions.addPiece(piece, tile);
    }
  }

  doTileChecks(){
    this.clearTiles();
    // Looks all possible moves
    this.white.checkAllTiles();
    this.black.checkAllTiles();
    // Looks all possible castling moves
    this.white.checkCastlingMoves();
    this.black.checkCastlingMoves();
    // Checks which pieces are protecting their kings (used by AI)
    this.white.findKingProtectors();
    this.black.findKingProtectors();
  }
  
  // Removes move information from all tiles (done before adding new move information)
  clearTiles(){
    for(let i = 0; i < 8; i++){
      for(let j = 0; j < 8; j++){
        this.board[i][j].clear();
      }
    }
  }
  
  // Plays a round, if possible (player must be computer)
  run(){
    if(this.gameActive && this.turn && !this.gamePaused){
      this.activePlayer.chooseAction();
      let choice = this.activePlayer.getAction();
      this.makeTurn(choice[0], choice[1]);
    }
  }

  
  // Makes a turn, if action has been decided 
  // (is used only by computer to simulate player's clicks)
  makeTurn(piece, tile){
    if(piece == null || tile == null){
      return;
    }
    piece.tile.select(this.activePlayer);
    tile.select(this.activePlayer);
  }
  
  gameOver(loser){
    this.gameActive = false;
    if(loser == null){
      RoundStateActions.setGameEnded(true, 'tie');
    }else{
      RoundStateActions.setGameEnded(true, loser.enemy.color);
    }
  }
  
  // Changes turn and does situation checks once a turn has ended
  changeTurn(gameId){
    if(gameId == this.gameId){ // Make sure the game hasn't been reset
      this.doTileChecks();
      this.setActivePlayer(this.activePlayer.enemy);

      if(this.activePlayer.moveTiles.length == 0){
        this.gameOver(this.activePlayer);
        return;
      }

      if(this.activePlayer.color == "white"){
        if(this.round < SettingsStore.state.maxRounds){
          this.setRound(this.round+1);
        }else{
          this.gameOver(null);
          return;
        }
      }
      
      this.turn = true;
      this.run();
    }
  }
  
  // Returns the tile that has a piece with lowest value
  lowestTile(tilesOrPieces, isTile){
    let lowest = 100;
    let tile = tilesOrPieces[0];
    let tiles = isTile ? tilesOrPieces : tilesOrPieces.map((piece) => piece.tile);
    for(let i = 0;i < tiles.length; i++){
      if(!tiles[i].empty() && tiles[i].piece.value < lowest){
        lowest = tiles[i].piece.value;
        tile = tiles[i];
      }
    }
    return tile;
  }
  
}
