import { View, Text, StyleSheet, ImageBackground, Modal, TouchableWithoutFeedback, Keyboard, FlatList, TouchableOpacity } from 'react-native';
import { Calendar, CaledarList, Agenda } from 'react-native-calendars';
import { globalStyles } from '../../styles/global';
import axios from 'axios';
import { useState, useEffect } from 'react';
import AddCompetition from './AddCompetition';
import { MaterialIcons } from '@expo/vector-icons';
import Card from '../../shared/card';
import CalendarWeek from '../../shared/calendarWeek';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

export default function CompetitionCalendar({ navigation }) {

    const serverUrl = process.env.SERVER_URL;

    const [role, setRole] = useState("");
    const [competitions, setCompetitions] = useState([]);
    const [dates, setDates] = useState([]);
    const [weekDates, setWeekDates] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [competitionsInDay, setCompetitionsInDay] = useState([]);
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"];
    const weeks = [0, 1, 2, 3, 4, 5];
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    useEffect(() => {
        setRoleName();
        getDates();
    }, [month])

    const setRoleName = async () => {
        var token = await AsyncStorage.getItem('access_token');
        var decodedToken = jwt_decode(token);
        setRole(decodedToken.role);
    }

    const getDates = () => {
        console.log(process.env.SERVER_URL)
        axios.get(serverUrl + "/calendar?month=" + month + "&year=" + year)
            .then(response => {
                setDates(response.data);
            })
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
                getDates();
            })
    }

    const previousMonth = () => {
        console.log(month)
        if(month - 1 == 0) {
            setMonth(12);
            setYear(year - 1);
        } else {
            setMonth(month - 1);
        }
    }

    const nextMonth = () => {
        if(month + 1 == 12) {
            setMonth(1);
            setYear(year + 1);
        } else {
            setMonth(month + 1);
        }
    }

    return (
        <ImageBackground source={require('../../assets/background.jpg')} style={globalStyles.container} >
            <View style={globalStyles.container}>

            <Modal visible={modalOpen} transparent={true} >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={globalStyles.modalContent}>
                        <MaterialIcons 
                            name='close' 
                            size={24} 
                            style={{...globalStyles.closeButton, ...globalStyles.modalClose}}
                            onPress={() => setModalOpen(false)}
                        />
                        <AddCompetition addCompetition={addCompetition}  />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {(role === 'ROLE_NATIONAL_FEDERATION' || role === 'ROLE_CITY_FEDERATION') && (
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
                    <MaterialIcons 
                        name='arrow-back' 
                        size={20} 
                        onPress={() => previousMonth()}
                        style={styles.previousMonth}
                    />
                    <Text>{months[month]} {year}</Text>
                    <MaterialIcons 
                        name='arrow-forward' 
                        size={20} 
                        onPress={() => nextMonth()}
                        style={styles.nextMonth}
                    />
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

            <Card>
                <View style={styles.legend}>
                    <View style={styles.jumping}></View>
                    <Text>Jumping</Text>
                </View>
                <View style={styles.legend}>
                    <View style={styles.dressage}></View>
                    <Text>Dressage</Text>
                </View>
                <View style={styles.legend}>
                    <View style={styles.eventing}></View>
                    <Text>Eventing</Text>
                </View>
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
    },
    previousMonth: {
        marginRight: 25
    },
    nextMonth: {
        marginLeft: 25
    },
    legend: {
        flexDirection: 'row',
        marginTop: 5
    },  
    jumping: {
        height: 1,
        width: 45,
        borderTopColor: 'lightgreen',
        borderTopWidth: 7,
        marginTop: 8,
        marginRight: 5
    },
    dressage: {
        height: 1,
        width: 45,
        borderTopColor: 'skyblue',
        borderTopWidth: 7,
        marginTop: 8,
        marginRight: 5
    },
    eventing: {
        height: 1,
        width: 45,
        borderTopColor: 'pink',
        borderTopWidth: 7,
        marginTop: 8,
        marginRight: 5
    }
})