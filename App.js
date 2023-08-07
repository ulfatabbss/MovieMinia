import { StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Routes from './src/routes/routes';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store';
import Splash from './src/screens/Splash';
import { LogBox } from 'react-native';
import { ToastProvider } from 'react-native-toast-notifications'
LogBox.ignoreLogs(['Warning: ...']);

LogBox.ignoreAllLogs();
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  if (isLoading) {
    return (
      <Splash />
    );
  }
  return (

    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <ToastProvider successColor="green"
            dangerColor="red"
            warningColor="orange"
            normalColor="gray">
            <NavigationContainer>
              <Routes />
            </NavigationContainer>
          </ToastProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
