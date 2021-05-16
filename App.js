import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { render } from 'react-dom';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {Provider} from 'react-redux'
import Login from './Components/Login'
import MyImage from './Components/MyImage'
import Search from './Components/Search'
import Favorites from './Components/Favorites'
import Store from './Store/configureStore'
import Upload from './Components/Upload'

const Tab = createBottomTabNavigator();


export default class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="EPICTURE" component={Login}/>
          <Tab.Screen name="MyImage" component={MyImage}/>
          <Tab.Screen name="Favorites" component={Favorites}/>
          <Tab.Screen name="Search" component={Search}/>
          <Tab.Screen name="Upload" component={Upload}/>
        </Tab.Navigator>
      </NavigationContainer>
      </Provider>
    )
  }
}


