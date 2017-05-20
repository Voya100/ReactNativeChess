import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import { BoardTile } from './board-tile/board-tile'

const whiteTileColor = "#e6cfaf";
const blackTileColor = "#9b7b40";
const highlightTileColor = "orange";
const movableTileColor = "yellow";
const enemyTileColor = "rgb(189, 104, 53)";

export class ChessBoard extends Component {


  // Returns color of the tile in tilePosition
  tileColor(tile){
     
    if(tile.highlighted()){
        return highlightTileColor;
    }else if(tile.markedMovable()){
      if(tile.empty()){
        return movableTileColor;
      }else{
        return enemyTileColor;
      }
    }else{
        return (tile.x + tile.y) % 2 == 0 ? blackTileColor : whiteTileColor;
    }
  }

  render() {
    return (
        <View style={this.props.style}>
          {this.props.tiles.map((tileRow, i) => this.renderRow(tileRow, i))}
        </View>
    );
  }

  renderRow(tileRow, index){
    let jsxRow = tileRow.map((tile, i) => this.renderTile(tile, i));
    return <View style={[styles.row, {height: this.props.tileSize}]} key={index}>{jsxRow}</View>;
  }

  renderTile(tile, index){
    let color = this.tileColor(tile);
    return <BoardTile color={color} onPress={() => tile.select()} key={index}/>;
  }

}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  }
});