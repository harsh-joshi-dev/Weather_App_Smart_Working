export interface WeatherCardProps {
    weather: {
        timezone: string;
        current: {
            temp: number;
            weather: { description: string; icon: string }[];
            humidity: number;
            wind_speed: number;
            wind_deg: number;
            wind_gust: number;
            dew_point: number;
            pressure: number;
            visibility: number;
            uvi: number;
            rain: { '1h': number };
        };
        minutely: {
            dt: number;
            temp: number;
            weather: { description: string; icon: string };
        }[];
        daily: {
            dt: number;
            temp: {
                day: number;
                min: number;
                max: number;
            };
            weather: { description: string; icon: string }[];
            summary: string;
        }[];
    };
}
