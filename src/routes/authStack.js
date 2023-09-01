import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StatusBar} from 'react-native';
import Signup from '../screens/Signup';
import Signin from '../screens/Signin';
import OnBoarding1 from '../screens/OnBoarding1';
import AccountType from '../screens/AccountType';
import ForgotPassword from '../screens/ForgotPassword';
import {useSelector} from 'react-redux';
import {useTheme} from 'react-native-paper';
import lightTheme from '../utillis/theme/lightTheme';
import darkTheme from '../utillis/theme/darkTheme';
import OTPverification from '../screens/OTPverification';
import ChangePassword from '../screens/ChangePassword';
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  // const {myTheme} = useSelector(state => state.root.user);
  // const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme);
  return (
    <>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        // backgroundColor={theme.colors.background}
        // barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <Stack.Navigator>
        <Stack.Screen
          name="OnBoarding1"
          component={OnBoarding1}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AccountType"
          component={AccountType}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Signin"
          component={Signin}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="OTPverification"
          component={OTPverification}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default AuthStack;
