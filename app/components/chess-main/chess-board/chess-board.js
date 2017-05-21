import React from 'react';
import Reflux from 'reflux';
import { View, StyleSheet } from 'react-native';

import { BoardTile } from './board-tile';
import { BoardPiece } from './board-piece';

import { HumanPlayer } from '../../../players/human-player';
import { PieceStore } from '../../../stores/piece-store';
import { BoardStore } from '../../../stores/board-store';

export class ChessBoard extends Reflux.Component {

  constructor(){
    super();
    this.stores = [PieceStore, BoardStore];
  }

  render() {
    console.log("render");
    return (
        <View style={this.props.style}>
          {this.renderBoard()}
          {this.renderPieces()}
        </View>
    );
  }

  renderBoard(){
    return this.state.board.map((tileRow, i) => this.renderRow(tileRow, i));
  }

  renderRow(tileRow, index){
    let jsxRow = tileRow.map((tile, i) => this.renderTile(tile, i));
    return <View style={[styles.row, {height: this.props.tileSize}]} key={index}>{jsxRow}</View>;
  }

  renderTile(tileData, index){
    return <BoardTile color={tileData.color} tile={tileData.tile} onPress={() => this.selectTile(tileData.tile)} key={index}/>;
  }

  renderPieces(){
    console.log("Render begin")
    return this.state.pieceIds.map((pieceId) => {
      let piece = this.state.pieces[pieceId];
      return <BoardPiece piece={piece} boardReversed={this.state.reversed} tileSize={this.props.tileSize} 
                         key={pieceId} onPress={() => this.selectTile(piece.tile)} />
    })
  }

  selectTile(tile){
    if(!this.props.game.gamePaused && this.props.game.activePlayer instanceof HumanPlayer){
      tile.select();
    }
  }

}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  }
});