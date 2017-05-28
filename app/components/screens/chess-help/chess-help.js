import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import i18n from 'react-native-i18n';
import { TabNavigator } from 'react-navigation';

import { GuidePage } from './guide-page';
import { colors } from '../../colors';
import { chessImages } from '../../../images/images';


function piecePage(pieceName){
  return {
    screen: () => <GuidePage id={pieceName}/>,
    navigationOptions: {
      tabBarIcon: ({focused}) => {
        let focusedStyle = focused ? {} : {tintColor: 'gray'}
        return <Image source={chessImages['black-' + pieceName]} 
                      resizeMode={'contain'} 
                      style={[{resizeMode: 'contain', height: 40, overflow: 'visible'}, focusedStyle]}/>
      }
    }
  };
}

const GuideNavigation = TabNavigator({
  Ganeral: {
    screen: () => <GuidePage id='general'/>,
    navigationOptions: {
      tabBarLabel: 'Guide',
      tabBarIcon: () => <Text style={{fontSize: 40}}>?</Text>
    }
  },
  Pawn: piecePage('pawn'),
  Rook: piecePage('rook'),
  Knight: piecePage('knight'),
  Bishop: piecePage('bishop'),
  Queen: piecePage('queen'),
  King: piecePage('king'),

},{
  headerMode: 'screen',
  swipeEnabled: false,
  animationEnabled: false,
  tabBarOptions: {
    showIcon: true,
    showLabel: true,
    labelStyle: {
      fontSize: 10,
      color: 'black',
      margin: 0
    }, 
    tabStyle: {
      padding: 2,
      paddingBottom: 5
    },
    iconStyle: {
      height: 40
    },
    style: {
      backgroundColor: colors.button
    },
    indicatorStyle: {
      backgroundColor: 'black'
    }
  }})

export class ChessHelp extends Component {
  static navigationOptions = {
    tabBarLabel: () => i18n.t('help.title'),
  };

  render() {

    return (
      <View style={{flex: 1}}>
        <GuideNavigation/>
      </View>
    );
  }
}