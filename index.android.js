import { AppRegistry, UIManager } from 'react-native';

import ReactNativeChess from './app/index';

UIManager.setLayoutAnimationEnabledExperimental(true);

AppRegistry.registerComponent('ReactNativeChess', () => ReactNativeChess);
