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
import OTPverification from '../screens/Auth/OtpVerification';
import ChangePassword from '../screens/Auth/ChangePassword';
import UpdatePassword from '../screens/Auth/UpdatePassword';

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
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isFirstTime ? (
          <Stack.Screen name="OnBoarding1" component={OnBoarding1} />
        ) : (
          <>
            <Stack.Screen name="AccountType" component={AccountType} />
            <Stack.Screen name="Signin" component={Signin} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="OTPverification" component={OTPverification} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
          </>
        )}
      </Stack.Navigator>
    </>
  );
};

export default AuthStack;
