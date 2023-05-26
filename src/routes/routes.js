import React, {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainStack from './mainStack';
import AuthStack from './authStack';
const Routes = () => {
  return (
    <SafeAreaProvider>
      {/* {isLogin == true ? <MainStack /> : <AuthStack />} */}
      <AuthStack/>
    </SafeAreaProvider>
  );
};

export default Routes;
