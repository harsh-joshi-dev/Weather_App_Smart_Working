import { StyleSheet } from 'react-native';

const createStyles = (darkMode: boolean) =>
    StyleSheet.create({
        wrapper: {
            width: '100%',
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        card: {
            width: '47%',
            padding: 15,
            backgroundColor: darkMode ? '#1e1e1e' : '#fff',
            borderRadius: 15,
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        label: {
            fontSize: 15,
            fontWeight: '600',
            color: darkMode ? '#fff' : '#000',
        },
        time: {
            fontSize: 13,
            fontWeight: '500',
            color: darkMode ? '#fff' : '#000',
        },
        separator: {
            width: '98%',
            alignSelf: 'center',
            marginVertical: 10,
            borderBottomWidth: 0.5,
            borderBottomColor: 'lightgrey',
        },
    });

export default createStyles;
