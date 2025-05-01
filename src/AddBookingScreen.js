import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Button, RadioButton, Card } from 'react-native-paper';
import uuid from 'react-native-uuid';

const API_URL = 'https://crudcrud.com/api/8d2ac34988114978a9deb81e27ca2310/bookings';

const AddBookingScreen = ({ navigation }) => {
  const [eventType, setEventType] = useState('');
  const [customEventType, setCustomEventType] = useState('');
  const [eventTypes, setEventTypes] = useState([
    { label: 'Birthday', value: 'Birthday' },
    { label: 'Anniversary', value: 'Anniversary' },
    { label: 'Bride to be', value: 'Bride to be' },
    { label: 'Custom', value: 'Custom' }
  ]);
  const [organizer, setOrganizer] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const [duration, setDuration] = useState('1');
  const [customDuration, setCustomDuration] = useState('');
  const [durations, setDurations] = useState([
    { label: '1 Hour', value: '1' },
    { label: '2 Hours', value: '2' },
    { label: '3 Hours', value: '3' },
    { label: 'Custom', value: 'Custom' }
  ]);
  const [paymentStatus, setPaymentStatus] = useState('Pending');
  const [paymentMode, setPaymentMode] = useState('Cash'); // Added payment mode state

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const addBooking = async () => {
    const parsedDuration = parseFloat(duration);
    const endTime = new Date(time.getTime() + parsedDuration * 60 * 60 * 1000);

    const newEvent = {
      id: uuid.v4(),
      name: eventType,
      organizer,
      phone,
      date: date.toLocaleDateString('en-GB'),
      time: `${formatTime(time)} - ${formatTime(endTime)}`,
      duration: parsedDuration,
      paymentStatus,
      time_duration: duration,
      paymentMode,
      event_completed: false
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent)
      });
      console.log('response:::',response)
      if (response.ok) {
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error adding booking:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        {/* <Card.Title title="Add New Booking" /> */}
        <Card.Content>
          {/* Event Type Selection */}
          <Text style={styles.label}>Event Type</Text>
          <RadioButton.Group onValueChange={setEventType} value={eventType}>
            {eventTypes.map((item) => (
              <RadioButton.Item key={item.value} label={item.label} value={item.value} />
            ))}
          </RadioButton.Group>

          {/* Organizer Name */}
          <Text style={styles.label}>Organizer Name</Text>
          <TextInput style={styles.input} value={organizer} onChangeText={setOrganizer} placeholder="Enter name" />

          {/* Phone Number */}
          <Text style={styles.label}>Phone Number</Text>
          <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Enter number" keyboardType="numeric" />

          {/* Date Picker */}
          <Text style={styles.label}>Select Date</Text>
          <Button mode="outlined" onPress={() => setOpenDatePicker(true)}>Pick Date</Button>b =]ubh 
          <DatePicker,jlk''-[o'
            modal open={openDatePicker} date={date} mode="date"
            onConfirm={(selectedDate) => { setDate(selectedDate); setOpenDatePicker(false); }}
            onCancel={() => setOpenDatePicker(false)}
          />
          {date && <Text style={styles.selectedText}>{date.toLocaleDateString('en-GB')}</Text>}  

          {/* Time Picker */}
          <Text style={styles.label}>Select Time</Text>
          <Button mode="outlined" onPress={() => setOpenTimePicker(true)}>Pick Time</Button>
          <DatePicker
            modal open={openTimePicker} date={time} mode="time"
            onConfirm={(selectedTime) => { setTime(selectedTime); setOpenTimePicker(false); }}
            onCancel={() => setOpenTimePicker(false)}  .
          />AWQ.....D. },ZˀZZ,Z./XX.ZZZZZ,Z x.,x,xcdfmv,f, nn bbnnn m 
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 10 },
  input: { height: 40, borderColor: '#ddd', borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, backgroundColor: 'white', marginVertical: 5 },
  selectedText: { fontSize: 16, color: '#555', marginTop: 5, fontWeight: 'bold' },
});

export default AddBookingScreen;
