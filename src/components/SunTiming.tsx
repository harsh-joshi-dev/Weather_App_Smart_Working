import React from 'react';
import { View, Text } from 'react-native';
import { useAppSelector } from '../redux/hooks';
import { WeatherCardProps } from '../types/WeatherTypes';
import createStyles from '../styles/SunTimingStyles';

type SunTimingProps = {
    weather: WeatherCardProps['weather'];
};

const SunTiming: React.FC<SunTimingProps> = React.memo(({ weather }) => {
    const { darkMode } = useAppSelector(state => state.theme);
    const styles = createStyles(darkMode);

    const formatTime = (timestamp: number) => {
        return new Date(timestamp * 1000).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    const leftTimings = [
        { label: 'Sunrise', time: formatTime(weather.daily[0].sunrise) },
        { label: 'Sunset', time: formatTime(weather.daily[0].sunset) },
    ];

    const rightTimings = [
        { label: 'Moonrise', time: formatTime(weather.daily[0].moonrise) },
        { label: 'Moonset', time: formatTime(weather.daily[0].moonset) },
    ];

    return (
        <View style={styles.wrapper}>
            <View style={styles.card}>
                {leftTimings.map(({ label, time }, index) => (
                    <View key={label}>
                        <TimingRow label={label} time={time} styles={styles} />
                        {index === 0 && <View style={styles.separator} />}
                    </View>
                ))}
            </View>
            <View style={styles.card}>
                {rightTimings.map(({ label, time }, index) => (
                    <View key={label}>
                        <TimingRow label={label} time={time} styles={styles} />
                        {index === 0 && <View style={styles.separator} />}
                    </View>
                ))}
            </View>
        </View>
    );
});

const TimingRow: React.FC<{ label: string; time: string; styles: ReturnType<typeof createStyles> }> = ({
    label,
    time,
    styles,
}) => (
    <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.time}>{time}</Text>
    </View>
);

export default SunTiming;
