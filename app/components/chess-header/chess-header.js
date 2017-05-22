import React from 'react';
import { StyleSheet, View } from 'react-native';
import Reflux from 'reflux';

import { ChessText } from '../shared/chess-text';

import { PieceStore } from '../../stores/piece-store';
import { RoundStateStore } from '../../stores/round-state-store';

export class ChessHeader extends Reflux.Component {

  constructor(){
    super();
    this.stores = [PieceStore, RoundStateStore];
  }

  render() {
    let whiteCount = this.state.pieceIds.map((id) => this.state.pieces[id]).filter((piece) => piece.color == 'white').length;
    let blackCount = this.state.pieceIds.length - whiteCount;
    let currentColor = this.capitalize(this.state.activePlayerColor);

    return (
      <View style={[this.props.style, styles.header]}>
        <View style={styles.textContainer}>
          <ChessText style={styles.headerText}>Chess</ChessText>

          <ChessText>{currentColor}'s turn{'\n'}Round: {this.state.round}</ChessText>

          <View style={styles.pieceCountContainer}>
            <ChessText>White: {'\n'}Black: </ChessText>
            <ChessText>{whiteCount} pieces{'\n'}{blackCount} pieces</ChessText>
          </View>
        </View>
      </View>
    );
  }

  capitalize(string){
    return string[0].toUpperCase() + string.slice(1);
  }
}

const styles = StyleSheet.create({
  headerText: {
    textAlign: 'center',
    fontSize: 24
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  pieceCountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});