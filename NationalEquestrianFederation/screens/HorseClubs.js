import { Text, ImageBackground, FlatList, TouchableOpacity, StyleSheet, View, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useState, useEffect } from 'react';
import { globalStyles } from '../styles/global';
import Card from '../shared/card';
import AddHorseClub from './AddHorseClub';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';

export default function HorseClubs({ navigation }) {

    const serverUrl = "http://10.0.2.2:8080";

    const [modalOpen, setModalOpen] = useState(false);
    const [clubs, setClubs] = useState([]);

    useEffect(() => {
        getHorseClubs();
    }, [])

    const getHorseClubs = () => {
        axios.get(serverUrl + "/horseClubs?name=")
            .then(response => {
                setClubs(response.data);
            })
    }

    const horseClubPressHandler = (club) => {
        navigation.navigate('HorseClub', club);
    }

    const addHorseClub = (horseClub) => {
        axios.post(serverUrl + "/horseClubs", horseClub)
            .then(response => {
                setModalOpen(false);
                getHorseClubs();
            })
    }

    return (
        <ImageBackground source={require('../assets/background.jpg')} style={globalStyles.container} >
            
            <Modal visible={modalOpen}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modalContent}>
                        <MaterialIcons 
                            name='close' 
                            size={24} 
                            style={{...styles.closeButton, ...styles.modalClose}}
                            onPress={() => setModalOpen(false)} />
                        <AddHorseClub addHorseClub={addHorseClub}  />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <MaterialIcons 
                name='add' 
                size={24} 
                style={styles.addButton}
                color="rgba(252, 252, 252, 0.8)"
                onPress={() => setModalOpen(true)} />
            
            <FlatList data={clubs} renderItem={({ item }) => (
                <TouchableOpacity onPress={() => horseClubPressHandler(item)} >
                    <Card>
                        <Text style={globalStyles.titleText}>{item.name}</Text>
                        <Text style={styles.place}>{item.address}</Text>
                    </Card>
                </TouchableOpacity>
            )} style={styles.cards}/>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    cards: {
        marginTop: 5
    },
    place: {
        marginTop: 3
    },
    modalContent: {
        flex: 1,
        backgroundColor: 'rgba(200, 200, 200, 0.8)'
    },
    addButton: {
        marginTop: 10,
        borderWidth: 1,
        padding: 2,
        borderRadius: 10,
        marginRight: '5%',
        alignSelf: 'flex-end',
    },
    closeButton: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'lightgray',
        padding: 2,
        borderRadius: 10,
        marginRight: 5,
        alignSelf: 'flex-end',
    },
    modalClose: {
        marginTop: 5,
        marginBottom: 0,
    }
  });