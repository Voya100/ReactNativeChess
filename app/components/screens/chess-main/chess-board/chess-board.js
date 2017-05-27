import React from 'react';
import Reflux from 'reflux';
import { View, StyleSheet } from 'react-native';

import { BoardTile } from './board-tile';
import { BoardPiece } from './board-piece';

import { HumanPlayer } from '../../../../players/human-player';
import { PieceStore } from '../../../../stores/piece-store';
import { BoardStore } from '../../../../stores/board-store';
import { RoundStateStore } from '../../../../stores/round-state-store';
import { SettingsStore } from '../../../../stores/settings-store';

export class ChessBoard extends Reflux.Component {

  constructor(){
    super();
    this.stores = [PieceStore, BoardStore, RoundStateStore, SettingsStore];
    this.storeKeys = ['board', 'pieceLocations', 'game', 'boardReversed'];
  }

  render() {
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
    return this.state.pieceLocations.map(({piece,tile}) => {
      return <BoardPiece piece={piece} tile={tile} boardReversed={this.state.boardReversed} tileSize={this.props.tileSize} 
                         key={piece.id} onPress={() => this.selectTile(tile)} />
    })
  }

  selectTile(tile){
    if(!this.state.game.gamePaused && this.state.game.activePlayer instanceof HumanPlayer){
      tile.select();
    }
  }

}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  }
});