import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'react-native-i18n';
import { Switch } from 'react-native';

import { SettingRow } from './setting-row';

export const BoardReversedSwitchRow = ({value, onValueChange}) => (
  <SettingRow title={i18n.t('settings.reverseBoard')}>
    <Switch value={value} onValueChange={onValueChange} />
  </SettingRow>
)

BoardReversedSwitchRow.propTypes = {
  value: PropTypes.bool.isRequired,
  onValueChange: PropTypes.func.isRequired
}
