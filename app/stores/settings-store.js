import Reflux from 'reflux';
import { AsyncStorage } from 'react-native';
import i18n from 'react-native-i18n';

export var SettingsActions = Reflux.createActions([
  'loadSettings',
  'setLanguage',
  'setGameMode',
  'setPiecePositions',
  'resetPiecePositions',
  'setGameSpeed',
  'setMaxRounds',
  'setBoardReversed',
  'saveSettings'
]);

const storageKey = "@VoyaCodeChess:settings";
const defaultPiecePositions = ["RKBXQBKR",
	                             "PPPPPPPP"];

export class SettingsStore extends Reflux.Store{

  constructor(){
    super();
    this.state = {
      whiteIsComputer: false, 
      blackIsComputer: true, 
      piecePositions: defaultPiecePositions,
      gameSpeed: 1,
      maxRounds: 150,
      language: i18n.locale.substr(0, 2),
      boardReversed: false
    };
    this.listenables = SettingsActions;
  }

  loadSettings(callback){
    AsyncStorage.getItem(storageKey).then((value) => {
      console.log("settings", value);
      if(value !== null){
        let settings = JSON.parse(value);
        i18n.locale = settings.language || i18n.locale;
        this.setState(settings);
      }
      callback();
      return true;
    }).catch((error) => {
      console.log(error);
      callback();
    })
  }

  saveSettings(changedSettings){
    console.log("Saving settings");
    this.setState(changedSettings);
    // game mode shouldn't be saved to memory (should always use default)
    AsyncStorage.setItem(storageKey, JSON.stringify({...this.state, whiteIsComputer: undefined, blackIsComputer: undefined}));
  }

  setLanguage(language){
    i18n.locale = language;
    this.saveSettings({language});
  }
  
	// Changes game mode
	setGameMode(modeCode){
		switch(modeCode){
      case 0: // Player vs computer
        this.setState({whiteIsComputer: false, blackIsComputer: true});
        break;
      case 1: // Local multiplayer
        this.setState({whiteIsComputer: false, blackIsComputer: false});
        break;
      case 2: // Computer vs computer
        this.setState({whiteIsComputer: true, blackIsComputer: true});
        break;
      }
	}

  setPiecePositions(row1, row2){
   this.saveSettings({piecePositions: [row1, row2]});
  }

  resetPiecePositions(){
    this.saveSettings({piecePositions: defaultPiecePositions});
  }

  setGameSpeed(gameSpeed){
    this.saveSettings({gameSpeed})
  }

  setMaxRounds(maxRounds){
    this.saveSettings({maxRounds})
  }

  setBoardReversed(boardReversed){
    this.saveSettings({boardReversed})
  }

}