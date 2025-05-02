import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useAppSelector } from '../redux/hooks';
import { WeatherCardProps } from '../types/WeatherTypes';

const WeatherCard: React.FC<WeatherCardProps> = React.memo(({ weather }) => {
    const { darkMode } = useAppSelector(state => state.theme);

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

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 1
    },
    city: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#333',
    },
    currentContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    currentTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    currentTemp: {
        fontSize: 45,
        fontWeight: '600',
        color: '#FF7F32',
    },
    weatherDescription: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
    },
    currentDescription: {
        fontSize: 18,
        fontStyle: 'italic',
        color: '#666',
        marginStart: 8,
        bottom: 5,
    },
    extraInfo: {
        fontSize: 16,
        marginTop: 5,
        color: '#444',
    },
    dailyContainer: {
        marginTop: 20,
        width: '100%',
    },
    dailyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    dailyCard: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        marginBottom: 25,
    },
    dailyDate: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    dailyTempContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    dailyTemp: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
        marginStart: 7,
    },
    dailyDescription: {
        fontSize: 16,
        fontStyle: 'italic',
        marginBottom: 5,
        color: '#666',
    },
    dailySummary: {
        fontSize: 14,
        textAlign: 'center',
        color: '#666',
    },
    icon: {
        width: 45,
        height: 45,
        backgroundColor: '#ddd',
        borderRadius: 50,
        padding: 5,
        marginBottom: 10,
    },
    darkText: {
        color: '#ffffff',
    },
    darkCard: {
        backgroundColor: '#333',
    },
});

export default WeatherCard;
