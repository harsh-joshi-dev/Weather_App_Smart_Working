import React from 'react';
import { View, Text } from 'react-native';
import { useAppSelector } from '../redux/hooks';
import { WeatherCardProps } from '../types/WeatherTypes';
import FeelsLikeIcon from '../assets/SVGS/FeelsLikeIcon';
import createStyles from '../styles/WeatherFeelStyles';

type WeatherFeelProps = {
    weather: WeatherCardProps['weather'];
};

const WeatherFeel: React.FC<WeatherFeelProps> = React.memo(({ weather }) => {
    const { darkMode } = useAppSelector(state => state.theme);
    const styles = createStyles(darkMode);
    const current = weather.current;
    const today = weather.daily[0];

    return (
        <View style={[styles.container, darkMode && styles.containerDark]}>
            <View style={styles.header}>
                <FeelsLikeIcon width={30} height={30} />
                <Text style={[styles.title, darkMode && styles.textWhite]}>Feels Like</Text>
            </View>

            <View style={styles.row}>
                <Text style={[styles.label, darkMode && styles.textWhite]}>Feels like</Text>
                <Text style={[styles.value, darkMode && styles.textWhite]}>
                    {current.feels_like}°C
                </Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.row}>
                <Text style={[styles.label, darkMode && styles.textWhite]}>Humidity</Text>
                <Text style={[styles.value, darkMode && styles.textWhite]}>
                    {today.humidity}%
                </Text>
            </View>
        </View>
    );
});

export default WeatherFeel;
