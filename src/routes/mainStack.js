import React from 'react';
import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Tabs from '../screens/BottomTabs/Tabs';
import Player from '../screens/Player';
import MovieDiscription from '../screens/MovieDiscription';
import ExpandMovies from '../screens/ExpandMovies';
import Player1 from '../screens/Player1';
import CustomDrawerContent from '../components/CustomDrawerConten';
import SearchMovie from '../screens/SearchMovie';
import { useSelector } from 'react-redux';
import lightTheme from '../utillis/theme/lightTheme';
import darkTheme from '../utillis/theme/darkTheme';
import { useTheme } from 'react-native-paper';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const MyDrawer = () => {
  const {
    myTheme
  } = useSelector(state => state.root.user);
  const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme); // Get the active theme
  return (
    <Drawer.Navigator screenOptions={{
      headerShown: false,
      drawerStyle: {
        backgroundColor: theme.colors.rightBar,
        width: 200,
        borderRadius: 30
      },
    }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Tabs" component={Tabs} />
    </Drawer.Navigator>
  );
};

const MainStack = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MyDrawer" component={MyDrawer} />
        <Stack.Screen name="Player" component={Player} />
        <Stack.Screen name="MovieDiscription" component={MovieDiscription} />
        <Stack.Screen name="ExpandMovies" component={ExpandMovies} />
        <Stack.Screen name="Player1" component={Player1} />
        <Stack.Screen name="SearchMovie" component={SearchMovie} />

      </Stack.Navigator>
    </>
  );
};

export default MainStack;
