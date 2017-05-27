import { Player } from './player';
import * as _ from 'underscore';

// Returns random value from array
function randVal(array){
	return array[Math.floor(Math.random()*array.length)];
}

export class ComputerPlayer extends Player{

	safeTiles = []; // Tiles where enemy can't reach, but the player can, and movable pieces don't protect the king
	hitTiles = []; // Enemy tiles player can hit
  dangerTiles = []; // Player tiles enemy can hit
	pieceLocations = []; // Tiles where player's pieces are 
	enemyLocations = []; // Tiles where enemy's pieces are
	colors;
	ecolors;

	// Move action that is being considered at the moment - can be turned into piece/tile decision
  moveTile;
  movePiece;
  riskValue;

  constructor(color, game){
    super(color, game);
    this.colors = this.color + "s";
  }

	// Sets next action for the player
  chooseAction(){
    this.chooseTarget();
    //console.log(this.pieceDecision, this.pieceDecision.tile, this.tileDecision);
  }

	// True, if AI has found its decision
  actionDecided(){
    return this.pieceDecision != null && this.tileDecision != null;
  }

  // Sets the move from piece_tile_risk if it is less risky than current move
  // piece_tile_risk: [Piece, Tile, number]
  setMove(piece_tile_risk){
    if(piece_tile_risk[2] < this.riskValue){
      this.movePiece = piece_tile_risk[0];
      this.moveTile = piece_tile_risk[1];
      this.riskValue = piece_tile_risk[2];
    }
  }

	// Sets current move as decision
  setMoveToDecision(){
    this.setAction([this.movePiece, this.moveTile]);
  }
  
	// Computer logic, sets pieceDecision and tileDecision
	chooseTarget(){

    this.chooseActionInit();
		
		// 1. Kill the enemy king, if possible
    this.tryToKillTheKing();
    if(this.actionDecided()){
			console.log("1. Kill the king");
      return;
    }
		
		// 2. Protect the kings (if in danger)
		this.protectTheKings();
    if(this.actionDecided()){
			console.log("2. Protect the king");
      return;
    }
		
		//3. Approach the enemy king (hitting distance, if safe)
    this.tryToGetCloseToEnemyKing();
		if(this.actionDecided()){
			console.log("3. Approach enemy king");
			this.kingChaseCount++;
      return;
    }else{
			this.kingChaseCount = 0;
		}
		
		// 4. Kill enemy or move to safety, if risk is negative. 
    this.tryToMakeARisklessMove();
		if(this.actionDecided()){
			console.log("4. Kill enemy or move to safety");
      return;
    }
		
		// 5. Approach king from further (go to tiles from which king could be approached in priority 3., if safe)
    this.tryToApproachEnemyKing(2);
		if(this.actionDecided()){
			console.log("5. Approach king");
      return;
    }
		
		// 6. Move somewhere with a piece that isn't guarding the king (best option from priority 4)
		if(this.movePiece != null){
			console.log("6. Safe random");
		  this.setMoveToDecision();
      return;
		}
		
		// 7. Move to random location with random piece. This will likely make the king vulnerable.
		console.log("7. Random");
    this.moveToRandom();
	}

  // Resets variables used by chooseAction
  chooseActionInit(){
		this.safeTiles = []; // Tiles where enemy can't reach, but the player can, and movable pieces don't protect the king
		this.hitTiles = []; // Enemy tiles player can hit
		this.dangerTiles = []; // Player tiles enemy can hit
		this.pieceLocations = []; // Tiles where player's pieces are 
		this.enemyLocations = []; // Tiles where enemy's pieces are
    this.ecolors = this.enemy.color + "s";

    this.pieceDecision = null;
    this.tileDecision = null;
		
		// Find current friendly/enemy positions
		for(let i = 0; i < this.pieceCount(); i++){
			this.pieceLocations.push(this.pieces[i].tile);
		}
		for(let i = 0;i < this.enemy.pieceCount(); i++){
			this.enemyLocations.push(this.enemy.pieces[i].tile);
		}
		
		this.safeTiles = _.difference(this.moveTiles, this.enemy.hitTiles);
		this.hitTiles = _.intersection(this.hitTiles, this.enemyLocations);
		this.dangerTiles = _.intersection(this.enemy.moveTiles, this.pieceLocations);
		
		this.moveTile = null;
		this.movePiece = null;
		this.riskValue = 100;
  }

	// Tries to kill enemy king - is always the main priority
	// If multiple kings, first possible choice is selected
  tryToKillTheKing(){
		for(let i = 0; i < this.enemy.kings.length; i++){
      let enemyKing = this.enemy.kings[i];
			if(enemyKing.threats().length > 0){
				console.log("Can kill the king");
				this.setAction([randVal(enemyKing.threats()), enemyKing.tile]);
        return;
			}
		}
  }

