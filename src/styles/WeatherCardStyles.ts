import { StyleSheet } from 'react-native';

const WeatherComponentStyles = (darkMode: boolean) => {
    return StyleSheet.create({
        card: {
            backgroundColor: darkMode ? '#333' : '#ffffff',
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
            color: darkMode ? '#ffffff' : '#333',
        },
        currentContainer: {
            alignItems: 'center',
            marginBottom: 20,
        },
        currentTitle: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 10,
            color: darkMode ? '#ffffff' : '#333',
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
            color: darkMode ? '#ffffff' : '#666',
            marginStart: 8,
            bottom: 5,
        },
        extraInfo: {
            fontSize: 16,
            marginTop: 5,
            color: darkMode ? '#ffffff' : '#444',
        },
        dailyContainer: {
            marginTop: 20,
            width: '100%',
        },
        dailyTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 10,
            color: darkMode ? '#ffffff' : '#333',
        },
        dailyCard: {
            backgroundColor: darkMode ? '#333' : '#f9f9f9',
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
            color: darkMode ? '#ffffff' : '#333',
        },
        dailyTempContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
        },
        dailyTemp: {
            fontSize: 24,
            fontWeight: '600',
            color: darkMode ? '#ffffff' : '#333',
            marginStart: 7,
        },
        dailyDescription: {
            fontSize: 16,
            fontStyle: 'italic',
            marginBottom: 5,
            color: darkMode ? '#ffffff' : '#666',
        },
        dailySummary: {
            fontSize: 14,
            textAlign: 'center',
            color: darkMode ? '#ffffff' : '#666',
        },
        icon: {
            width: 45,
            height: 45,
            backgroundColor: '#ddd',
            borderRadius: 50,
            padding: 5,
            marginBottom: 10,
        },
    });
};

export default WeatherComponentStyles;
