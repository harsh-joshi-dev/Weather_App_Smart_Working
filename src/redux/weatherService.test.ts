import { configureStore } from '@reduxjs/toolkit';
import weatherReducer, {
  fetchWeatherStart,
  fetchWeatherSuccess,
  fetchWeatherFailure,
} from './weatherSlice';

describe('weather slice reducer', () => {
  it('should handle fetchWeatherStart', () => {
    const store = configureStore({
      reducer: { weather: weatherReducer },
    });

    store.dispatch(fetchWeatherStart());
    const state = store.getState().weather;

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchWeatherSuccess', () => {
    const mockWeatherData = {
      current: {
        temp: 25,
        feels_like: 24,
        pressure: 1005,
        humidity: 70,
        wind_speed: 4,
        weather: [{ description: 'sunny', icon: '01d' }],
      },
      daily: [
        {
          dt: 12345678,
          temp: { day: 25, min: 18, max: 30, night: 22 },
          weather: [{ description: 'sunny', icon: '01d' }],
        },
      ],
    };

    const store = configureStore({
      reducer: { weather: weatherReducer },
    });

    store.dispatch(fetchWeatherSuccess(mockWeatherData));
    const state = store.getState().weather;

    expect(state.loading).toBe(false);
    expect(state.weather).toEqual(mockWeatherData);
    expect(state.error).toBeNull();
  });

  it('should handle fetchWeatherFailure', () => {
    const store = configureStore({
      reducer: { weather: weatherReducer },
    });

    store.dispatch(fetchWeatherFailure('Network error'));
    const state = store.getState().weather;

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Network error');
    expect(state.weather).toBeNull();
  });
});
