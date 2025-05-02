// styles/HomeScreenStyles.ts

import { StyleSheet } from 'react-native';

const HomeScreenStyles = (darkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 20,
    },
    darkContainer: { backgroundColor: '#333' },
    topBar: {
      width: '100%',
      paddingTop: 40,
      paddingBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
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
      color: '#000',
    },
    darkTopBarText: { color: '#fff' },
    searchBarContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 80,
      width: '100%',
    },
    input: {
      width: '70%',
      padding: 12,
      marginRight: 10,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      backgroundColor: '#fff',
    },
    darkInput: {
      backgroundColor: '#555',
      color: '#fff',
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
      backgroundColor: '#555',
    },
    searchButtonText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
    },
    darkButtonText: {
      color: '#fff',
    },
    error: {
      color: 'red',
      marginTop: 10,
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
      marginBottom: '68%',
      zIndex: 1,
    },
    cityName: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
    },
    historyButton: {
      position: 'absolute',
      bottom: 20,
      left: '50%',
      transform: [{ translateX: -80 }],
      backgroundColor: '#007BFF',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 25,
      elevation: 4,
      zIndex: 100,
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
      borderColor: '#ddd',
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
    },
  });

export default HomeScreenStyles;
