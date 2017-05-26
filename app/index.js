import React, { Component } from 'react';
import Reflux from 'reflux';
import './i18n/i18n'; // Localisation setup

import { StyleSheet, View } from 'react-native';
import { TabNavigator } from 'react-navigation';

import { ChessMain } from './components/screens/chess-main/chess-main';
import { ChessSettings } from './components/screens/chess-settings/chess-settings';
import { ChessStatistics } from './components/screens/chess-statistics/chess-statistics';
import { ChessHelp } from './components/screens/chess-help/chess-help';

import { ChessGame } from './game/chess-game';

import { PieceStore } from './stores/piece-store';
import { BoardStore } from './stores/board-store';
import { SettingsStore } from './stores/settings-store';
import { RoundStateStore, RoundStateActions } from './stores/round-state-store';

import { colors } from './components/colors';

let navigationOptions = {
  headerStyle: {
    backgroundColor: colors.background
  }
}

const App = TabNavigator({
  Main: { screen: ChessMain, navigationOptions },
  Settings: { screen: ChessSettings, navigationOptions},
  Statistics: { screen: ChessStatistics, navigationOptions},
  Help: { screen: ChessHelp, navigationOptions},

},{
  cardStyle: {backgroundColor: colors.background},
  headerMode: 'screen',
  tabBarOptions: {
    labelStyle: {
      fontSize: 13
    }, 
    tabStyle: {
      paddingLeft: 0,
      paddingRight: 0
    },
    style: {
      backgroundColor: colors.blackTile
    }
  }
});

export default class ReactNativeChess extends Reflux.Component {
  constructor(){
    super();
    Reflux.initStore(PieceStore);
    Reflux.initStore(BoardStore);
    Reflux.initStore(SettingsStore);
    Reflux.initStore(RoundStateStore);
    this.game = new ChessGame();
    this.game.reset();
    RoundStateActions.setGame(this.game);

    this.store = SettingsStore;
  }

  render() {
    return (
      <View style={styles.container}>
        <App screenProps={this.state.language}></App>
      </View>
    );  
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1
  }
});