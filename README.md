# Weather App

A React Native app that provides weather information based on city search. It features the ability to search for weather by city, view previous searches, and toggle between light and dark themes. The app utilizes Redux for state management, AsyncStorage for persistent city data, and the OpenWeatherMap and OpenCage API services for fetching weather and city coordinates.

## Features
- Search for weather by city name.
- View weather data, including temperature, humidity, and more.
- View search history and select a previously searched city.
- Toggle between light and dark modes.

## Requirements
- React Native (v0.64+)
- Node.js (v14+)
- Yarn (or npm)

## ENV Data (Sharing for you only to check the data and app)
REACT_NATIVE_OPENWEATHER_API_KEY=5ce13d67968afe8e61db635add70decf
REACT_NATIVE_OPENCAGE_API_KEY=928226e905344bccbd9c79dcb0adc1b8

### Prerequisites

Before you begin, ensure you have the following installed:

1. [Node.js](https://nodejs.org/) - Ensure Node.js is installed on your machine.
2. [Yarn](https://classic.yarnpkg.com/en/docs/install/) - A package manager for Node.js, if not already installed.
3. [React Native CLI](https://reactnative.dev/docs/environment-setup) - To create and manage your React Native projects.

### Installation

1. Clone the repository:

   ```bash
   git clone <repo-url>
   cd weather-app
