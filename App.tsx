import React from 'react';
import { Provider } from 'react-redux';
// import store from './redux/store'; // Make sure the path is correct
// import HomeScreen from './screens/HomeScreen';
import store from './src/redux/store';
import HomeScreen from './src/screens/HomeScreen';

const App = () => (
  <Provider store={store}>
    <HomeScreen />
  </Provider>
);

export default App;
