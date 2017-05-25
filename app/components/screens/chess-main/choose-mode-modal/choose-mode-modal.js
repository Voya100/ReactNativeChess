import React, { Component } from 'react';
import { StyleSheet, View, Modal, TouchableWithoutFeedback } from 'react-native';
import { ChessButton } from '../../../shared/chess-button';
import { ChessText } from '../../../shared/chess-text';

import { SettingsActions } from '../../../../stores/settings-store';
import { RoundStateStore } from '../../../../stores/round-state-store';

import { colors } from '../../../colors';

export class ChooseModeModal extends Component {

  constructor(){
    super();
  }

  setMode(mode){
    SettingsActions.setGameMode(mode);
    RoundStateStore.state.game.reset();
    this.props.onRequestClose();
  }

  render() {
    // Touchables close modal when pressed outside of the content area
    return (
      <Modal animationType={"fade"} transparent={true} onRequestClose={this.props.onRequestClose} visible={this.props.visible}>
        <TouchableWithoutFeedback onPress={this.props.onRequestClose}>
          <View style={styles.container}>
            <TouchableWithoutFeedback>
              <View style={[this.props.style, styles.modalContent]}>
                <ChessText style={styles.text}>Game mode</ChessText>
                <ChessButton style={styles.button} onPress={() => this.setMode(0)}>Player vs Computer</ChessButton>
                <ChessButton style={styles.button} onPress={() => this.setMode(1)}>Local multiplayer</ChessButton>
                <ChessButton style={styles.button} onPress={() => this.setMode(2)}>Computer vs Computer</ChessButton>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  modalContent: {
    backgroundColor: colors.background,
    borderWidth: 2,
    borderRadius: 15,
    margin: 10,
    padding: 10
  },
  text: {
    fontSize: 24,
    textAlign: 'center'
  },
  button: {
    flex: 0,
    margin: 5,
    padding: 10,
    borderRadius: 5,
  }
});
