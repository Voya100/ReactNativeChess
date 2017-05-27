import React from 'react';
import Reflux from 'reflux';
import { StyleSheet, View } from 'react-native';
import i18n from 'react-native-i18n'

import { ChessText } from '../../shared/chess-text';
import { ChessHeader } from '../../shared/chess-header';
import { ChessButton } from '../../shared/chess-button';
import { StatisticsResetModal } from './statistics-reset-modal';

import { StatisticsStore, StatisticsActions } from '../../../stores/statistics-store';

export class ChessStatistics extends Reflux.Component {
  static navigationOptions = {
    tabBarLabel: () => i18n.t('statistics.title'),
  };

  constructor(){
    super();
    this.store = StatisticsStore;
    this.state = {resetModalVisible: false};
    this.openResetModal = this.openResetModal.bind(this);
    this.closeResetModal = this.closeResetModal.bind(this);
    this.eraseStatistics = this.eraseStatistics.bind(this);
  }

  openResetModal(){
    this.setState({resetModalVisible: true});
  }

  closeResetModal(){
    this.setState({resetModalVisible: false});
  }

  eraseStatistics(){
    StatisticsActions.resetStatistics();
    this.closeResetModal();
  }

  render() {
    return (
      <View style={styles.container}>
        <ChessHeader>{i18n.t('statistics.title')}</ChessHeader>
        {this.renderStatsOfGameMode('playerVsComputer')}
        {this.renderStatsOfGameMode('localMultiplayer')}
        {this.renderStatsOfGameMode('computerVsComputer')}
        <ChessButton style={styles.button} onPress={this.openResetModal}>{i18n.t('statistics.resetStatistics')}</ChessButton>

        <StatisticsResetModal 
          visible={this.state.resetModalVisible} 
          onRequestClose={this.closeResetModal} 
          eraseStatistics={this.eraseStatistics}
        />
      </View>
    );
  }
  
  renderStatsOfGameMode(mode){
    let header = i18n.t('game.gameMode.' + mode);
    let stats = this.state[mode];
    let gameSum = stats.wins + stats.losses + stats.ties;
    let roundAverage = gameSum == 0 ? 0 : Math.round(10*stats.roundSum / gameSum)/10;
    return (
      <View style={styles.gameModeContainer}>
        <ChessHeader headerType={2}>{header}</ChessHeader>
        {this.renderDataRow('wins', stats.wins + this.percentage(stats.wins, gameSum))}
        {this.renderDataRow('losses', stats.losses + this.percentage(stats.losses, gameSum))}
        {this.renderDataRow('ties', stats.ties+ this.percentage(stats.ties, gameSum))}
        {this.renderDataRow('roundAverage', roundAverage)}        
      </View>
    )
  }

  renderDataRow(name, value){
    return <ChessText>{i18n.t('statistics.' + name)}: {value}</ChessText>
  }

  // Returns percentage in brackets (or empty string, if percentage is 0/infinite)
  percentage(value, max){
    let percentage = Math.floor((value / max)*100);
    return max*value == 0 ? '' : ' (' + percentage + ' %)';
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1
  },
  gameModeContainer: {
    marginTop: 10
  },
  button: {
    flex: 0,
    margin: 15,
    padding: 10,
    borderRadius: 5,
  }
});