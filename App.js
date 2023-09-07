import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Routes from './src/routes/routes';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store';
import Splash from './src/screens/Splash';
import { LogBox } from 'react-native';
import mobileAds from 'react-native-google-mobile-ads';
import { useTheme } from 'react-native-paper'; // Import useTheme
import lightTheme from './src/utillis/theme/lightTheme';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme(lightTheme); // Get the active theme
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  mobileAds()
    .initialize()
    .then(adapterStatuses => {
      console.log("Initialization complete!");
    });

  if (isLoading) {
    return (
      <Splash />
    );
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer theme={theme} >
            <Routes />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
