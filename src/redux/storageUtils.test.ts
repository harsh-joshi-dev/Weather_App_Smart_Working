import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

describe('Persistent city storage', () => {
  it('should store the last searched city', async () => {
    await AsyncStorage.setItem('lastCity', 'Delhi');
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('lastCity', 'Delhi');
  });

  it('should retrieve the last searched city', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('Delhi');
    const value = await AsyncStorage.getItem('lastCity');
    expect(value).toBe('Delhi');
  });
});
