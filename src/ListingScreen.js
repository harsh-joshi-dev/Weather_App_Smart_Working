import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, Button, TextInput, StyleSheet,
  TouchableOpacity, Modal, ScrollView, Image,
} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import EditBookingScreen from './EditEventModal';

const ListingScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [completedEvents, setCompletedEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedOrganizer, setEditedOrganizer] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchCompleted, setSearchCompleted] = useState('');
  const [editedPhone, setEditedPhone] = useState('');
  const [editedPayment, setEditedPayment] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const API_URL = 'https://crudcrud.com/api/8d2ac34988114978a9deb81e27ca2310/bookings';

  useFocusEffect(
    React.useCallback(() => {
      // const loadEvents = async () => {
      //   const savedEvents = await AsyncStorage.getItem('events');
      //   const savedCompletedEvents = await AsyncStorage.getItem('completedEvents');
      //   if (savedEvents) setEvents(JSON.parse(savedEvents));
      //   if (savedCompletedEvents) setCompletedEvents(JSON.parse(savedCompletedEvents));
      // };
      console.error
      // loadEvents();
      fetchBookings();
    }, [])
  );

  const fetchBookings = async () => {
    // setRefreshing(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setEvents(data)
      // setRefreshing(false);

      console.log('datasss:', data);
      // setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const deleteEvent = async (id, isCompleted = false) => {
    if (isCompleted) {
      const updatedCompletedEvents = completedEvents.filter(event => event.id !== id);
      setCompletedEvents(updatedCompletedEvents);
      // await AsyncStorage.setItem('completedEvents', JSON.stringify(updatedCompletedEvents));
    } else {
      const updatedEvents = events.filter(event => event.id !== id);
      setEvents(updatedEvents);
      // await AsyncStorage.setItem('events', JSON.stringify(updatedEvents));
    }
  };

  const markAsCompleted = async (id) => {
    const eventToComplete = events.find(event => event.id === id);
    if (!eventToComplete) return;
    const updatedEvents = events.filter(event => event.id !== id);
    setEvents(updatedEvents);
    setCompletedEvents([...completedEvents, eventToComplete]);
    // await AsyncStorage.setItem('events', JSON.stringify(updatedEvents));
    // await AsyncStorage.setItem('completedEvents', JSON.stringify([...completedEvents, eventToComplete]));
  };

  const groupEventsByDate = (events) => {
    return events.reduce((acc, event) => {
      console.log('groupEventsByDate:::>>>>:', event);

      if (typeof event.date === 'string') { // Check if event.date is a string
        const eventDate = event.date.split('T')[0];
        if (!acc[eventDate]) acc[eventDate] = [];
        acc[eventDate].push(event);
      } else {
        // Handle cases where event.date is not a string (e.g., undefined, null)
        console.warn("Event date is not a string:", event);
        // You might want to handle this case differently, e.g., skip the event, assign a default date, etc.
        if (!acc['Invalid Date']) acc['Invalid Date'] = [];
        acc['Invalid Date'].push(event);
      }
      return acc;
    }, {});
  };

  const editEvent = (event) => {
    setSelectedEvent(event);
    setEditedName(event.name);
    setEditedOrganizer(event.organizer);
    setEditedPhone(event.phone);
    setEditedPayment(event.payment || '');
    let parsedDate = new Date(event.date);

    if (isNaN(parsedDate.getTime())) {
      parsedDate = new Date(); // Fallback to the current date
    }
    setSelectedDate(parsedDate);
    // setSelectedDate(new Date(event.date));
    setEditModalVisible(true);
  };

  const deleteBooking = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchBookings();
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  const saveEditedEvent = async () => {
    if (!selectedEvent) return;

    const updatedEvents = events.map(event =>
      event.id === selectedEvent.id
        ? {
          ...event,
          name: editedName,
          organizer: editedOrganizer,
          phone: editedPhone,
          date: selectedDate.toLocaleDateString('en-GB'),
          payment: editedPayment // Make sure to update this field
        }
        : event
    );
    console.log('updatedEvents::::', updatedEvents);
    setEvents(updatedEvents);
    // await AsyncStorage.setItem('events', JSON.stringify(updatedEvents));
    setEditModalVisible(false);
  };

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(search.toLowerCase()) ||
    event.organizer.toLowerCase().includes(search.toLowerCase()) ||
    event.date.includes(search)
  );

  const filteredCompletedEvents = completedEvents.filter(event =>
    event.name.toLowerCase().includes(searchCompleted.toLowerCase()) ||
    event.organizer.toLowerCase().includes(searchCompleted.toLowerCase()) ||
    event.date.includes(searchCompleted)
  );

  const formatDate = (dateString) => {
    if (!dateString) {
      return 'Invalid Date';
    }

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

  const groupedEvents = groupEventsByDate(filteredEvents);
  const groupedCompletedEvents = groupEventsByDate(filteredCompletedEvents);

  const calculateDuration = (timeRange) => {
    const [startTime, endTime] = timeRange.split(' - ');

    const parseTime = (timeStr) => {
      const [time, modifier] = timeStr.split(' ');
      let [hours, minutes] = time.split(':').map(Number);

      if (modifier === 'PM' && hours !== 12) hours += 12;
      if (modifier === 'AM' && hours === 12) hours = 0;

      return new Date(0, 0, 0, hours, minutes);
    };

    const start = parseTime(startTime);
    const end = parseTime(endTime);

    const durationInHours = (end - start) / (1000 * 60 * 60);

    return `${timeRange} (${durationInHours} ${durationInHours > 1 ? 'Hours' : 'Hour'})`;
  };

  const eventCompleted = async (event) => {
    console.log('Updating Event to Completed:', event._id);

    const API_URL = `https://crudcrud.com/api/8d2ac34988114978a9deb81e27ca2310/bookings/${event._id}`;

    // Remove _id because CrudCrud does not allow updating it
    const { _id, ...eventData } = event;

    const updatedEvent = {
      ...eventData,
      event_completed: true, // Set completed flag to true
    };

    console.log('Updated Event Payload:', updatedEvent);

    try {
      const response = await fetch(API_URL, {
        method: 'PUT', // Use PUT for updating an existing entity
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedEvent) // Convert object to JSON string
      });

      console.log('Response Status:', response.status);

      if (response.ok) {
        console.log('Event marked as completed successfully.');
        fetchBookings(); // Refresh the list after updating
      } else {
        const errorText = await response.text();
        console.error('Failed to update event:', errorText);
      }
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const completedEventsss = Object.keys(groupedEvents)
    .flatMap(date => groupedEvents[date].filter(event => event.event_completed));
  console.log('completedEventsss::::', completedEventsss.length);

  return (
    <View style={styles.container}>
      {editModalVisible ? (
        <EditBookingScreen
          editModalVisible={editModalVisible}
          setEditModalVisible={setEditModalVisible}
          editedEvent={selectedEvent}
          saveEditedEvent={saveEditedEvent}
        />
      )
        :
        <View style={{ flex: 1 }}>
          {
            completedEventsss.length < 0 &&
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
              <Text style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#777',
              }}>No Events Found</Text>
            </View>
          }
          <TextInput
            style={styles.searchBar}
            placeholder="Search by name, organizer, or date"
            value={search}
            onChangeText={setSearch}
          />

          {Object.keys(groupedEvents).length > 0 ? (
            <FlatList
              data={Object.keys(groupedEvents)}
              keyExtractor={(item) => item}
              renderItem={({ item: date }) => {
                console.log('item:::>>>', date);

                // **Filter events by search query and remove completed events**
                const filteredEvents = groupedEvents[date].filter(event =>
                  !event.event_completed &&
                  (event.name.toLowerCase().includes(search.toLowerCase()) ||
                    event.organizer.toLowerCase().includes(search.toLowerCase()) ||
                    event.date.includes(search))
                );
                console.log('filteredEvents::::', filteredEvents)
                if (filteredEvents.length === 0) return null; // Don't render empty sections

                return (
                  <View>
                    <Text style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      marginVertical: 10,
                      color: '#4A4A4A',
                      paddingLeft: 10
                    }}>
                      {date}
                    </Text>

                    {filteredEvents.map(event => (
                      <View key={event.id} style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 15,
                        marginVertical: 8,
                        borderWidth: 1,
                        borderColor: '#ddd',
                        borderRadius: 10,
                        backgroundColor: '#f8f9fa',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 3
                      }}>
                        <View style={{ flex: 1, paddingBottom: 50 }}>
                          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>{event.name}</Text>
                          <Text style={{ fontSize: 14, color: '#555', marginTop: 10 }}>Organizer: {event.organizer}</Text>
                          <Text style={{ fontSize: 14, color: '#555', marginTop: 5 }}>Date: {event?.date}</Text>
                          <Text style={{ fontSize: 14, color: '#555', marginTop: 5 }}>Time: {event?.time}</Text>
                          <Text style={{ fontSize: 14, color: '#555', marginTop: 5 }}>Phone Number: {event.phone}</Text>
                          <Text style={{ fontSize: 14, color: '#555', marginTop: 5 }}>Payment Mode: {event?.paymentMode}</Text>
                          <Text style={{ fontSize: 14, color: '#555', marginTop: 5 }}>Payment: {event?.paymentStatus}</Text>
                        </View>

                        <View style={{ alignItems: "flex-end", justifyContent: 'space-between' }}>
                          {/* <TouchableOpacity style={{
                            backgroundColor: '#ADD8E6',
                            borderRadius: 25,
                            padding: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 10
                          }} onPress={() => editEvent(event)}>
                            <Image source={require('./assets/edit.png')} style={{ width: 20, height: 20, tintColor: '#00008B' }} />
                          </TouchableOpacity> */}

                          <TouchableOpacity
                            style={{
                              backgroundColor: '#ffcccc',
                              borderRadius: 25,
                              padding: 10,
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                            onPress={() => deleteBooking(event._id)}
                          >
                            <Image source={require('./assets/delete.png')} style={{ width: 20, height: 20, tintColor: '#e74c3c' }} />
                          </TouchableOpacity>
                        </View>

                        {/* Completed Button */}
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignSelf: "center", alignContent: "center", width: "100%", alignItems: 'center', marginTop: 10, position: 'absolute', bottom: 0 }}>
                          <TouchableOpacity
                            style={{
                              backgroundColor: '#ADD8E6',
                              borderRadius: 5,
                              width: "50%",
                              alignSelf: "center",
                              alignItems: "center",
                              padding: 7
                            }}
                            onPress={() => eventCompleted(event)}
                          >
                            <Text style={{ color: '#000', fontSize: 15, fontWeight: '600' }}>Complete Event</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))}
                  </View>
                );
              }}
            />
          ) : (
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
              <Text style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#777',
              }}>No Events Found</Text>
            </View>
          )}
        </View>
      }

      <Modal visible={modalVisible} animationType="slide">
        <ScrollView style={styles.modalContainer}>
          <Button title="Close" onPress={() => setModalVisible(false)} />
          {/* <View style={{ marginTop: 12 }}>
            <TextInput
              style={styles.searchBar}
              placeholder="Search completed events"
              value={searchCompleted}
              onChangeText={setSearchCompleted}
            />
          </View> */}

          {Object.keys(groupedEvents).length > 0 ? (
            <FlatList
              data={Object.keys(groupedEvents)}
              keyExtractor={(item) => item}
              renderItem={({ item: date }) => {
                // Filter out completed events
                const filteredEvents = groupedEvents[date].filter(event => event.event_completed);
                console.log('filteredEvents.length:::', filteredEvents.length)
                if (filteredEvents.length === 0) return null; // Don't render empty sections

                return (
                  <View>
                    <Text style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      marginVertical: 10,
                      color: '#4A4A4A',
                      paddingLeft: 10
                    }}>
                      {date}
                    </Text>

                    {filteredEvents.map(event => (
                      <View key={event.id} style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 15,
                        marginVertical: 8,
                        borderWidth: 1,
                        borderColor: '#ddd',
                        borderRadius: 10,
                        backgroundColor: '#f8f9fa',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 3
                      }}>
                        <View style={{ flex: 1, paddingBottom: 5 }}>
                          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>{event.name}</Text>
                          <Text style={{ fontSize: 14, color: '#555', marginTop: 10 }}>Organizer: {event.organizer}</Text>
                          <Text style={{ fontSize: 14, color: '#555', marginTop: 5 }}>Date: {event?.date}</Text>
                          <Text style={{ fontSize: 14, color: '#555', marginTop: 5 }}>Time: {event?.time}</Text>
                          <Text style={{ fontSize: 14, color: '#555', marginTop: 5 }}>Phone Number: {event.phone}</Text>
                          <Text style={{ fontSize: 14, color: '#555', marginTop: 5 }}>Payment Mode: {event?.paymentMode}</Text>
                          {/* <Text style={{ fontSize: 14, color: '#555', marginTop: 5 }}>Payment: {event?.paymentStatus}</Text> */}
                        </View>

                        <View style={{ alignItems: "flex-end", justifyContent: 'space-between' }}>
                          {/* <TouchableOpacity style={{
                            backgroundColor: '#ADD8E6',
                            borderRadius: 25,
                            padding: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 10
                          }} onPress={() => editEvent(event)}>
                            <Image source={require('./assets/edit.png')} style={{ width: 20, height: 20, tintColor: '#00008B' }} />
                          </TouchableOpacity> */}

                          <TouchableOpacity
                            style={{
                              backgroundColor: '#ffcccc',
                              borderRadius: 25,
                              padding: 10,
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                            onPress={() => deleteBooking(event._id)}
                          >
                            <Image source={require('./assets/delete.png')} style={{ width: 20, height: 20, tintColor: '#e74c3c' }} />
                          </TouchableOpacity>
                        </View>

                      </View>
                    ))}
                  </View>
                );
              }}
              contentContainerStyle={{ paddingBottom: 35 }}
            />
          ) : (
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
              <Text style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#777',
              }}>No Events Found</Text>
            </View>
          )}

        </ScrollView>
      </Modal>
      <View style={{ flexDirection: "row", alignSelf: "flex-end", justifyContent: "space-between", width: '100%' , paddingBlock:52}}>
        <TouchableOpacity onPress={() => setModalVisible(true)} >
          <Image source={require('./assets/completed.png')} style={{ height: 70, width: 70, alignSelf: 'flex-end' }}></Image>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('AddBooking')} style={{ bottom: '2%', marginEnd: 10, backgroundColor: "#8A9A5B", borderRadius: 100, height: 53, width: 53, alignSelf: 'flex-end', justifyContent: 'center' }}>
          <Image source={require('./assets/plus.png')} style={{ height: 32, width: 32, alignSelf: 'center' }}></Image>
        </TouchableOpacity>

      </View>

      {/* <Button title="Add Booking" onPress={() => navigation.navigate('AddBooking')} /> */}
    </View>
  );
};

