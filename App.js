
import React from 'react';
import {StyleSheet, Text, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tracker from './screen/Tracker';
import user from './screen/user';



const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='user'>
        <Stack.Screen name="Tracker" component={Tracker} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name="user" component={user} options={{ headerShown: false}} ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


 

