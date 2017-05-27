import Reflux from 'reflux';
import { AsyncStorage } from 'react-native';

import { SettingsStore } from './settings-store';

export var StatisticsActions = Reflux.createActions([
  'addGameResult',
  'resetStatistics'
]);

const storageKey = "@VoyaCodeChess:statistics-";
const initialState = {
  wins: 0,
  losses: 0,
  ties: 0,
  roundSum: 0
};

export class StatisticsStore extends Reflux.Store{

  constructor(){
    super();
    this.state = {
      playerVsComputer: initialState,
      localMultiplayer: initialState,
      computerVsComputer: initialState,
    };
    this.listenables = StatisticsActions;
    this.loadStatistics();
  }

  loadStatistics(){
    this.loadStatistic("playerVsComputer");
    this.loadStatistic("localMultiplayer");
    this.loadStatistic("computerVsComputer");
  }

  loadStatistic(gameMode){
    AsyncStorage.getItem(storageKey + gameMode).then((value) => {
      console.log("statistic", gameMode, value);
      if(value !== null){
        this.setState({[gameMode]: JSON.parse(value)});
      }
    })
  }

  addGameResult(winner, gameRounds){
    let gameMode = this.getGameMode();
    let winType = this.getWinType(winner);
    let statistics = {...this.state[gameMode]};
    statistics[winType] += 1;
    statistics.roundSum += gameRounds;
    this.setState({[gameMode]: statistics});
    AsyncStorage.setItem(storageKey + gameMode, JSON.stringify(statistics));
  }

  getGameMode(){
    let whiteIsComputer = SettingsStore.state.whiteIsComputer;
    let blackIsComputer = SettingsStore.state.blackIsComputer;
    return whiteIsComputer ? 'computerVsComputer' 
        : (blackIsComputer ? 'playerVsComputer' : 'localMultiplayer');
  }

  getWinType(winner){
    if(winner == 'white'){
      return 'wins';
    }else if (winner == 'black'){
      return 'losses';
    }else{
      return 'ties';
    }
  }

  resetStatistics(){
    this.setState({
      playerVsComputer: initialState,
      localMultiplayer: initialState,
      computerVsComputer: initialState 
    });
    AsyncStorage.removeItem(storageKey + "playerVsComputer");
    AsyncStorage.removeItem(storageKey + "localMultiplayer");
    AsyncStorage.removeItem(storageKey + "computerVsComputer");
  }

}