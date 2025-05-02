import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchHistoryItem, SearchHistoryState } from '../types/WeatherData';

const initialState: SearchHistoryState = {
  history: [],
};

const searchHistorySlice = createSlice({
  name: 'searchHistory',
  initialState,
  reducers: {
    addSearchHistory: (state, action: PayloadAction<SearchHistoryItem>) => {
      state.history.push(action.payload);
    },
  },
});

export const { addSearchHistory } = searchHistorySlice.actions;
export default searchHistorySlice.reducer;
