import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import i18n from 'react-native-i18n'

import { ChessText } from '../../shared/chess-text'

export class ChessSettings extends Component {
  static navigationOptions = {
      title: i18n.t('settings.title'),
  };

  render() {

    return (
      <View>
        <ChessText>Settings</ChessText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
});