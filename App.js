
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
import EditScreen from './src/screens/EditScreen';
import SingleMessageScreen from './src/screens/SingleMessageScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


export const Welcome = () =>{
  return (
    <Tab.Navigator screenOptions={{tabBarVisible:false}}>
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
      <Tab.Screen name="profile" component={ProfileScreen} />
        
    </Tab.Navigator>
  )
}

class App extends Component {
  constructor(){
    super();
    console.ignoredYellowBox = ['Setting a timer'];
  }
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer >
          <Stack.Navigator >
            <Stack.Screen name="welcome" component={Welcome} options={ {headerShown: false}} />
            <Stack.Screen name="main" component={Main} options={ {headerShown: false}} />
            <Stack.Screen name="setting" component={SettingScreen} />
            <Stack.Screen name="registry" component={RegistryScreen} />
            <Stack.Screen name="edit" component={EditScreen}/>
            <Stack.Screen name="singlemsg" component={SingleMessageScreen} options={ {headerShown: false}}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;