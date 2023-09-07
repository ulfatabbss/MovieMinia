import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import Signup from '../screens/Auth/Signup';
import Signin from '../screens/Auth/Signin';
import OnBoarding1 from '../screens/Auth/OnBoarding1';
import AccountType from '../screens/Auth/AccountType';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  useEffect(() => {
    // Check AsyncStorage to see if the user has seen the onboarding screen before.
    AsyncStorage.getItem('hasSeenOnboarding').then((value) => {
      if (value !== null && value === 'true') {
        // User has seen the onboarding screen before.
        setHasSeenOnboarding(true);
      }
    });
  }, []);
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <Stack.Navigator>
        {!hasSeenOnboarding && (
          <Stack.Screen
            name="OnBoarding1"
            component={OnBoarding1}
            options={{
              headerShown: false,
            }}
          />
        )}
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
