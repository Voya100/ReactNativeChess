import Reflux from 'reflux';

export var PieceActions = Reflux.createActions([
  'clearPieces',
  'addPiece',
  'removePiece',
  'movePiece'
]);

export class PieceStore extends Reflux.Store
{
    constructor(){
      super();
      this.state = {pieceIds: [], pieces: {}}; // {id: {type, color, tile}}
      this.listenables = PieceActions;
    }

    clearPieces(){
      this.setState({pieceIds: [], pieces: {}});
    }

    addPiece(id, type, color, tile){
      this.setState({pieceIds: [...this.state.pieceIds, id], pieces: { ...this.state.pieces, [id]: {type, color, tile}}});
    }

    removePiece(idToRemove){
      this.setState({pieceIds: this.state.pieceIds.filter((id) => id !== idToRemove)});
    }

    movePiece(id, tile){
      let piece = {...this.state.pieces[id], tile: tile};
      this.setState({pieces: {...this.state.pieces, [id]: piece}});
    }
}