import Reflux from 'reflux';

export var PieceActions = Reflux.createActions([
  'clearPieces',
  'setPieces',
  'addPiece',
  'removePiece',
  'movePiece'
]);

// Contains pieces that are on the board and their locations (tile)

export class PieceStore extends Reflux.Store
{
    constructor(){
      super();
      this.pieceIds = [];
      this.pieceLocationsMap = {}; // {id: {piece, tile}}
      this.state = {pieceLocations: []}; 
      this.listenables = PieceActions;
    }

    clearPieces(){
      this.pieceIds = [];
      this.pieceLocationsMap = {};
      this.setState({pieceLocations: []});
    }

    setPieces(pieces){
      this.pieceLocationsMap = {};
      this.pieceIds = [];
      let pieceLocations = pieces.map((piece) => {
        let pieceLocation = {piece, tile: piece.tile};
        this.pieceLocationsMap[piece.id] = pieceLocation;
        this.pieceIds.push(piece.id);
        return pieceLocation;
      })
      this.setState({pieceLocations});
    }

    addPiece(piece, tile){
      let pieceLocation = {piece, tile};
      this.pieceIds.push(piece.id);
      this.pieceLocationsMap[piece.id] = pieceLocation;
      this.setState(prevState => ({pieceLocations: prevState.pieceLocations.concat(pieceLocation)}));
    }

    removePiece(piece){
      this.pieceIds = this.pieceIds.filter((id) => id !== piece.id);
      this.setState({pieceLocations: this.pieceLocations()});
      this.pieceLocationsMap[piece.id] = undefined;
    }

    movePiece(piece, tile){
      this.pieceLocationsMap[piece.id] = {piece, tile};
      this.setState({pieceLocations: this.pieceLocations()});
    }

    pieceLocations(){
      return this.pieceIds.map(id => this.pieceLocationsMap[id]);
    }
}