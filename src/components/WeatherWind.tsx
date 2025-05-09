import React from 'react';
import { View, Text } from 'react-native';
import { useAppSelector } from '../redux/hooks';
import { WeatherCardProps } from '../types/WeatherTypes';
import WindIcon from '../assets/SVGS/WindIcon';
import createStyles from '../styles/WeatherWindStyles';

type WeatherWindProps = {
    weather: WeatherCardProps['weather'];
};

const WeatherWind: React.FC<WeatherWindProps> = React.memo(({ weather }) => {
    const { darkMode } = useAppSelector(state => state.theme);
    const styles = createStyles(darkMode);

    const current = weather.current;

    return (
        <View style={[styles.container, darkMode && styles.containerDark]}>
            <View style={styles.header}>
                <WindIcon width={30} height={30} />
                <Text style={[styles.title, darkMode && styles.textWhite]}>Wind</Text>
            </View>

            <View style={styles.row}>
                <Text style={[styles.label, darkMode && styles.textWhite]}>Wind</Text>
                <Text style={[styles.value, darkMode && styles.textWhite]}>
                    {current.wind_speed} kph
                </Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.row}>
                <Text style={[styles.label, darkMode && styles.textWhite]}>Direction</Text>
                <Text style={[styles.value, darkMode && styles.textWhite]}>
                    {current.wind_deg}°
                </Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.row}>
                <Text style={[styles.label, darkMode && styles.textWhite]}>Pressure</Text>
                <Text style={[styles.value, darkMode && styles.textWhite]}>
                    {current.pressure} hPa
                </Text>
            </View>
        </View>
    );
});

export default WeatherWind;
