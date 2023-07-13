import {StyleSheet, Text, View} from 'react-native';
import {StatusBar} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../screens/Dashboard';
import Tabs from '../screens/BottomTabs/Tabs';
import Player from '../screens/Player';
import MovieDiscription from '../screens/MovieDiscription';
import ExpandMovies from '../screens/ExpandMovies';
const Stack = createNativeStackNavigator();
const MainStack = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Player"
          component={Player}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MovieDiscription"
          component={MovieDiscription}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ExpandMovies"
          component={ExpandMovies}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </>
  );
};

export default MainStack;

const styles = StyleSheet.create({});
