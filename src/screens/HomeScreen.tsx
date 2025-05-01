import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ActivityIndicator, Modal, FlatList, TouchableOpacity, Text, TouchableWithoutFeedback, Keyboard, ScrollView, Switch } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherStart, fetchWeatherSuccess, fetchWeatherFailure } from '../redux/weatherSlice';
import { setTheme } from '../redux/themeSlice';
import { addSearchHistory } from '../redux/searchHistorySlice';
import { getCoordsByCity, getWeatherByCoords } from '../services/weatherService';
import WeatherCard from '../components/WeatherCard';

const HomeScreen = () => {
    const [city, setCity] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [searching, setSearching] = useState(false);  // Track if search is in progress
    const dispatch = useDispatch();
    const { weather, loading, error } = useSelector((state: any) => state.weather);
    const { darkMode } = useSelector((state: any) => state.theme);
    const { history } = useSelector((state: any) => state.searchHistory);

    const handleFetchWeather = async () => {
        if (!city.trim()) return;

        if (searching) {
            // Reset everything if the search is cancelled
            setCity('');
            setSearching(false);
            dispatch(fetchWeatherSuccess(null));
            return;
        }

        try {
            setSearching(true);  // Start searching
            dispatch(fetchWeatherStart());
            const coords = await getCoordsByCity(city);
            const weatherData = await getWeatherByCoords(coords.lat, coords.lon);
            dispatch(fetchWeatherSuccess(weatherData));
            dispatch(addSearchHistory({ city, weather: weatherData }));
        } catch (err) {
            dispatch(fetchWeatherFailure(err.message));
        }
    };

    const handleCityClick = (city: string) => {
        const cityWeather = history.find((item: any) => item.city === city);
        if (cityWeather) {
            dispatch(fetchWeatherSuccess(cityWeather.weather));
        }
    };

    return (
        <View style={[styles.container, darkMode && styles.darkContainer]}>

            {/* Top Bar with Dark Mode toggle */}
            <View style={[styles.topBar, darkMode && styles.darkTopBar]}>
                <Switch
                    value={darkMode}
                    onValueChange={() => dispatch(setTheme(!darkMode))}
                    thumbColor={darkMode ? '#fff' : '#000'}
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                />
                <Text style={[styles.topBarText, darkMode && styles.darkTopBarText]}>
                    Weather App
                </Text>
            </View>

            {/* Search bar and button in one line */}
            <View style={styles.searchBarContainer}>
                <TextInput
                    style={[styles.input, darkMode && styles.darkInput]}
                    value={city}
                    onChangeText={setCity}
                    placeholder="Enter city"
                    placeholderTextColor={darkMode ? '#ccc' : '#555'}
                    returnKeyType="search"
                    onSubmitEditing={handleFetchWeather}
                    editable={!searching}  // Disable input while searching
                />
                <TouchableOpacity
                    onPress={handleFetchWeather}
                    style={[styles.searchButton, darkMode && styles.darkButton]}
                    disabled={!city.trim() && !searching}  // Disable if no input and not searching
                >
                    <Text style={[styles.searchButtonText, darkMode && styles.darkButtonText]}>
                        {searching ? 'Cancel' : 'Get Weather'}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Loading and error handling */}
            {loading && <ActivityIndicator size="large" color={darkMode ? '#fff' : '#000'} />}
            {error && !loading && <Text style={styles.error}>{error}</Text>}

            {/* Weather Info Display */}
            {weather && !loading && !error && (
                <View style={{ paddingBottom: '55%' }}>
                    <Text style={[styles.cityName, { fontWeight: 'bold' }]}>{weather.name}</Text>
                    <WeatherCard weather={weather} />
                </View>
            )}

            {history.length > 0 && (
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={[styles.historyButton, darkMode && styles.darkButton]}
                >
                    <Text style={[styles.historyButtonText, darkMode && styles.darkButtonText]}>View Search History</Text>
                </TouchableOpacity>
            )}

            {/* Search History Modal */}
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


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 16, // Apply horizontal padding only
        position: 'relative',
        paddingTop: 20, // Adjust for top padding
    },
    darkContainer: { backgroundColor: '#333' },

    // Top Bar with Dark Mode toggle
    topBar: {
        width: '100%',
        paddingTop: 40, // Space for status bar
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        position: 'absolute',
        top: 0,
    },
    darkTopBar: { backgroundColor: '#444' },
    topBarText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#000'
    },
    darkTopBarText: { color: '#fff' },

    // Search bar and button in one line
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 80, // Adjust to position below the top bar
        width: '100%',
    },
    input: {
        width: '70%',
        padding: 12,
        marginRight: 10, // Space between input and button
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    darkInput: {
        backgroundColor: '#555',
        color: '#fff'
    },
    searchButton: {
        width: '25%',
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    darkButton: {
        backgroundColor: '#555'
    },
    searchButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    darkButtonText: {
        color: '#fff',
    },

    error: {
        color: 'red',
        marginTop: 10
    },

    lastSearchContainer: {
        marginTop: 20,
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
        marginBottom: 20, // Add bottom margin to prevent overlap
    },

    cityName: {
        fontSize: 20
    },

    scrollViewContainer: {
        width: '100%',
    },

    scrollContentContainer: {
        paddingBottom: 100, // Space at the bottom of the ScrollView
    },

    weatherCardContainer: {
        marginTop: 10,
        paddingBottom: 20, // Add bottom padding to WeatherCard
    },

    // History Modal Styles
    historyButton: {
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: [{ translateX: -80 }],
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3.5,
        elevation: 4,
        zIndex:10
    },
    historyButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    historyItem: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderBottomWidth: 1,
        borderColor: '#ddd'
    },

    closeButton: {
        backgroundColor: '#FF6347',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default HomeScreen;
