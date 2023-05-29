import React, {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainStack from './mainStack';
import AuthStack from './authStack';
import { useSelector } from 'react-redux';

const Routes = () => {
  const {isLogin} = useSelector(state => state.root.user);
  return (
    <SafeAreaProvider>
      {isLogin == true ? <MainStack /> : <AuthStack />}
      
    </SafeAreaProvider>
  );
};

export default Routes;
