import React, { Component } from 'react';
import i18n from 'react-native-i18n';
import { StyleSheet, Picker } from 'react-native';

import { SettingRow } from './setting-row';

export class LanguagePickerRow extends Component {
  
  render(){
    return (
      <SettingRow title={i18n.t('settings.language')} style={{borderTopWidth: 1}}>
				<Picker style={styles.languagePicker} 
								selectedValue={this.props.selectedValue} 
                onValueChange={this.props.onValueChange}
								prompt={i18n.t('settings.selectLanguage')}> 
					{this.renderLanguageOptions()}
				</Picker>
      </SettingRow>
    )
  }

  
  renderLanguageOptions(){
    return this.props.languageOptions.map((language, i) => {
      return <Picker.Item label={ i18n.translations[language].id } value={ language } key={i}/> 
    });
  }
}

const styles = StyleSheet.create({
	languagePicker: {
		flex: 5,
		width: 100
	}
});