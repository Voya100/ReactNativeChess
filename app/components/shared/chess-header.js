import React, { Component } from 'react';

import { ChessText } from './chess-text';

export class ChessHeader extends Component {
  render() {
    let fontSize = 24;
    if(this.props.headerType == 2){
      fontSize = 20;
    }
    return (
				<ChessText style={[{fontSize}, this.props.style]}>{this.props.children}</ChessText>
    );
  }
}
