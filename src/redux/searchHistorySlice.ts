import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WeatherData {
  current: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    wind_speed: number;
    weather: Array<{
      description: string;
      icon: string;
    }>;
  };
  daily: Array<{
    dt: number;
    temp: {
      day: number;
      min: number;
      max: number;
      night: number;
    };
    weather: Array<{
      description: string;
      icon: string;
    }>;
  }>;
}

interface SearchHistoryItem {
  city: string;
  weather: WeatherData;
}

interface SearchHistoryState {
  history: SearchHistoryItem[];
}

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
