import React from 'react';
import PropTypes from 'prop-types';

import { ChessText } from './chess-text';

export const ChessHeader = ({headerType, style, children}) =>  {
  let fontSize = 24;
  if(headerType == 2){
    fontSize = 20;
  }
  return (
    <ChessText style={[{fontSize}, style]}>{children}</ChessText>
  );
}

ChessHeader.propTypes = {
  headerType: PropTypes.number,
  style: ChessText.propTypes.style,
  children: PropTypes.node
}

ChessHeader.defaultProps = {
  style: {},
  children: undefined
}

ChessHeader.defaultProps = {
  headerType: 1
}
