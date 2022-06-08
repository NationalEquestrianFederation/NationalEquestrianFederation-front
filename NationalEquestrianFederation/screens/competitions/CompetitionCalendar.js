import { View, Text, StyleSheet, ImageBackground, Modal, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native';
import { Calendar, CaledarList, Agenda } from 'react-native-calendars';
import { globalStyles } from '../../styles/global';
import axios from 'axios';
import { useState, useEffect } from 'react';
import AddCompetition from './AddCompetition';
import { MaterialIcons } from '@expo/vector-icons';
import Card from '../../shared/card';
import CalendarWeek from '../../shared/calendarWeek';

export default function CompetitionCalendar({ navigation }) {

    const serverUrl = process.env.SERVER_URL;

    const [competitions, setCompetitions] = useState([]);
    const [dates, setDates] = useState([]);
    const [weekDates, setWeekDates] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [competitionsInDay, setCompetitionsInDay] = useState([]);

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"];
    const weeks = [0, 1, 2, 3, 4, 5];
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const [role, setRole] = useState('nationalFederation');    

    useEffect(() => {
        getDates();
    }, [])

    const getDates = () => {
        console.log(process.env.SERVER_URL)
        axios.get(serverUrl + "/calendar?month=4&year=2022")
            .then(response => {
                setDates(response.data);
            })
    }

    const datePressHandler = (day) => {
        console.log(day.dateString)
        navigation.navigate('ChoosenDate', day)
    }

    const getWeekDates = (week) => {
        var begining = week + (6 * week);
        var end = week + (6 * week) + 7;
        return dates.slice(begining, end);
    }

    const addCompetition = (competition) => {
        axios.post(serverUrl + "/competitions", competition)
            .then(response => {
                setModalOpen(false);
            })
    }

    return (
        <ImageBackground source={require('../../assets/background.jpg')} style={globalStyles.container} >
            <View style={globalStyles.container}>

            <Modal visible={modalOpen}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={globalStyles.modalContent}>
                        <MaterialIcons 
                            name='close' 
                            size={24} 
                            style={{...globalStyles.closeButton, ...globalStyles.modalClose}}
                            onPress={() => setModalOpen(false)} />
                        <AddCompetition addCompetition={addCompetition}  />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {(role === 'nationalFederation' || role === 'cityFederation') && (
                <MaterialIcons 
                    name='add' 
                    size={24} 
                    style={globalStyles.addButton}
                    color="rgba(252, 252, 252, 0.8)"
                    onPress={() => setModalOpen(true)} 
                />
            )}

            <Card >
                <View style={styles.calendarHeader}>
                    <Text>May 2022</Text>
                </View>
                <FlatList data={weekDays} horizontal style={styles.week} renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.day}>{item}</Text>
                    </View>
                    )} 
                />
                <FlatList data={weeks} style={styles.weekDates} renderItem={({ item }) => (
                    <CalendarWeek dates={getWeekDates(item)} week={item} navigation={navigation} />
                    )} 
                />
            </Card>

            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    calendar: {
        marginTop: 15,
        height: '75%',
        width: '95%',
        alignSelf: 'center',
        backgroundColor: 'white',
        opacity: 0.9,
        borderRadius: 10
    },
    calendarHeader: {
        alignSelf: 'center',
        flexDirection: 'row'
    },
    week: {
        marginLeft: -30,
        alignSelf: 'center'
    },
    card: {
        width: 47,
        height: 40,
        alignItems: 'flex-end',
        paddingTop: 12,
        paddingLeft: 5,
        paddingRight: 5,
    },
    day: {
        color: 'gray',
        fontWeight: 'bold'
    },
    weekDates: {
        marginLeft: -12,
    }
})