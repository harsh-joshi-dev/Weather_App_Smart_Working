import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import weatherReducer from './weatherSlice';
import themeReducer from './themeSlice';
import searchHistoryReducer from './searchHistorySlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['weather', 'theme', 'searchHistory'],
};

const rootReducer = combineReducers({
  weather: weatherReducer,
  theme: themeReducer,
  searchHistory: searchHistoryReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export const persistor = persistStore(store);
