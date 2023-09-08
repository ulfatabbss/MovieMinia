import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'react-native';
import Signup from '../screens/Auth/Signup';
import Signin from '../screens/Auth/Signin';
import OnBoarding1 from '../screens/Auth/OnBoarding1';
import AccountType from '../screens/Auth/AccountType';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const [isFirstTime, setIsFirstTime] = useState(null);
  useEffect(() => {
    // Check if the app is opened for the first time
    AsyncStorage.getItem('firstTime').then((value) => {
      if (value === null) {
        // If 'firstTime' is not in AsyncStorage, it's the first time
        setIsFirstTime(true);

        // Store that it's not the first time
        AsyncStorage.setItem('firstTime', 'false');
      } else {
        setIsFirstTime(false);
      }
    });
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
