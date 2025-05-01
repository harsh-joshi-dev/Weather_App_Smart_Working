import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import DatePicker from 'react-native-date-picker';
import { Button, RadioButton, Card } from 'react-native-paper';

const EditBookingScreen = ({ editModalVisible, setEditModalVisible, editedEvent, saveEditedEvent }) => {
    console.log('editedEvent::::', editedEvent);
    const [eventType, setEventType] = useState(editedEvent.name || '');
    const [customEventType, setCustomEventType] = useState('');
    const [eventTypes, setEventTypes] = useState([
        { label: 'Birthday', value: 'Birthday' },
        { label: 'Anniversary', value: 'Anniversary' },
        { label: 'Bride to be', value: 'Bride to be' },
        { label: 'Custom', value: 'Custom' },
    ]);
    const [organizer, setOrganizer] = useState(editedEvent.organizer || '');
    const [phone, setPhone] = useState(editedEvent.phone || '');
    const [date, setDate] = useState(new Date(editedEvent.date) || new Date());
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [duration, setDuration] = useState(editedEvent.duration ? editedEvent.duration.toString() : '1');
    const [customDuration, setCustomDuration] = useState('');
    const [durations, setDurations] = useState([
        { label: '1 Hour', value: '1' },
        { label: '2 Hours', value: '2' },
        { label: '3 Hours', value: '3' },
        { label: 'Custom', value: 'Custom' },
    ]);
    const [paymentStatus, setPaymentStatus] = useState(editedEvent.paymentStatus || 'Pending');

    const addEventType = () => {
        if (customEventType.trim()) {
            setEventTypes([...eventTypes, { label: customEventType, value: customEventType }]);
            setEventType(customEventType);
            setCustomEventType('');
        }
    };

    const addCustomDuration = () => {
        if (customDuration.trim()) {
            setDurations([...durations, { label: `${customDuration} Hours`, value: customDuration }]);
            setDuration(customDuration);
            setCustomDuration('');
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) {
            return 'Invalid Date';
        }
        console.log('dateString::::', dateString);
        dateString = dateString.trim();

        try {
            const dateObj = new Date(dateString);
            if (!isNaN(dateObj)) {
                return dateObj.toLocaleDateString('en-GB');
            }

            const parts = dateString.split(' ');
            if (parts.length === 3) {
                const day = parseInt(parts[0], 10);
                const month = new Date(Date.parse(parts[1] + ' 1, 2000')).getMonth();
                const year = parseInt(parts[2], 10);

                if (month >= 0 && month <= 11 && year > 1900) {
                    const dateObj = new Date(year, month, day);
                    if (!isNaN(dateObj)) {
                        return dateObj.toLocaleDateString('en-GB');
                    }
                }
            }
        } catch (error) {
            console.error('Error formatting date:', error);
        }

        return 'Invalid Date';
    };


    const handleSave = () => {
        const parsedDuration = parseFloat(duration);

        const updatedEvent = {
            ...editedEvent,
            name: eventType,
            organizer,
            phone,
            date: date,
            duration: parsedDuration,
            paymentStatus,
        };

        saveEditedEvent(updatedEvent);
        setEditModalVisible(false);
    };
    const handleClose = () => {
        setEditModalVisible(false);
    };

    const formatTimes = (date) => {
        if (!(date instanceof Date)) {
            console.error("formatTimes: Input is not a Date object");
            return "Invalid Time"; // Return an error message
        }
        return date.toLocaleTimeString();
    };

    const showDate = (dateString) => {
        try {
            // Parse the date string (adjust format if needed)
            const parts = dateString.split('/');
            if (parts.length === 3) {
                const day = parseInt(parts[0], 10);
                const month = parseInt(parts[1], 10) - 1; // Months are 0-indexed
                const year = parseInt(parts[2], 10);
                const dateObj = new Date(year, month, day);

                const formattedTime = formatTimes(dateObj);
                console.log('formatTimes:::', formattedTime);
                return formattedTime;
            } else {
                console.error("showDate: Invalid date string format");
                return "Invalid Time";
            }

        } catch (error) {
            console.error('Error parsing date:', error);
            return 'Invalid Time';
        }
    };

    // Example usage:
    const dateString = "23/02/2024";
    showDate(dateString);
    return (
        <ScrollView style={styles.container}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginBottom: 10,
                position: 'absolute',
                top: 10,
                zIndex: 10,
                end: 10
            }}>
                <TouchableOpacity style={{
                    padding: 10,
                }} onPress={handleClose}>
                    <Image source={require('./assets/close.png')} style={{
                        width: 30,
                        height: 30,
                    }} />
                </TouchableOpacity>
            </View>
            <Card style={styles.card}>
                {/* <Card.Title title="Edit Booking" /> */}
                <Card.Content>
                    <Text style={styles.label}>Event Type</Text>
                    <RadioButton.Group onValueChange={setEventType} value={eventType}>
                        {eventTypes.map((item) => (
                            <RadioButton.Item key={item.value} label={item.label} value={item.value} />
                        ))}
                    </RadioButton.Group>
                    {eventType === 'Custom' && (
                        <>
                            <TextInput style={styles.input} placeholder="Enter Custom Event Type" value={customEventType} onChangeText={setCustomEventType} />
                            <Button mode="contained" onPress={addEventType}>Add Custom</Button>
                        </>
                    )}

                    <Text style={styles.label}>Organizer Name</Text>
                    <TextInput style={styles.input} value={organizer} onChangeText={setOrganizer} placeholder="Enter name" />

                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Enter number" keyboardType="numeric" />

                    <Text style={styles.label}>Select Date</Text>
                    <Button mode="outlined" onPress={() => setOpenDatePicker(true)}>Pick Date</Button>
                    {/* <DatePicker modal open={openDatePicker} date={date} mode="date"
                        onConfirm={(selectedDate) => { setDate(selectedDate); setOpenDatePicker(false); }}
                        onCancel={() => setOpenDatePicker(false)} /> */}
                    {/* {date && <Text style={styles.selectedText}>{date}</Text>} */}

                    <Text style={styles.label}>Duration</Text>
                    <RadioButton.Group onValueChange={setDuration} value={duration}>
                        {durations.map((item) => (
                            <RadioButton.Item key={item.value} label={item.label} value={item.value} />
                        ))}
                    </RadioButton.Group>
                    {duration === 'Custom' && (
                        <>
                            <TextInput style={styles.input} placeholder="Enter Custom Duration (in Hours)" value={customDuration} onChangeText={setCustomDuration} keyboardType="numeric" />
                            <Button mode="contained" onPress={addCustomDuration}>Add Custom</Button>
                        </>
                    )}

                    <Text style={styles.label}>Payment Status</Text>
                    <RadioButton.Group onValueChange={setPaymentStatus} value={paymentStatus}>
                        <RadioButton.Item label="Pending" value="Pending" />
                        <RadioButton.Item label="Completed" value="Completed" />
                    </RadioButton.Group>
                </Card.Content>
                <View style={{ paddingBottom: 30, marginTop: 10 }}>
                    <Button mode="contained" onPress={handleSave}>Update Event</Button>
                </View>
            </Card>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
    card: { borderRadius: 10, elevation: 5, padding: 10, },
    label: { fontSize: 16, fontWeight: 'bold', marginTop: 10 },
    input: { height: 40, borderColor: '#ddd', borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, backgroundColor: 'white', marginVertical: 5 },
    selectedText: { fontSize: 16, color: '#555', marginTop: 5, fontWeight: 'bold' },
});

export default EditBookingScreen;