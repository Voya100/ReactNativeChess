import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import i18n from 'react-native-i18n';

import { ChessText } from '../../shared/chess-text';
import { ChessHeader } from '../../shared/chess-header';

export class GuidePage extends Component {
  
  render() {
    return (
      <ScrollView style={styles.container}>
        <ChessHeader>{i18n.t('help.' + this.props.id + '.title')}</ChessHeader>
        <ChessText style={styles.text}>{i18n.t('help.' + this.props.id + '.content')}</ChessText>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  text: {
    fontSize: 14,
    flex: 1
  }
});