export default ListingScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  searchBar: { height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 10, fontSize: 13, paddingHorizontal: 10, marginBottom: 10 },
  dateHeader: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  eventItem: { padding: 15, marginVertical: 8, borderWidth: 1, borderColor: '#ddd', borderRadius: 5 },
  completedEventItem: { padding: 15, marginVertical: 8, backgroundColor: '#d4edda', borderWidth: 1, borderColor: '#c3e6cb', borderRadius: 5 },
  deleteButton: { backgroundColor: '#e74c3c', padding: 10, borderRadius: 5, width: '40%', marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  modalContainer: { flex: 1, padding: 20, paddingBottom: 300 },
  modalBackground: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContainers: { width: '90%', backgroundColor: '#fff', padding: 20, borderRadius: 10, alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  input: { width: '100%', height: 45, borderColor: '#ccc', borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, marginBottom: 10 },
  dateButton: { backgroundColor: '#3498db', padding: 10, borderRadius: 10, marginBottom: 10 },
  dateButtonText: { color: '#fff', fontWeight: 'bold' },
  modalButtonContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  saveButton: { backgroundColor: '#2ecc71', padding: 12, borderRadius: 10, alignItems: 'center', marginRight: 5 },
  cancelButton: { backgroundColor: '#e74c3c', padding: 12, borderRadius: 10, alignItems: 'center', marginLeft: 5 },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});