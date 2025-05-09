import React from 'react';
import { View, Text, Image } from 'react-native';
import { useAppSelector } from '../redux/hooks';
import { WeatherCardProps } from '../types/WeatherTypes';
import createStyles from '../styles/WeatherCardStyles';

const WeatherCard: React.FC<WeatherCardProps> = React.memo(({ weather, searchedCity }) => {
    const { darkMode } = useAppSelector(state => state.theme);
    const styles = createStyles(darkMode);

    const current = weather.current;
    const description = current.weather[0].description;
    const icon = current.weather[0].icon;
    const time = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });

    return (
        <View style={[styles.card, darkMode && styles.cardDark]}>
            <View style={styles.leftSection}>
                <Text style={[styles.city, darkMode && styles.textWhite]}>
                    {searchedCity}
                </Text>
                <Text style={[styles.timezone, darkMode && styles.textGrey]}>
                    {weather.timezone}
                </Text>
                <Text style={[styles.temp, darkMode && styles.textWhite]}>
                    {current.temp.toFixed(1)}°C
                </Text>
                <Text style={[styles.observed, darkMode && styles.textGrey]}>
                    Observed at {time}
                </Text>
            </View>

            <View style={styles.rightSection}>
                <Image
                    source={{ uri: `https://openweathermap.org/img/wn/${icon}@2x.png` }}
                    style={styles.weatherIcon}
                />
                <Text style={[styles.description, darkMode && styles.textWhite]}>
                    {description}
                </Text>
            </View>
        </View>
    );
});

export default WeatherCard;
