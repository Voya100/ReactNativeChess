import React from 'react';
import Reflux from 'reflux';
import i18n from 'react-native-i18n';
import { StyleSheet, View, Picker } from 'react-native';

import { SettingsStore, SettingsActions } from '../../../stores/settings-store';

import { ChessText } from '../../shared/chess-text';
import { ChessHeader } from '../../shared/chess-header';

export class ChessSettings extends Reflux.Component {
  static navigationOptions = {
    tabBarLabel: () => i18n.t('settings.title'),
  };

  constructor(){
    super();
    this.store = SettingsStore;
  }

  renderLanguageOptions(){
    return Object.keys(i18n.translations).map((language, i) => {
      return <Picker.Item label={ i18n.translations[language].id } value={ language } key={i}/> 
    })
  }

	updateLanguage(language){
		console.log(language);
		SettingsActions.setLanguage(language);
		// A trick to make nav bar update
		this.props.navigation.setParams({language});
	}

  render() {

    return (
      <View>
        <ChessHeader style={styles.header}>{i18n.t('settings.generalSettings')}</ChessHeader>
				<View style={styles.optionContainer}>
					<ChessText style={styles.text}>{i18n.t('settings.language')}</ChessText>
					<Picker style={styles.languagePicker} 
									selectedValue={this.state.language} 
									onValueChange={language => this.updateLanguage(language)}
									prompt={i18n.t('settings.selectLanguage')}> 
						{this.renderLanguageOptions()}
					</Picker>
				</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	optionContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottomWidth: 1
	},
	header: {
 		margin: 10
	},
	text: {
		flex: 1,
		fontSize: 18,
		margin: 10
	},
	languagePicker: {
		flex: 1,
		width: 100
	}
});