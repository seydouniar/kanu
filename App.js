
import React, { Component } from 'react';
import {ImageBackground,Text, View } from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegistryScreen from './src/screens/RegistryScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingScreen from './src/screens/settingScreen';
import MapScreen from './src/screens/MapScreen';
import MatchScreen from './src/screens/MatchScreen';
import MessagesScreen from './src/screens/MessagesScreen';

import store from './src/store'
import {Provider} from 'react-redux'

import * as Facebook from 'expo-facebook'
import firebase from 'firebase'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Profile = () => {
  return(
    
      <Stack.Navigator>
        <Stack.Screen name="profile" component={ProfileScreen} />
        <Stack.Screen name="registy" component={RegistryScreen} />
        <Stack.Screen name="setting" component={SettingScreen} />
      </Stack.Navigator>
    
  )
}

const Welcome = () =>{
  return (
    <Tab.Navigator lazy={true}
    screenOptions={{tabBarVisible:false}}>
      <Tab.Screen name="start" component={WelcomeScreen} />
      <Tab.Screen name="login" component={LoginScreen} />
      <Tab.Screen name="config" component={Profile} />
    </Tab.Navigator>
  )
}



const Main = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="map" component={MapScreen} />
      <Tab.Screen name="match" component={MatchScreen} />
      <Tab.Screen name="messages" component={MessagesScreen} />
    </Tab.Navigator>
  )
}

class App extends Component {
  async UNSAFE_componentWillMount() {
    await Facebook.initializeAsync({appId:'1264256650620526'});
    firebase.initializeApp({
      apiKey: "AIzaSyATgGWr3xDE4Ri-QoxDf0vAS1VamRLXK3s",
      authDomain: "kanu-d66f8.firebaseapp.com",
      projectId: "kanu-d66f8",
      storageBucket: "kanu-d66f8.appspot.com",
      messagingSenderId: "286528072944",
      appId: "1:286528072944:web:58b3463502f8dca8dc6635",
      measurementId: "G-KQLZFCHT1Y"
    });
  }
  
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer >
          <Tab.Navigator 
          lazy={true}
          screenOptions={{tabBarVisible:false}}
           >
            <Tab.Screen name="welcome" component={Welcome} />
            <Tab.Screen name="main" component={Main} />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;