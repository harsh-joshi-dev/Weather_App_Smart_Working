import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WeatherData } from '../services/weatherService';

interface WeatherState {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  weather: null,
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    fetchWeatherStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchWeatherSuccess: (state, action: PayloadAction<WeatherData>) => {
      state.loading = false;
      state.weather = action.payload;
    },
    fetchWeatherFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchWeatherStart, fetchWeatherSuccess, fetchWeatherFailure } = weatherSlice.actions;
export default weatherSlice.reducer;
