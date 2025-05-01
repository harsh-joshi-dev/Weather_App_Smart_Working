// src/services/weatherService.ts

interface WeatherData {
  current: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    wind_speed: number;
    weather: Array<{
      description: string;
      icon: string;
    }>;
  };
  daily: Array<{
    dt: number;
    temp: {
      day: number;
      min: number;
      max: number;
      night: number;
    };
    weather: Array<{
      description: string;
      icon: string;
    }>;
  }>;
  hourly: Array<{
    dt: number;
    temp: number;
    weather: Array<{
      description: string;
      icon: string;
    }>;
  }>;
}

interface CityCoords {
  lat: number;
  lon: number;
  name: string;
}

export const getCoordsByCity = async (city: string): Promise<CityCoords> => {
  const API_KEY = '928226e905344bccbd9c79dcb0adc1b8';
  const query = encodeURIComponent(city);

  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${API_KEY}&language=en`
  );

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error('City not found');
  }

  const best = data.results[0];

  return {
    lat: best.geometry.lat,
    lon: best.geometry.lng,
    name: best.formatted,
  };
};

export const getWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  const API_KEY = '5ce13d67968afe8e61db635add70decf'; // Use environment variable for API key
  const exclude = 'minutely'; // Exclude parts you don't need
  console.log('lat:::',lat);
  console.log('lon:::',lon);
  console.log(':::>>>>', `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${API_KEY}`);
  try {
    const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&units=metric&appid=${API_KEY}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Weather data not found');
    }

    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Failed to fetch weather data');
  }
};
