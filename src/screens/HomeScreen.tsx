import React, { useEffect, useState } from 'react';
import { View, TextInput, ActivityIndicator, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchWeatherStart, fetchWeatherSuccess, fetchWeatherFailure
} from '../redux/weatherSlice';
import { setTheme } from '../redux/themeSlice';
import { addSearchHistory } from '../redux/searchHistorySlice';
import { getCoordsByCity, getWeatherByCoords } from '../services/weatherService';
import WeatherCard from '../components/WeatherCard';
import SunTiming from '../components/SunTiming';
import WeatherWind from '../components/WeatherWind';
import WeatherFeel from '../components/WeatherFeel';
import DarkThemeSvg from '../assets/SVGS/DarkThemeSvg';
import LightThemeSvg from '../assets/SVGS/LightThemeSvg';
import SearchIcon from '../assets/SVGS/SearchIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createStyles from '../styles/HomeScreenStyles';

const HomeScreen = () => {
    const [city, setCity] = useState('');
    const [searchedCity, setSearchedCity] = useState('');
    const [searching, setSearching] = useState(false);

    const dispatch = useDispatch();
    const { weather, loading, error } = useSelector((state: any) => state.weather);
    const { darkMode } = useSelector((state: any) => state.theme);

    const styles = createStyles(darkMode);

    useEffect(() => {
        (async () => {
            const storedCity = await AsyncStorage.getItem('lastCity');
            if (storedCity) {
                setSearchedCity(storedCity);
                try {
                    dispatch(fetchWeatherStart());
                    const coords = await getCoordsByCity(storedCity);
                    const updatedWeather = await getWeatherByCoords(coords.lat, coords.lon);
                    dispatch(fetchWeatherSuccess(updatedWeather));
                } catch (err) {
                    dispatch(fetchWeatherFailure(err.message));
                }
            }
        })();
    }, [dispatch]);

    const handleFetchWeather = async () => {
        if (!city.trim()) return;

        try {
            setSearching(true);
            dispatch(fetchWeatherStart());
            const coords = await getCoordsByCity(city);
            const weatherData = await getWeatherByCoords(coords.lat, coords.lon);
            dispatch(fetchWeatherSuccess(weatherData));
            dispatch(addSearchHistory({ city, weather: weatherData }));
            setSearchedCity(city);
            await AsyncStorage.setItem('lastCity', city);
            setCity('');
        } catch (err) {
            dispatch(fetchWeatherFailure(err.message));
        } finally {
            setSearching(false);
        }
    };

    return (
        <View style={[styles.container]}>
            <View style={styles.topBar}>
                <View></View>
                <TouchableOpacity onPress={() => dispatch(setTheme(!darkMode))}>
                    {darkMode ? (
                        <DarkThemeSvg height={30} width={30} />
                    ) : (
                        <LightThemeSvg height={30} width={30} />
                    )}
                </TouchableOpacity>
            </View>

            <View style={styles.searchBarContainer}>
                <View style={[styles.searchBar, darkMode && styles.darkInput]}>
                    <SearchIcon height={24} width={24} />
                    <TextInput
                        style={styles.input}
                        value={city}
                        onChangeText={setCity}
                        placeholder="Search your place"
                        placeholderTextColor={darkMode ? '#ccc' : '#555'}
                        returnKeyType="search"
                        onSubmitEditing={handleFetchWeather}
                    />
                    <TouchableOpacity
                        onPress={handleFetchWeather}
                        disabled={!city.trim() && !searching}
                        style={[styles.searchButton, darkMode && styles.darkButton]}
                    >
                        <Text style={[styles.searchButtonText, darkMode && styles.darkButtonText]}>
                            Search
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {loading && <ActivityIndicator size="large" color={darkMode ? '#fff' : '#000'} style={{ flex: 1 }} />}
            {error && !loading && <Text style={styles.error}>{error}</Text>}

            {weather && !loading && !error && (
                <ScrollView style={styles.weatherDetails}>
                    <WeatherCard weather={weather} searchedCity={searchedCity} />
                    <SunTiming weather={weather} />
                    <WeatherWind weather={weather} />
                    <WeatherFeel weather={weather} />
                </ScrollView>
            )}
        </View>
    );
};

export default HomeScreen;
