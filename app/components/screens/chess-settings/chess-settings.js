import React from 'react';
import Reflux from 'reflux';
import i18n from 'react-native-i18n';
import { StyleSheet, View, Picker, Switch } from 'react-native';

import { SettingsStore, SettingsActions } from '../../../stores/settings-store';

import { ChessText } from '../../shared/chess-text';
import { ChessHeader } from '../../shared/chess-header';
import { SliderWithNumber } from '../../shared/slider-with-number';

export class ChessSettings extends Reflux.Component {
  static navigationOptions = {
    tabBarLabel: () => i18n.t('settings.title'),
  };

  constructor(){
    super();
    this.store = SettingsStore;
		this.updateGameSpeed = this.updateGameSpeed.bind(this);
		this.updateMaxRounds = this.updateMaxRounds.bind(this);
  }

	// tempSpeed and tempMaxRounds need to be initialized to right value after settings are fetchhed from AsyncStorage
	componentDidUpdate(prevProps, prevState){
		if(prevState.gameSpeed != this.state.gameSpeed){
			this.setState({tempSpeed: this.state.gameSpeed});
		}
		if(prevState.maxRounds != this.state.maxRounds){
			this.setState({tempMaxRounds: this.state.maxRounds});
		}
	}

	updateLanguage(language){
		console.log(language);
		SettingsActions.setLanguage(language);
		// A trick to make nav bar update
		this.props.navigation.setParams({language});
	}

	updateGameSpeed(speed){
		SettingsActions.setGameSpeed(speed);
	}

	updateMaxRounds(rounds){
		SettingsActions.setMaxRounds(rounds);
	}

	updateBoardReversed(reversed){
		SettingsActions.setBoardReversed(reversed);
	}

  render() {
    return (
      <View style={styles.container}>
        <ChessHeader style={styles.header}>{i18n.t('settings.generalSettings')}</ChessHeader>
				{this.renderLanguagePicker()}
				{this.renderGameSpeedSlider()}
				{this.renderMaxRoundsSlider()}
				{this.renderBoardReversedSwitch()}
			</View>
    );
  }

	renderLanguagePicker(){		
		let RowContainer = this.renderRowContainer;
		return (
			<RowContainer title={i18n.t('settings.language')} style={{borderTopWidth: 1}}>
				<Picker style={styles.languagePicker} 
								selectedValue={this.state.language} 
								prompt={i18n.t('settings.selectLanguage')}> 
					{this.renderLanguageOptions()}
				</Picker>
			</RowContainer>
		);
	}
	
	renderRowContainer(props){
		return (
			<View style={[styles.optionContainer, props.style]}>
				<ChessText style={styles.text}>{props.title}</ChessText>
				{props.children}
			</View>
		)
	}

  renderLanguageOptions(){
    return Object.keys(i18n.translations).map((language, i) => {
      return <Picker.Item label={ i18n.translations[language].id } value={ language } key={i}/> 
    });
  }

	renderGameSpeedSlider(){
		let RowContainer = this.renderRowContainer;
		return (
			<RowContainer title={i18n.t('settings.gameSpeed')}>
				<SliderWithNumber
					style={styles.slider}
					step={1} 
					minimumValue={1} 
					maximumValue={5} 
					value={this.state.gameSpeed} 
					onSlidingComplete={this.updateGameSpeed}
				/>
			</RowContainer>
		)
	}

	renderMaxRoundsSlider(){
		let RowContainer = this.renderRowContainer;
		return (
			<RowContainer title={i18n.t('settings.maxRounds')}>
				<SliderWithNumber
					style={styles.slider}
					step={25}
					minimumValue={25}
					maximumValue={250}
					value={this.state.maxRounds}
					onSlidingComplete={this.updateMaxRounds}
				/>
			</RowContainer>
		);
	}

	renderBoardReversedSwitch(){
		let RowContainer = this.renderRowContainer;
		return (
			<RowContainer title={i18n.t('settings.reverseBoard')}>
				<Switch value={this.state.boardReversed} onValueChange={this.updateBoardReversed}/>
			</RowContainer>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		margin: 10
	},
	optionContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottomWidth: 1
	},
	header: {
 		margin:5
	},
	text: {
		flex: 3,
		margin: 10
	},
	slider: {
		flex: 5
	},
	languagePicker: {
		flex: 5,
		width: 100
	}
});