import searchHistoryReducer, { addSearchHistory } from './searchHistorySlice';

describe('searchHistorySlice', () => {
  it('should add a new search history item', () => {
    const initialState = { history: [] };

    const action = addSearchHistory({
      city: 'Delhi',
      weather: {
        current: {
          temp: 15,
          feels_like: 14,
          pressure: 1012,
          humidity: 70,
          wind_speed: 5,
          weather: [{ description: 'clear sky', icon: '01d' }]
        },
        daily: [
          {
            dt: 1625563200,
            temp: { day: 25, min: 18, max: 30, night: 22 },
            weather: [{ description: 'clear sky', icon: '01d' }]
          }
        ]
      }
    });

    const newState = searchHistoryReducer(initialState, action);
    expect(newState.history).toHaveLength(1);
    expect(newState.history[0].city).toBe('London');
  });
});
