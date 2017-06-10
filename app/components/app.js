import React from 'react';
import Reflux from 'reflux';
import '../i18n/i18n'; // Localisation setup

import { StyleSheet, View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';

import { ChessMainScreen } from './screens/chess-main/chess-main-screen';
import { ChessSettingsScreen } from './screens/chess-settings/chess-settings-screen';
import { ChessStatisticsScreen } from './screens/chess-statistics/chess-statistics-screen';
import { ChessHelpScreen } from './screens/chess-help/chess-help-screen';

import { ChessGame } from '../game/chess-game';

import { PieceStore } from '../stores/piece-store';
import { BoardStore } from '../stores/board-store';
import { SettingsStore, SettingsActions } from '../stores/settings-store';
import { StatisticsStore } from '../stores/statistics-store';
import { RoundStateStore, RoundStateActions } from '../stores/round-state-store';

import { colors } from './colors';

let navigationOptions = {
  headerStyle: {
    backgroundColor: colors.background
  }
}

const AppNavigation = TabNavigator({
  Main: { screen: ChessMainScreen, navigationOptions },
  Settings: { screen: ChessSettingsScreen, navigationOptions},
  Statistics: { screen: ChessStatisticsScreen, navigationOptions},
  Help: { screen: ChessHelpScreen, navigationOptions},

},{
  cardStyle: {backgroundColor: colors.background},
  headerMode: 'screen',
  swipeEnabled: false,
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
    Reflux.initStore(SettingsStore);
    Reflux.initStore(StatisticsStore);
    Reflux.initStore(PieceStore);
    Reflux.initStore(BoardStore);
    Reflux.initStore(RoundStateStore);
    this.game = new ChessGame();
    RoundStateActions.setGame(this.game);

    // Route is saved in mutable structure for performance reasons (it shouldn't cause rerendering)
    this.route = { activeRoute: 'Main' };
    this.setRoute = this.setRoute.bind(this);

    this.store = SettingsStore;
  }

  // Settings should be loaded when app is launched, after which game can be launched
  // Splashscreen is hidden after all this is complete
  componentDidMount(){
    SettingsActions.loadSettings(()=> {
      this.game.reset();
      SplashScreen.hide();
    });
  }

  // Tabs aren't unmounted when they are changed, and navigator doesn't tell them if they are activated
  // Main screen can run game in background, but it needs to know whether it's active and when that changes
  // This is why it is saved to the store
  setRoute(prevState, currentState){
    if(currentState){
      RoundStateActions.setMainIsOpen(currentState.routes[currentState.index].routeName == 'Main');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <AppNavigation screenProps={{language: this.state.language}} onNavigationStateChange={this.setRoute}/>
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