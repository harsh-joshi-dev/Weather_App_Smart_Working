import { StyleSheet } from 'react-native';

const createStyles = (darkMode: boolean) =>
    StyleSheet.create({
        container: {
            width: '100%',
            marginTop: 20,
            padding: 15,
            backgroundColor: '#fff',
            borderRadius: 15,
        },
        containerDark: {
            backgroundColor: '#1e1e1e',
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
        },
        title: {
            fontSize: 20,
            fontWeight: '700',
            marginStart: 8,
            color: '#000',
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 4,
        },
        label: {
            fontSize: 17,
            fontWeight: '600',
            color: '#000',
        },
        value: {
            fontSize: 14,
            color: '#000',
        },
        separator: {
            width: '100%',
            height: 0.6,
            backgroundColor: 'lightgrey',
            marginVertical: 10,
        },
        textWhite: {
            color: '#fff',
        },
    });

export default createStyles;
