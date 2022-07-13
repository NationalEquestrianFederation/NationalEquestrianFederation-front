import { Text, ImageBackground, FlatList, TouchableOpacity, StyleSheet, View, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useState, useEffect } from 'react';
import { globalStyles } from '../../styles/global';
import Card from '../../shared/card';
import AddHorseClub from './AddHorseClub';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

export default function HorseClubs({ navigation }) {

    const serverUrl = process.env.SERVER_URL;

    const [role, setRole]= useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [clubs, setClubs] = useState([]);

    useEffect(() => {
        setRoleName();
        getHorseClubs();
    }, [])

    const setRoleName = async () => {
        var token = await AsyncStorage.getItem('access_token');
        var decodedToken = jwt_decode(token);
        setRole(decodedToken.role);
    }

    const getHorseClubs = () => {
        console.log(process.env.SERVER_URL)
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
        <ImageBackground source={require('../../assets/background.jpg')} style={globalStyles.container} >
            
            <Modal visible={modalOpen} transparent={true}>
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

            {role === "ROLE_NATIONAL_FEDERATION" && (
                <MaterialIcons 
                    name='add' 
                    size={24} 
                    style={styles.addButton}
                    color="rgba(252, 252, 252, 0.8)"
                    onPress={() => setModalOpen(true)} 
                />
            )}
            
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
        padding: 2,
        marginRight: 5,
        alignSelf: 'flex-end',
    },
    modalClose: {
        marginTop: 5,
        marginBottom: 0,
    }
  });