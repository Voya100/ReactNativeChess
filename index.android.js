import { AppRegistry, UIManager } from 'react-native';

import ReactNativeChess from './app/components/app';
import SplashScreen from 'react-native-splash-screen';

UIManager.setLayoutAnimationEnabledExperimental(true);

//SplashScreen.show();

AppRegistry.registerComponent('ReactNativeChess', () => ReactNativeChess);
