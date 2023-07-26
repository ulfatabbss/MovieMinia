import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StatusBar } from 'react-native';
import Signup from '../screens/Signup';
import Signin from '../screens/Signin';
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <Stack.Navigator>
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
