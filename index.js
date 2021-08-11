/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {LogBox} from 'react-native';
import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings(['Warning: ...']);

console.disableYellowBox = true;

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
// LogBox.ignoreAllLogs(); //Ignore all log notifications

AppRegistry.registerComponent(appName, () => App);
