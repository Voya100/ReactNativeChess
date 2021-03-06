import Reflux from 'reflux';
import { StatisticsActions } from './statistics-store';

export const RoundStateActions = Reflux.createActions([
  'setActivePlayerColor',
  'setRound',
  'setGame',
  'setGameEnded',
  'setMainIsOpen'
]);

export class RoundStateStore extends Reflux.Store{

  constructor(){
    super();
    this.state = {activePlayerColor: 'white', round: 1, game: null, gameHasEnded: false, winner: '', mainIsOpen: true};
    this.listenables = RoundStateActions;
  }

  setActivePlayerColor(playerColor){
    this.setState({activePlayerColor: playerColor});
  }

  setRound(round){
    this.setState({round});
  }

  // Game is mutable - is only set at init (not used in rendering)
  setGame(game){
    this.setState({game});
  }

  setGameEnded(gameHasEnded, winner){
    this.setState({gameHasEnded, winner});
    if(gameHasEnded){
      StatisticsActions.addGameResult(winner, this.state.round);
    }
  }

  // Tells whether main screen is open or not
  setMainIsOpen(mainIsOpen){
    this.setState({mainIsOpen})
  }

}
