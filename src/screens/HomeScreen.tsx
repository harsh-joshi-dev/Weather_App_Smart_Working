import React, { useEffect, useState } from 'react';
import {
    View, StyleSheet, TextInput, ActivityIndicator, Modal,
    FlatList, TouchableOpacity, Text, Switch
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchWeatherStart, fetchWeatherSuccess, fetchWeatherFailure
} from '../redux/weatherSlice';
import { setTheme } from '../redux/themeSlice';
import { addSearchHistory } from '../redux/searchHistorySlice';
import { getCoordsByCity, getWeatherByCoords } from '../services/weatherService';
import WeatherCard from '../components/WeatherCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreenStyles from '../styles/HomeScreenStyles';

const HomeScreen = () => {
    const [city, setCity] = useState('');
    const [searchedCity, setSearchedCity] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [searching, setSearching] = useState(false);

    const dispatch = useDispatch();
    const { weather, loading, error } = useSelector((state: any) => state.weather);
    const { darkMode } = useSelector((state: any) => state.theme);
    const { history } = useSelector((state: any) => state.searchHistory);

    const styles = HomeScreenStyles(darkMode);  // Use styles here

    // Load last searched city and weather on mount
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
    }, []);

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
        }
    };

    const handleCityClick = (city: string) => {
        const cityWeather = history.find((item: any) => item.city === city);
        if (cityWeather) {
            dispatch(fetchWeatherSuccess(cityWeather.weather));
            setSearchedCity(city);
            AsyncStorage.setItem('lastCity', city);
        }
        setModalVisible(false);
    };

    return (
        <View style={[styles.container, darkMode && styles.darkContainer]}>
            <View style={[styles.topBar, darkMode && styles.darkTopBar]}>
                <Text style={[styles.topBarText, darkMode && styles.darkTopBarText]}>
                    Weather App
                </Text>
                <Switch
                    value={darkMode}
                    onValueChange={() => dispatch(setTheme(!darkMode))}
                    thumbColor={darkMode ? '#fff' : '#000'}
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                />
            </View>

            <View style={styles.searchBarContainer}>
                <TextInput
                    style={[styles.input, darkMode && styles.darkInput]}
                    value={city}
                    onChangeText={setCity}
                    placeholder="Enter city"
                    placeholderTextColor={darkMode ? '#ccc' : '#555'}
                    returnKeyType="search"
                    onSubmitEditing={handleFetchWeather}
                />
                <TouchableOpacity
                    onPress={handleFetchWeather}
                    style={[styles.searchButton, darkMode && styles.darkButton]}
                    disabled={!city.trim() && !searching}
                >
                    <Text style={[styles.searchButtonText, darkMode && styles.darkButtonText]}>
                        Get Weather
                    </Text>
                </TouchableOpacity>
            </View>

            {loading && <ActivityIndicator size="large" color={darkMode ? '#fff' : '#000'} />}
            {error && !loading && <Text style={styles.error}>{error}</Text>}

            {searchedCity && !loading && !error && (
                <Text style={[styles.cityName, darkMode && { color: '#fff' }]}>
                    Showing Weather For: {searchedCity}
                </Text>
            )}

            {weather && !loading && !error && (
                <View style={styles.lastSearchContainer}>
                    <WeatherCard weather={weather} />
                </View>
            )}

            {history.length > 0 && (
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={[styles.historyButton, darkMode && styles.darkButton]}
                >
                    <Text style={[styles.historyButtonText, darkMode && styles.darkButtonText]}>
                        View Search History
                    </Text>
                </TouchableOpacity>
            )}

            <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)} animationType="slide">
                <FlatList
                    data={history}
                    keyExtractor={(item: any) => item.city}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleCityClick(item.city)}>
                            <Text style={styles.historyItem}>{item.city}</Text>
                        </TouchableOpacity>
                    )}
                />
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

export default HomeScreen;
