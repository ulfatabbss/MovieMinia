import { StyleSheet } from 'react-native';
import { StatusBar } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from '../screens/BottomTabs/Tabs';
import Player from '../screens/Player';
import MovieDiscription from '../screens/MovieDiscription';
import ExpandMovies from '../screens/ExpandMovies';
import Player1 from '../screens/Player1';
const Stack = createNativeStackNavigator();
const MainStack = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Tabs"
          component={Tabs}

        />
        <Stack.Screen
          name="Player"
          component={Player}

        />
        <Stack.Screen
          name="MovieDiscription"
          component={MovieDiscription}
        />
        <Stack.Screen
          name="ExpandMovies"
          component={ExpandMovies}
        />
        <Stack.Screen
          name="Player1"
          component={Player1}
        />
      </Stack.Navigator>
    </>
  );
};

export default MainStack;

const styles = StyleSheet.create({});
