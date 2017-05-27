import Reflux from 'reflux';
import i18n from 'react-native-i18n'

export var SettingsActions = Reflux.createActions([
  'setLanguage',
  'setGameMode',
  'setPieceLocations',
  'resetPiecePositions',
  'setGameSpeed',
  'setMaxRounds'
]);

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
      language: i18n.locale.substr(0, 2)
    };
    this.listenables = SettingsActions;
  }

  setLanguage(language){
    i18n.locale = language;
    this.setState({language});
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
    this.setState({piecePositions: [row1, row2]});
  }

  resetPiecePositions(){
    this.setState({piecePositions: defaultPiecePositions});
  }

  setGameSpeed(gameSpeed){
    this.setState({gameSpeed})
  }

  setMaxRounds(maxRounds){
    this.setState({maxRounds})
  }

}