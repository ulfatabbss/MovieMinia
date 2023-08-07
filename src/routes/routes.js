import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainStack from './mainStack';
import AuthStack from './authStack';
import { useSelector } from 'react-redux';
import LottieView from 'lottie-react-native';
import { View, Text } from 'react-native';
import Loader from '../components/Loader';

const Routes = () => {
  const { isLogin } = useSelector(state => state.root.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a 3-second delay to fetch data from the Redux store
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  })
  if (isLoading) {
    return (
      <Loader />
    );
  }
  return (
    <SafeAreaProvider>
      {isLogin == true ? <MainStack /> : <AuthStack />}
    </SafeAreaProvider>
  );
};

export default Routes;
