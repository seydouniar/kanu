import { registerRootComponent } from 'expo';
import {LogBox} from 'react-native';
import _ from 'lodash';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately

LogBox.ignoreLogs(['Setting a timer']);
const _console = _.clone(console)
console.warn=message=>{
    if(message.indexOf('Setting a timer')<=-1){
        _console.warn(message);
    }
}
registerRootComponent(App);
