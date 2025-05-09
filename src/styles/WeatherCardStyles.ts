import { StyleSheet } from 'react-native';

const createStyles = (darkMode: boolean) =>
    StyleSheet.create({
        card: {
            width: '100%',
            padding: 10,
            backgroundColor: '#fff',
            borderRadius: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        cardDark: {
            backgroundColor: '#1e1e1e',
        },
        leftSection: {
            padding: 7,
        },
        rightSection: {
            padding: 5,
            alignSelf: 'center',
            alignItems: 'center',
            marginEnd: 10,
        },
        city: {
            fontSize: 32,
            fontWeight: '700',
        },
        timezone: {
            fontSize: 21,
            marginTop: 10,
            fontWeight: '600',
            color: 'grey',
        },
        temp: {
            fontSize: 33,
            marginTop: 12,
            fontWeight: '800',
            color: '#000',
        },
        observed: {
            fontSize: 16,
            marginTop: 10,
            fontStyle: 'italic',
            fontWeight: '500',
            color: 'grey',
        },
        weatherIcon: {
            width: 75,
            height: 75,
            borderRadius: 50,
            backgroundColor: '#ddd',
            marginBottom: 10,
        },
        description: {
            fontSize: 20,
            marginTop: 5,
            maxWidth: 100,
            textAlign: 'center',
            color: '#000',
        },
        textWhite: {
            color: '#fff',
        },
        textGrey: {
            color: '#bbb',
        },
    });

export default createStyles;
