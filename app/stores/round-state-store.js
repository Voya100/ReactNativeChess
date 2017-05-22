import Reflux from 'reflux';

export var RoundStateActions = Reflux.createActions([
  'setActivePlayerColor',
  'setRound'
]);

export class RoundStateStore extends Reflux.Store{

  constructor(){
    super();
    this.state = {activePlayerColor: 'white', round: 1};
    this.listenables = RoundStateActions;
  }

  setActivePlayerColor(playerColor){
    this.setState({activePlayerColor: playerColor});
  }

  setRound(round){
    this.setState({round});
  }


}