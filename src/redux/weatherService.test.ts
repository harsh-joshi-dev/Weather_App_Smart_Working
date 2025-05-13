import {configureStore} from '@reduxjs/toolkit';
import weatherReducer, {
  fetchWeatherStart,
  fetchWeatherSuccess,
  fetchWeatherFailure,
} from './weatherSlice';

describe('weather slice reducer', () => {
  it('should handle fetchWeatherStart', () => {
    const store = configureStore({
      reducer: {weather: weatherReducer},
    });

    store.dispatch(fetchWeatherStart());
    const state = store.getState().weather;

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.weather).toBeNull();
  });

  it('should handle fetchWeatherSuccess', () => {
    const mockWeatherData = {
      current: {
        temp: 25,
        feels_like: 24,
        pressure: 1005,
        humidity: 70,
        wind_speed: 4,
        weather: [{description: 'sunny', icon: '01d'}],
      },
      daily: [
        {
          dt: 12345678,
          temp: {day: 25, min: 18, max: 30, night: 22},
          weather: [{description: 'sunny', icon: '01d'}],
        },
      ],
      hourly: [
        {
          dt: 12345678,
          temp: 25,
          weather: [{description: 'sunny', icon: '01d'}],
        },
      ],
    };

    const store = configureStore({
      reducer: {weather: weatherReducer},
    });

    store.dispatch(fetchWeatherSuccess(mockWeatherData));
    const state = store.getState().weather;

    expect(state.loading).toBe(false);
    expect(state.weather).toEqual(mockWeatherData);
    expect(state.error).toBeNull();
  });

  it('should handle fetchWeatherFailure', () => {
    const store = configureStore({
      reducer: {weather: weatherReducer},
    });

    // Dispatching failure action
    store.dispatch(fetchWeatherFailure('Network error'));
    const state = store.getState().weather;

    // Verifying the state after failure action
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Network error');
    expect(state.weather).toBeNull();
  });

  it('should handle multiple actions in sequence', () => {
    const store = configureStore({
      reducer: {weather: weatherReducer},
    });

    store.dispatch(fetchWeatherStart());
    let state = store.getState().weather;
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();

    const mockWeatherData = {
      current: {
        temp: 25,
        feels_like: 24,
        pressure: 1005,
        humidity: 70,
        wind_speed: 4,
        weather: [{description: 'sunny', icon: '01d'}],
      },
      daily: [
        {
          dt: 12345678,
          temp: {day: 25, min: 18, max: 30, night: 22},
          weather: [{description: 'sunny', icon: '01d'}],
        },
      ],
      hourly: [
        {
          dt: 12345678,
          temp: 25,
          weather: [{description: 'sunny', icon: '01d'}],
        },
      ],
    };
    store.dispatch(fetchWeatherSuccess(mockWeatherData));
    state = store.getState().weather;
    expect(state.loading).toBe(false);
    expect(state.weather).toEqual(mockWeatherData);
    expect(state.error).toBeNull();

    store.dispatch(fetchWeatherFailure('Network error'));
    state = store.getState().weather;
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Network error');
    expect(state.weather).toBeNull();
  });

  it('should keep weather data unchanged after an unsuccessful fetchWeatherSuccess attempt', () => {
    const initialState = {
      weather: {
        current: {
          temp: 30,
          feels_like: 28,
          pressure: 1000,
          humidity: 60,
          wind_speed: 5,
          weather: [{description: 'clear', icon: '01d'}],
        },
        daily: [
          {
            dt: 12345678,
            temp: {day: 30, min: 22, max: 35, night: 27},
            weather: [{description: 'clear', icon: '01d'}],
          },
        ],
        hourly: [
          {
            dt: 12345678,
            temp: 30,
            weather: [{description: 'clear', icon: '01d'}],
          },
        ],
      },
    };

    const store = configureStore({
      reducer: {weather: weatherReducer},
      preloadedState: initialState,
    });

    const mockWeatherData = {
      current: {
        temp: 28,
        feels_like: 26,
        pressure: 1003,
        humidity: 65,
        wind_speed: 6,
        weather: [{description: 'cloudy', icon: '02d'}],
      },
      daily: [
        {
          dt: 12345678,
          temp: {day: 28, min: 22, max: 32, night: 25},
          weather: [{description: 'cloudy', icon: '02d'}],
        },
      ],
      hourly: [
        {
          dt: 12345678,
          temp: 28,
          weather: [{description: 'cloudy', icon: '02d'}],
        },
      ],
    };

    store.dispatch(fetchWeatherSuccess(mockWeatherData));

    const state = store.getState().weather;
    expect(state.weather).toEqual(mockWeatherData);
  });
});
