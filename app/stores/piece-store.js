import Reflux from 'reflux';

export var PieceActions = Reflux.createActions([
  'clearPieces',
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
      this.setState({pieceIds: [], pieceLocations: {}});
    }

    addPiece(piece, tile){
      let pieceLocation = {piece, tile};
      this.pieceIds.push(piece.id);
      this.pieceLocationsMap[piece.id] = pieceLocation;
      this.setState({pieceLocations: [...this.state.pieceLocations, pieceLocation]});
    }

    removePiece(piece){
      this.pieceIds = this.pieceIds.filter((id) => id !== piece.id);
      this.pieceLocationsMap[piece.id] = undefined;
      this.setState({pieceLocations: this.pieceLocations()});
    }

    movePiece(piece, tile){
      this.pieceLocationsMap[piece.id] = {piece, tile};
      this.setState({pieceLocations: this.pieceLocations()});
    }

    pieceLocations(){
      return this.pieceIds.map(id => this.pieceLocationsMap[id]);
    }
}