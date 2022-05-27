import { View, Text, StyleSheet, ImageBackground, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Calendar, CaledarList, Agenda } from 'react-native-calendars';
import { globalStyles } from '../styles/global';
import axios from 'axios';
import { useState, useEffect } from 'react';
import AddCompetition from './AddCompetition';
import { MaterialIcons } from '@expo/vector-icons';

export default function CompetitionCalendar({ navigation }) {

    const serverUrl = "http://10.0.2.2:8080";

    const [competitions, setCompetitions] = useState([]);
    const [dates, setDates] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [competitionsInDay, setCompetitionsInDay] = useState([]);
    

    useEffect(() => {
        getCompetitions();
    }, [])

    const getCompetitions = () => {
        axios.get(serverUrl + "/competitions")
            .then(response => {
                setCompetitions(response.data);
            })
    }

    const getMarkedDates = () => {
        return {'2022-05-19': {periods: [{startingDay: true, endingDay: true, color: 'blur'}]}}
    }

    const datePressHandler = (day) => {
        console.log(day.dateString)
        navigation.navigate('ChoosenDate', day)
    }

    const addCompetition = (competition) => {
        axios.post(serverUrl + "/competitions", competition)
            .then(response => {
                setModalOpen(false);
                getCompetitions();
            })
    }

    return (
        <ImageBackground source={require('../assets/background.jpg')} style={globalStyles.container} >
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

            <MaterialIcons 
                name='add' 
                size={24} 
                style={globalStyles.addButton}
                color="rgba(252, 252, 252, 0.8)"
                onPress={() => setModalOpen(true)} />

            <Calendar style={styles.calendar}
                markingType="multi-period"
                markedDates={{
                    '2022-05-19': {
                        periods: [
                            {startingDay: true, endingDay: false, color: 'blue'},
                            {startingDay: true, endingDay: false, color: 'red'}
                        ]
                    },
                    '2022-05-20': {
                        periods: [
                            {startingDay: false, endingDay: true, color: 'blue'},
                            {startingDay: false, endingDay: true, color: 'red'}
                        ]
                    },
                    '2022-05-30': {
                        periods: []
                    }
                }}
            />

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
    }
})