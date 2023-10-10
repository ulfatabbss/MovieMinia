import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Routes from './src/routes/routes';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store';
import { LogBox } from 'react-native';
import mobileAds from 'react-native-google-mobile-ads';
import { useTheme } from 'react-native-paper'; // Import useTheme
import lightTheme from './src/utillis/theme/lightTheme';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
import { MiniPlayerProvider } from './src/components/MiniPlayerContext';
import MiniPlayer from './src/components/MiniPlayer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
const App = () => {
  const theme = useTheme(lightTheme); // Get the active theme
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide()
    }, 2000);
  }, []);

  // Configure the Google Sign-In client ID
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '300565158181-6r9mvusrh44a72jor1hkofdcbdof1d23.apps.googleusercontent.com', // Replace with your Web Client ID
      androidClientId: '300565158181-utbl6omqm9479pfrq1no43uvbd78pt00.apps.googleusercontent.com',
      offlineAccess: false, // Set to true if you need offline access

    }
    )
  }, [])
  mobileAds()
    .initialize()

  return (

    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <MiniPlayerProvider>
              <NavigationContainer theme={theme} >
                <Routes />
              </NavigationContainer>
              <MiniPlayer />
            </MiniPlayerProvider>
          </GestureHandlerRootView>

        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
