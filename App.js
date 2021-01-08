
import React, { Component } from 'react';
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
import LoadingScreen from './src/screens/LoadingScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

import store from './src/store'
import {Provider} from 'react-redux'

import SignUpScreen from './src/screens/SignUpScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const Profile = () => {
  return(
      <Stack.Navigator>
        <Stack.Screen name="profile" component={ProfileScreen} />
        <Stack.Screen name="setting" component={SettingScreen} />
        <Stack.Screen name="registry" component={RegistryScreen} />
      </Stack.Navigator>
    
  )
}

export const Welcome = () =>{
  return (
    <Tab.Navigator lazy={true}
    screenOptions={{tabBarVisible:false}}>
      <Tab.Screen name="loading" component={LoadingScreen} />
      <Tab.Screen name="start" component={WelcomeScreen} />
      <Tab.Screen name="login" component={LoginScreen} />
      <Tab.Screen name="create" component={SignUpScreen} />
    </Tab.Navigator>
  )
}



export const Main = () => {
  return (
    <Tab.Navigator 
    tabBarOptions={
      {
        size:30,
        showLabel:false,
        activeTintColor: 'red',
        inactiveTintColor: 'gray',
        style:{backgroundColor:"#ffff00aa"
       }
        }}
      screenOptions={({route})=>({
        tabBarIcon:({ focused, color, size })=>{
          let iconName;

            if (route.name === 'map') {
              iconName = focused
                ? 'map'
                : 'map-outline';
            } else if (route.name === 'match') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'messages') {
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
            } else if (route.name === 'profile'){
              iconName = focused ? 'person' : 'person-outline'
            }
            return <Ionicons name={iconName} size={size} color={color} />;
        }
      })}>
      <Tab.Screen name="map" component={MapScreen} />
      <Tab.Screen name="match" component={MatchScreen} />
      <Tab.Screen name="messages" component={MessagesScreen} />
      <Tab.Screen name="profile">
        {Profile}
      </Tab.Screen>
    </Tab.Navigator>
  )
}

class App extends Component {
  
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