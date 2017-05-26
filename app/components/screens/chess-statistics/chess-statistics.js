import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import i18n from 'react-native-i18n'

import { ChessText } from '../../shared/chess-text'

export class ChessStatistics extends Component {
  static navigationOptions = {
    tabBarLabel: () => i18n.t('statistics.title'),
  };

  render() {

    return (
      <View>
        <ChessText>Statistics</ChessText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
});