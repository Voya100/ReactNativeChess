import React from 'react';
import { StyleSheet, View } from 'react-native';
import Reflux from 'reflux';
import i18n from 'react-native-i18n';

import { ChessText } from '../../../shared/chess-text';

import { PieceStore } from '../../../../stores/piece-store';
import { RoundStateStore } from '../../../../stores/round-state-store';

export class ChessMainHeader extends Reflux.Component {

  constructor(){
    super();
    this.stores = [PieceStore, RoundStateStore];
  }

  render(){
    let whiteCount = this.state.pieceLocations.filter(({piece}) => piece.color == 'white').length;
    let blackCount = this.state.pieceLocations.length - whiteCount;
    let currentTurn = this.state.activePlayerColor == 'white' ? i18n.t('game.whitesTurn') : i18n.t('game.blacksTurn');

    return (
      <View style={[this.props.style, styles.header]}>
        <View style={styles.textContainer}>

          <ChessText>{currentTurn}{'\n'}{i18n.t('game.round')}: {this.state.round}</ChessText>

          <View style={styles.pieceCountContainer}>
            <ChessText>{i18n.t('game.white')}: {'\n'}{i18n.t('game.black')}: </ChessText>
            <ChessText>{i18n.t('game.pieces', {count: whiteCount})}{'\n'}{i18n.t('game.pieces', {count: blackCount})}</ChessText>
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
  header: {
    flex: 1,
    justifyContent: 'center',
    margin: 10,
  },
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