import React, { Component } from 'react';
import Reflux from 'reflux';
import { StyleSheet,  View } from 'react-native';
import { TabNavigator } from 'react-navigation';

import { ChessMain } from './components/screens/chess-main/chess-main';
import { ChessSettingsView } from './components/screens/chess-settings/chess-settings';
import { ChessStatistics } from './components/screens/chess-statistics/chess-statistics';
import { ChessHelp } from './components/screens/chess-help/chess-help';

import { ChessGame } from './game/chess-game';
import { ChessSettings } from './game/chess-settings';

import { PieceStore } from './stores/piece-store';
import { BoardStore } from './stores/board-store';
import { RoundStateStore, RoundStateActions } from './stores/round-state-store';

import { colors } from './components/colors';

let navigationOptions = {
  headerStyle: {
    backgroundColor: colors.background
  }
}

const App = TabNavigator({
  Main: { screen: ChessMain, navigationOptions },
  Settings: { screen: ChessSettingsView, navigationOptions},
  Statistics: { screen: ChessStatistics, navigationOptions},
  Help: { screen: ChessHelp, navigationOptions},

},{
  cardStyle: {backgroundColor: colors.background},
  headerMode: 'screen',
  tabBarOptions: {
    labelStyle: {
      fontSize: 14
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

export default class ReactNativeChess extends Component {
  constructor(){
    super();
    Reflux.initStore(PieceStore);
    Reflux.initStore(BoardStore);
    Reflux.initStore(RoundStateStore);
    this.settings = new ChessSettings();
    this.game = new ChessGame(this.settings);
    this.game.reset();
    RoundStateActions.setGame(this.game);
  }

  render() {
    return (
      <View style={[styles.container]}>
        <View style={styles.screenContainer}>
          <App ref={nav => { this.navigator = nav; }}></App>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1
  },
  screenContainer: {
    flex: 12
  },
  footer: {
    flex: 2,
    justifyContent: 'center',
    margin: 2
  }
});