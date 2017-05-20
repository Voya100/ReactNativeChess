export class ChessSettings {

  defaultPositions = ["RKBXQBKR",
	                    "PPPPPPPP"];

  boardSize = 8;

	positions = this.defaultPositions;
	whiteComputer = false;
	blackComputer = true;
  boardReversed = false;

	// Contains tile positions on the board interface
	// boardTilePositions[y][x][tile.x, tile.y]
  boardTilePositions;

  constructor() { 
		this.changeReversed(false);
  }

	// Changes game mode
	changeMode(mode){
		switch(mode){
		case 0: // Player vs computer
			this.whiteComputer = false;
			this.blackComputer = true;
			break;
		case 1: // Local multiplayer
			this.whiteComputer = false;
			this.blackComputer = false;
			break;
		case 2: // Computer vs computer
			this.whiteComputer = true;
			this.blackComputer = true;
			break;
		}
	}

	setPositions(topRow, bottomRow){
		this.positions = [bottomRow, topRow];
	}
  
	// Changes piece layout back to default
	resetPositions(){
    this.positions = this.defaultPositions;
	}

	// Sets template for tile positions used by ChessBoardComponent
  changeReversed(reversed){
    this.boardReversed = reversed;

		if(reversed){
			this.boardTilePositions = Array(this.boardSize).fill(1).map((x,j) => Array(this.boardSize).fill(1).map((x,i) => [j, 7-i]));
		}else{
			this.boardTilePositions = Array(this.boardSize).fill(1).map((x,j) => Array(this.boardSize).fill(1).map((x,i) => [i, j]));
		}
  }
}