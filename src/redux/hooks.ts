import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// src/redux/weatherSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import weatherService, { getCoordsByCity } from '../services/weatherService';
// import { getCoordsByCity } from '../utils/getCoordsByCity';

interface WeatherState {
  weather: any;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  weather: null,
  loading: false,
  error: null,
};

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city: string, thunkAPI) => {
    try {
      return await getCoordsByCity(city);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWeather.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.weather = action.payload;
        state.loading = false;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export default weatherSlice.reducer;