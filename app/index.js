import React, { Component } from 'react';
import Reflux from 'reflux';
import { StyleSheet,  View } from 'react-native';
import { StackNavigator, StackRouter, NavigationActions } from 'react-navigation';

import { ChessMain } from './components/screens/chess-main/chess-main';
import { ChessSettingsView } from './components/screens/chess-settings/chess-settings';
import { ChessFooter } from './components/chess-footer/chess-footer';

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

const App = StackNavigator({
  Main: { screen: ChessMain, navigationOptions },
  Settings: { screen: ChessSettingsView, navigationOptions}
},{
  cardStyle: {backgroundColor: colors.background},
  headerMode: 'screen'
})

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
    this.route = 'Main';
    this.navigate = this.navigate.bind(this);
  }

  navigate(routeName){
    let action;
    console.log(routeName);
    if(routeName == 'Main' && this.route == 'Main'){
      return;
    }else if(routeName == 'Main' || routeName == this.route){
      action = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Main'})]
      })
      this.route = 'Main';
    }else{
      action = NavigationActions.navigate({
        routeName
      })
      this.route = routeName;
    }
    
    this.navigator.dispatch(action);
  }

  render() {
    return (
      <View style={[styles.container]}>
        <View style={styles.screenContainer}>
          <App ref={nav => { this.navigator = nav; }}></App>
        </View>
        <ChessFooter style={styles.footer} navigate={this.navigate}></ChessFooter>
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