import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useAppSelector } from '../redux/hooks';
import { WeatherCardProps } from '../types/WeatherTypes';
import WeatherComponentStyles from '../styles/WeatherCardStyles';

const WeatherCard: React.FC<WeatherCardProps> = React.memo(({ weather }) => {
    const { darkMode } = useAppSelector(state => state.theme);
    const styles = WeatherComponentStyles(darkMode);
    
    return (
        <ScrollView style={[styles.card, darkMode && styles.darkCard]}>
            <Text style={[styles.city, darkMode && styles.darkText]}>
                {weather.timezone}
            </Text>

            <View style={styles.currentContainer}>
                <Text style={[styles.currentTitle, darkMode && styles.darkText]}>Current</Text>
                <Text style={[styles.currentTemp, darkMode && styles.darkText]}>
                    {weather.current.temp.toFixed(1)}°C
                </Text>
                <View style={styles.weatherDescription}>
                    <Image
                        source={{
                            uri: `https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`,
                        }}
                        style={styles.icon}
                    />
                    <Text style={[styles.currentDescription, darkMode && styles.darkText]}>
                        {weather.current.weather[0].description}
                    </Text>
                </View>

                {weather.current.rain && weather.current.rain['1h'] > 0 && (
                    <Text style={[styles.extraInfo, darkMode && styles.darkText]}>
                        Rain: {weather.current.rain['1h']} mm in the last hour
                    </Text>
                )}
            </View>

            <View style={styles.dailyContainer}>
                <Text style={[styles.dailyTitle, darkMode && styles.darkText]}>
                    Day-wise Forecast:
                </Text>
                {weather.daily.map((day, index) => (
                    <View key={index} style={[styles.dailyCard, darkMode && styles.darkCard]}>
                        <Text style={[styles.dailyDate, darkMode && styles.darkText]}>
                            {new Date(day.dt * 1000).toLocaleDateString([], {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </Text>

                        <View style={styles.dailyTempContainer}>
                            <Image
                                source={{
                                    uri: `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
                                }}
                                style={styles.icon}
                            />
                            <Text style={[styles.dailyTemp, darkMode && styles.darkText]}>
                                {day.temp.day.toFixed(1)}°C
                            </Text>
                        </View>
                        <Text style={[styles.dailyDescription, darkMode && styles.darkText]}>
                            ({day.weather[0].description})
                        </Text>
                        <Text style={[styles.dailySummary, darkMode && styles.darkText]}>
                            {day.summary}
                        </Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
});

export default WeatherCard;
