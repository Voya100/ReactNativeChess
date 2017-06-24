import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import i18n from 'react-native-i18n';

import { ChessButton } from '../../../shared/chess-button';
import { ChessHeader } from '../../../shared/chess-header';
import { CenteredModal } from '../../../shared/centered-modal';

export class VictoryModal extends Component {

  victoryMessage(){
    let winner = this.props.winner;
    if(winner == 'white' || winner == 'black'){
      return i18n.t('game.victory.' + winner + 'Wins');
    }else{
      return i18n.t('game.victory.itsATie');
    }
  }

  render() {
    return (
      <CenteredModal onRequestClose={this.props.onRequestClose} visible={this.props.visible} style={this.props.style}>
        <ChessHeader headerType={2} style={styles.text}>{this.victoryMessage()}</ChessHeader>
        <ChessButton style={styles.button} onPress={this.props.startNewGame}>{i18n.t('game.newGame')}</ChessButton>
        <ChessButton style={styles.button} onPress={this.props.openChooseModeModal}>{i18n.t('game.victory.changeGameMode')}</ChessButton>
      </CenteredModal>
    );
  }
}

VictoryModal.propTypes = {
  style: CenteredModal.propTypes.style,
  visible: PropTypes.bool.isRequired,
  winner: PropTypes.string.isRequired,
  openChooseModeModal: PropTypes.func.isRequired,
  startNewGame: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired
}

VictoryModal.defaultProps = {
  style: undefined
}


const styles = StyleSheet.create({
  text: {
    textAlign: 'center'
  },
  button: {
    flex: 0,
    margin: 5,
    padding: 10,
    borderRadius: 5,
  }
});
