import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice';
import searchHistoryReducer from './searchHistorySlice';
import themeReducer from './themeSlice';

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    searchHistory: searchHistoryReducer,
    theme: themeReducer,
  },
});

export default store;
