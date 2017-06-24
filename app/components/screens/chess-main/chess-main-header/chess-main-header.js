import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Reflux from 'reflux';
import i18n from 'react-native-i18n';

import { ChessText } from '../../../shared/chess-text';

import { PieceStore } from '../../../../stores/piece-store';
import { RoundStateStore } from '../../../../stores/round-state-store';

import { chessImages } from '../../../../images/images'

export class ChessMainHeader extends Reflux.Component {

  constructor(){
    super();
    this.stores = [PieceStore, RoundStateStore];
  }

  renderPieceCount(color, count){
    return (
      <ChessText>
        <Image style={styles.image} source={chessImages[color + "-pawn-small"]} />  {i18n.t('game.pieces', {count: count})}
      </ChessText>
    )
  }

  render(){
    let whiteCount = this.state.pieceLocations.filter(({piece}) => piece.white).length;
    let blackCount = this.state.pieceLocations.length - whiteCount;
    let currentTurn;
    if(this.state.gameHasEnded){
      currentTurn = i18n.t('game.gameHasEnded');
    }else{
      currentTurn = this.state.activePlayerColor == 'white' ? i18n.t('game.whitesTurn') : i18n.t('game.blacksTurn');
    }

    return (
      <View style={[this.props.style, styles.header]}>
        <View style={styles.textContainer}>
          <View style={styles.turnContainer}>
            <ChessText>{currentTurn}</ChessText>
            <ChessText>{i18n.t('game.round')}: {this.state.round}</ChessText>
          </View>
          <View style={styles.pieceCountContainer}>
            {this.renderPieceCount('white', whiteCount)}
            {this.renderPieceCount('black', blackCount)}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'center',
    margin: 10,
    paddingLeft: 15,
    paddingRight: 15
  },
  headerText: {
    textAlign: 'center',
    fontSize: 24
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  turnContainer: {
    flex: 1
  },
  image: {
    resizeMode: 'contain'
  },
  pieceCountContainer: {
    minWidth: 120
  }
});
