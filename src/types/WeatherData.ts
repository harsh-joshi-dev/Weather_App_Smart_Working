export interface WeatherData {
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
  }
  
  export interface SearchHistoryItem {
    city: string;
    weather: WeatherData;
  }
  
  export interface SearchHistoryState {
    history: SearchHistoryItem[];
  }
  