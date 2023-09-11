import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'react-native';
import Signup from '../screens/Auth/Signup';
import Signin from '../screens/Auth/Signin';
import OnBoarding1 from '../screens/Auth/OnBoarding1';
import AccountType from '../screens/Auth/AccountType';
import { store } from '../redux/store';
import { setIsFirstTime } from '../redux/reducers/userReducers';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const { isFirstTime } = useSelector(state => state.root.user);

  useEffect(() => {
    // Check if the app is opened for the first time
    if (isFirstTime === null) {
      // If 'firstTime' is not in AsyncStorage, it's the first time
      store.dispatch(setIsFirstTime(true));
    } else {
      store.dispatch(setIsFirstTime(false));
    }
  }, []);
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <Stack.Navigator>
        {isFirstTime ? (
          <Stack.Screen
            name="OnBoarding1"
            component={OnBoarding1}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <>
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
          </>
        )}
      </Stack.Navigator>
    </>
  );
};

export default AuthStack;
