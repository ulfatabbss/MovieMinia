import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {combineReducers, compose} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducers from './reducers/userReducers';
declare var window: any;

const reducers = combineReducers({
  user: userReducers,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const middleware: any = getDefaultMiddleware({
  serializableCheck: false,
  immutableCheck: false,
});

let enhancedCompose = compose;

if (__DEV__) {
  enhancedCompose = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;
}

export const store = configureStore({
  reducer: {
    root: persistedReducer,
  },
  middleware: enhancedCompose(middleware),
});

export const persistor = persistStore(store);
