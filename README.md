Weather App

A React Native app that provides weather information based on city search. It features the ability to search for weather by city, view previous searches, and toggle between light and dark themes. The app utilizes Redux for state management, AsyncStorage for persistent city data, and the OpenWeatherMap and OpenCage API services for fetching weather and city coordinates.

Features

Search for weather by city name.

View weather data including temperature, humidity, and wind speed.

View search history and select a previously searched city.

Toggle between light and dark modes.

Redux Toolkit for efficient state management.

AsyncStorage to persist last searched city.

Requirements

React Native (v0.64 or higher)

Node.js (v14 or higher)

Yarn or npm

React Native CLI

Environment Variables

Create a .env file in the root of your project with the following keys:

REACT_NATIVE_OPENWEATHER_API_KEY=5ce13d67968afe8e61db635add70decf
REACT_NATIVE_OPENCAGE_API_KEY=928226e905344bccbd9c79dcb0adc1b8

Setup Instructions

1. Clone the Repository

git clone <repo-url>
cd weather-app

2. Install Dependencies

yarn install

3. iOS Dependencies (macOS only)

cd ios && pod install && cd ..

4. Start the Metro Bundler

yarn start

Running the App

Android

Make sure an Android emulator is running or an Android device is connected via USB:

yarn android

iOS (macOS only)

Make sure Xcode and an iOS simulator are properly set up:

yarn ios

Project Structure

weather-app/
├── components/              # Reusable components like WeatherCard
├── redux/                   # Redux Toolkit slices and store
│   ├── store.ts
│   ├── weatherSlice.ts
│   ├── themeSlice.ts
│   └── searchHistorySlice.ts
├── screens/                 # Screen components
│   └── HomeScreen.tsx
├── services/                # API-related logic
│   └── weatherService.ts
├── App.tsx                  # Entry point
└── .env                     # Environment variables

Testing

yarn test

Uses Jest and @testing-library/react-native for unit testing.

Author

Harsh Joshi

License

This project is licensed under the MIT License.

