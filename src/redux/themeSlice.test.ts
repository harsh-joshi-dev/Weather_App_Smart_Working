import themeReducer, { setTheme } from './themeSlice';

describe('themeSlice', () => {
  it('should return the initial state', () => {
    expect(themeReducer(undefined, { type: '@@INIT' })).toEqual({
      darkMode: false,
    });
  });

  it('should set darkMode to true', () => {
    const initialState = { darkMode: false };
    const nextState = themeReducer(initialState, setTheme(true));
    expect(nextState.darkMode).toBe(true);
  });

  it('should set darkMode to false', () => {
    const initialState = { darkMode: true };
    const nextState = themeReducer(initialState, setTheme(false));
    expect(nextState.darkMode).toBe(false);
  });
});
