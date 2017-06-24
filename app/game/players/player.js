// Abstract class
export class Player{
  color;
  game;
  pieceId = 0;
  pieces = [];
  kings = [];
  queens = [];
  rooks = [];
  bishops = [];
  knights = [];
  pawns = [];
  pieceCount(){return this.pieces.length}
  kingCount(){return this.kings.length}

  // Tiles the player can move to on their turn
  moveTiles = [];
  // Tiles the player could hit, if there is an enemy piece
  hitTiles = []; 
  // Tile the player moved from last turn
  prevTile = null; 
  // Piece player moved last turn
  prevPiece = null; 
  // How many times previous piece has been moved back-to-back
  moveCount = 0; 
  kingChaseCount = 0;
  activePiece = null;
  turn = false;
  enemy = null; //Defined after creation

  pieceDecision = null;
  tileDecision = null;

  constructor(color, game){
    this.color = color;
    this.game = game;
    this.pieceId = 0;
  }

  // abstract
  // Logic which sets the piece and tile decisions (if player is computer)
  chooseAction(){}

  setAction(pieceAndTile){
    this.pieceDecision = pieceAndTile[0];
    this.tileDecision = pieceAndTile[1];
  }

  getAction(){
    return [this.pieceDecision, this.tileDecision];
  }

  addPiece(piece){
    this.pieces.push(piece);
    this[piece.type + "s"].push(piece);
  }
  
  // Looks all possible tiles where pieces can move to
  checkAllTiles(){
    this.moveTiles = [];
    this.hitTiles = [];
    for(var i = 0; i < this.pieceCount(); i++){
      this.pieces[i].tileCheck();
    }
  }
  
  // Sets protectsKing value at the beginning of the turn. Needs to be called after both players have done checkAllTiles().
  findKingProtectors(){
    for(var i = 0; i < this.pieceCount(); i++){
      this.pieces[i].protectsKing = this.pieces[i].tile.protectsKing(this);
    }
  }

  // Looks if player can do castling move. Needs to be called after both players have done checkAllTiles().
  checkCastlingMoves(){
    for(let i = 0; i < this.kingCount(); i++){
      this.kings[i].castlingCheck();
    }
  }  
}
