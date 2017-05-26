import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import i18n from 'react-native-i18n'

import { ChessText } from '../../shared/chess-text'

export class ChessSettings extends Component {
  static navigationOptions = {
    tabBarLabel: () => i18n.t('settings.title'),
  };

  render() {

    return (
      <View>
        <ChessText>Settings{i18n.t('settings.title')}</ChessText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
});