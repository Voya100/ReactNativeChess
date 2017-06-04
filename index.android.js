import { AppRegistry, UIManager } from 'react-native';

import ReactNativeChess from './app/components/app';

UIManager.setLayoutAnimationEnabledExperimental(true);


AppRegistry.registerComponent('ReactNativeChess', () => ReactNativeChess);
