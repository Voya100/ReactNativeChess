import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import i18n from 'react-native-i18n'

import { ChessText } from '../../shared/chess-text'

export class ChessHelp extends Component {
  static navigationOptions = {
      title: i18n.t('help.title'),
  };

  render() {

    return (
      <View>
        <ChessText>Help</ChessText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
});