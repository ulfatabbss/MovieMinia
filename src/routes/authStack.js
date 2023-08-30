import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StatusBar} from 'react-native';
import Signup from '../screens/Signup';
import Signin from '../screens/Signin';
import OnBoarding1 from '../screens/OnBoarding1';
import AccountType from '../screens/AccountType';
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
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
      </Stack.Navigator>
    </>
  );
};

export default AuthStack;