	// Checks if a king is in danger and protects the king. Not fully optimized for multiple kings.
  protectTheKings(){
    for(let k = 0; k < this.kings.length; k++){
      let king = this.kings[k];
      if(_.contains(this.dangerTiles, king.tile)){
        console.log("King in danger");
        this.protectKing(king);
      }
    }
  }

	// Tries to protect the king by any means necessary
  protectKing(king){
		this.movePiece = null;
    // 2.1. Move the king, if 2 or more enemies targetting
    if(king.threats.length > 1){
      // King must move (it's impossible to kill/block 2 enemies at the same time)
      this.tryToMovePieceToSafety(king);
			this.setMoveToDecision();

      if(this.actionDecided()){
				console.log("2.1 Move the king");
        return;
      }
      // If no safe moves, there is no way to safe the king - unless the opponent doesn't notice
      // (In this version the game goes on even in check-mate situation)
    }
    // 2.2 Try to kill the enemy threat
    let enemyThreat = randVal(king.tile[this.ecolors]);
    this.tryToKillKingsThreat(enemyThreat);

    if(this.actionDecided()){
			console.log("2.2 Kill enemy threat");
      return;
    }

    // 2.3 Move king to safety (if killing is too risky)
    this.tryToMovePieceToSafety(king, enemyThreat);

    // 2.4 Block the enemy
    this.tryToBlockEnemy(king, enemyThreat);
    
    // Risky kill / moving the king / blocking depends on lowest risk. If none suitable, king will likely die.
    this.setMoveToDecision();
  }

	// Tries to move a given piece to a safe location
  tryToMovePieceToSafety(piece, threat = null){
    let safeMoves = _.intersection(piece.moveTiles,this.safeTiles); // Tiles piece can go to safely
    // Make sure that the piece doesn't go along the enemy's gaze
    if(threat.type != 'pawn' && threat.type != 'knight'){
      safeMoves = safeMoves.filter(function(tile){return !piece.tile.isBetween(tile, threat.tile)})
    }
    if(safeMoves.length > 0){ 
      this.setMove(this.findSmallestRisk([piece],safeMoves)); // Find the best tile to go to (one with an enemy, perhaps)
    }
  }

	// Finds the best way to capture threat piece
  tryToKillKingsThreat(threat){
		// The piece used to capture threat should be able to capture threat and shouldn't leave king vulnerable
    let movePieces = threat.threats().filter((piece) => !piece.protectsKing);
    this.movePiece = null;
    this.riskValue = 100;
    if(movePieces.length > 0){
      console.log("Threat can be killed");
      if(threat.friends().length > 0){ // killing is risky
        this.moveTile = threat.tile;
        let riskInfo = this.findSmallestRisk(movePieces,[this.moveTile]);
        this.movePiece = riskInfo[0];
        this.riskValue = riskInfo[2];
        // Doesn't set action yet, will see later on if there are better options (2.3 or 2.4)
      }else{// Killing is safe
        this.setAction(this.findSmallestRisk(movePieces,[threat.tile]));
      }
    }
  }

	// Tries to protect the piece my moving another piece between it and the threat
  tryToBlockEnemy(pieceToProtect, threat){
    if(threat.type != "knight"){ // Knights can't be blocked
      let tilesBetween = pieceToProtect.tile.tilesBetween(threat.tile);
      for(let i = 0; i < tilesBetween.length; i++){
        let tile = tilesBetween[i];
        let pieces = tile[this.colors].filter(function(piece){return !piece.protectsKing && piece != pieceToProtect});
        if(pieces.length > 0){
          this.setMove(this.findSmallestRisk(pieces,[tile]));
        }
      }
    }
  }

	// Tries to move a piece so close to enemy king that it can capture it the next turn
  tryToGetCloseToEnemyKing(){
    if(this.moveCount <= 4 && this.kingChaseCount <= 6){ // To reduce endless loops
			this.tryToApproachEnemyKing(1);
		}
  }

	// Tries to approach an enemy king thinking distance amount of turns ahead (max 2)
  tryToApproachEnemyKing(distance){
    for(let i = 0; i < this.enemy.kings.length; i++){
				let piece_tile = this.approachTile(this.enemy.kings[i].tile, this.moveTiles, "all", true, distance);
				if(piece_tile.length > 0){
					this.setAction(this.findSmallestRisk(piece_tile,[],1));
          return;
				}
			}
  }

