import React from 'react';
import Reflux from 'reflux';
import i18n from 'react-native-i18n';
import { View, Text, Image } from 'react-native';
import { TabNavigator, NavigationActions } from 'react-navigation';

import { GuidePage } from './guide-page';
import { colors } from '../../colors';
import { chessImages } from '../../../images/images';

// Returns route path configs for a piece screen
function piecePage(pieceName){
  return {
    screen: () => <GuidePage id={pieceName}/>,
    navigationOptions: {
      tabBarLabel: () => i18n.t('help.' + pieceName + '.title'),
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
  Guide: {
    screen: () => <GuidePage id='guide'/>,
    navigationOptions: {
      tabBarLabel: () => i18n.t('help.guide.title'),
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
      fontSize: 8,
      color: 'black',
      margin: 0
    }, 
    tabStyle: {
      padding: 0,
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

export class ChessHelpScreen extends Reflux.Component {
  static navigationOptions = {
    tabBarLabel: () => i18n.t('help.title'),
  };

  // A trick to update navigation labels when language is changed
  componentDidUpdate(prevProps){
		if(prevProps.screenProps !== this.props.screenProps && this.nav){
      const action = NavigationActions.setParams({params: {language: this.props.screenProps.language}, key: 'Guide'});
		  this.nav.dispatch(action);
		}
	}

  render() {
    return (
      <View style={{flex: 1}}>
        <GuideNavigation screenProps={{language: this.props.screenProps}} ref={(ref) => this.nav = ref}/>
      </View>
    );
  }
}