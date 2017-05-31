import React, { Component } from 'react';
import i18n from 'react-native-i18n';
import { Switch } from 'react-native';

import { SettingRow } from './setting-row';

export class BoardReversedSwitchRow extends Component {
  
  render(){
    return (
      <SettingRow title={i18n.t('settings.reverseBoard')}>
				<Switch value={this.props.value} onValueChange={this.props.onValueChange}/>
			</SettingRow>
    )
  }
}