	// Finds least risky move that won't leave king vulnerable
  tryToMakeARisklessMove(){
		this.movePiece = null;
		this.moveTile = null;
		this.riskValue = 100;

		for(let i = 0; i < this.pieces.length; i++){
			let piece = this.pieces[i];
			if(piece.moveTiles.length == 0){
				continue;
			}
      this.setMove(this.findSmallestRisk([piece], piece.moveTiles));
		}		
		// console.log("4. Risk: ",this.riskValue,this.movePiece,this.moveTile);
		
		// Risk is considered to be worth it (or 'riskless') if it's negative - the more negative, the better.
		if(this.riskValue < 0){
			this.setAction([this.movePiece,this.moveTile]);
		}
  }

	// Moves a random piece to a completely random tile (will likely put the king at risk)
  moveToRandom(){
		this.moveTile = randVal(this.moveTiles);
		this.movePiece = randVal(this.moveTile[this.colors]);
		this.setMoveToDecision();
  }

  
	// Goes through array of tiles and pieces and tells which combination is least risky for the piece. If many with same risk, result is randomized.
	// Returns piece, tile and risk. [piece,tile,risk]
	// Often either pieces or tiles is an array with single value
	// Is used by computer logic
	// Setting 1: pieces is 2-dimensional array: [[piece1,tile1],[piece2,tile2],[piece3,tile3],...], tiles is ignored
	findSmallestRisk(pieces, tiles, setting = 0){
		let riskValue = 1000;
		let safest = [];
		for(let i = 0; i < pieces.length; i++){
			let piece = pieces[i];
			if(setting == 1){
				tiles = [piece[1]];
				piece = piece[0];
			}
			for(let j = 0; j < tiles.length; j++){
				let risk = tiles[j].riskValue(piece);
				if(risk <= riskValue){
					if(risk < riskValue){
						safest = [];
					}
					safest.push([piece,tiles[j], risk])
					riskValue = risk;
				}
			}
		}
		// Return random piece/tile combination, with lowest risk
		return randVal(safest);
	}
	
	// Returns an array of possible piece/tile combinations, which could allow a piece to target tile after "depth" amount of turns (max 2).
	// tile: tile (tile to approach), moveTiles: [tile1, tile2, ...], type: "all", "bishop", "rook", "knight", safe: boolean
	// Return: [[piece1, tile1],[piece2, tile2], ...]
	approachTile(tile, moveTiles, type, safe, depth = 1){
		let tiles = [];
		let piece_tile = []; // piece/tile combinations for approaching
		let player = this;
		if(type == 'all' || type =='rook'){
			// Horizontal and vertical, rooks and queens
			tiles = tiles.concat(tile.checkDirections(1,0,8));
			tiles = tiles.concat(tile.checkDirections(0,1,8));
			if(depth == 1){
				tiles = _.intersection(tiles, moveTiles);
			}
			tiles = tiles.filter((tile) => !tile.isFriendOf(player));
			piece_tile = this.approachTileLoop(tiles, piece_tile, ["rook","queen"], moveTiles, "rook", safe, depth);
		}
		if(type == 'all' || type=='bishop'){
			// Diagonal, bishops and queens
			tiles = tile.checkDirections(1,1,8);
			if(depth==1){
				tiles = _.intersection(tiles, this.moveTiles);
			}
			tiles = tiles.filter(function(tile){return !tile.isFriendOf(player);})
			piece_tile = this.approachTileLoop(tiles, piece_tile, ["bishop", "queen"], moveTiles, "bishop", safe, depth);
		}
		if(type == 'all' || type == 'knight'){
			// Knight
			tiles = tile.checkDirections(2,1,1);
			tiles = tiles.concat(tile.checkDirections(1,2,1));
			if(depth == 1){
				tiles = _.intersection(tiles,this.moveTiles);
			}
			tiles = tiles.filter(function(tile){return !tile.isFriendOf(player);})
			piece_tile = this.approachTileLoop(tiles, piece_tile,["knight"], moveTiles, "knight", safe, depth);
		}
		return piece_tile;
	}

	// Helper function for approachTile. Adds appropriate piece/tile combinations to piece_tile array and returns it back
	approachTileLoop(tiles, piece_tile, types, moveTiles, type, safe, depth){
		for(let j = 0; j < tiles.length; j++){
			if((safe && tiles[j][this.enemy.color + "Hits"].length > 0)){
				continue;
			}
			if(depth == 2){ // Approach tiles from which could be approached further
				piece_tile = piece_tile.concat(this.approachTile(tiles[j],moveTiles,type,safe,1));
			}else{
				for(let k = 0; k < tiles[j][this.color + "s"].length; k++){
					let piece = tiles[j][this.color + "s"][k];
					if(piece == this.prevPiece && this.moveCount > 3){ // To reduce endless loops
						continue;
					}
					if(!piece.protectsKing  && _.contains(types, piece.type)){
						piece_tile.push([piece, tiles[j]]);
					}
				}
			}
		}
		return piece_tile;
	}

}