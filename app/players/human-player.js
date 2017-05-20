import { Player } from './player';


export class HumanPlayer extends Player{

  constructor(color, game){
    super(color, game);
  }

  // Sets players decision to null (human players choose actions with ui)
  chooseAction(){
    this.setAction([null, null])
  }
}