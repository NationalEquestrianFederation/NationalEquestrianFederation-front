import { Text, ImageBackground, FlatList, StyleSheet, TouchableWithoutFeedback, Keyboard, Modal, View } from 'react-native';
import Card from '../../shared/card';
import { globalStyles } from '../../styles/global';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import AddHorse from './AddHorse';
import EditHorse from './EditHorse';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

export default function Horses({ navigation }) {

    const serverUrl = process.env.SERVER_URL;

    const horseClub = navigation.getParam('id');
    const [role, setRole] = useState("");
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [horses, setHorses] = useState([]);
    const [editingHorse, setEditingHorse] = useState({});

    useEffect(() => {
        setRoleName();
        getHorses();
    }, [])

    const setRoleName = async () => {
        var token = await AsyncStorage.getItem('access_token');
        var decodedToken = jwt_decode(token);
        setRole(decodedToken.role);
    }

    const getHorses = () => {
        console.log(process.env.SERVER_URL)
        console.log(navigation.getParam('id'))
        axios.get(serverUrl + "/horses?horseClub=" + horseClub)
            .then(response => {
                setHorses(response.data);
            })
    }

    const addHorse = (horse) => {
        console.log(horse);
        var horse = {
            horseClubId: navigation.getParam('id'),
            name: horse.name,
            gender: horse.gender,
            owner: horse.owner,
            yearOfBirth: horse.yearOfBirth
        }

        axios.post(serverUrl + "/horses", horse)
            .then(response => {
                setAddModalOpen(false);
                getHorses();
            })
    }

    const deleteHorse = (id) => {
        axios.delete(serverUrl + "/horses/" + id)
            .then(response => {
                getHorses();
            })
    }

    const editHorse = (horse) => {
        axios.put(serverUrl + "/horses", horse)
            .then(response => {
                setEditModalOpen(false);
                getHorses();
            })
    }

    const editForm = (horse) => {
        setEditingHorse(horse);
        setEditModalOpen(true);
    }

    return (
        <ImageBackground source={require('../../assets/background.jpg')} style={globalStyles.container} >

            <Modal visible={addModalOpen}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={globalStyles.modalContent}>
                        <MaterialIcons 
                            name='close' 
                            size={24} 
                            style={{...globalStyles.closeButton, ...globalStyles.modalClose}}
                            onPress={() => setAddModalOpen(false)} />
                        <AddHorse addHorse={addHorse}  />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {role === "ROLE_HORSE_CLUB" && (
                <MaterialIcons 
                    name='add' 
                    size={24} 
                    style={globalStyles.addButton}
                    color="rgba(252, 252, 252, 0.8)"
                    onPress={() => setAddModalOpen(true)} 
                />
            )}

            <FlatList data={horses} renderItem={({ item }) => (
                <Card>

                    <Modal visible={editModalOpen}>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={globalStyles.modalContent}>
                                <MaterialIcons 
                                    name='close' 
                                    size={24} 
                                    style={{...styles.closeButton, ...styles.modalClose}}
                                    onPress={() => setEditModalOpen(false)} />
                                <EditHorse horse={editingHorse} editHorse={editHorse}  />
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                
                    <Text style={styles.titleLabel}>{item.name}</Text>
                    <Text style={styles.label}>* Gender</Text>
                    <Text >{item.gender}</Text>
                    <Text style={styles.label}>* Year of birth</Text>
                    <Text>{item.yearOfBirth}</Text>
                    <Text style={styles.label}>* Owner</Text>
                    <Text>{item.owner}</Text>

                    <View style={styles.buttons}>
                        {role === "ROLE_HORSE_CLUB" && (
                            <MaterialIcons 
                                name='delete' 
                                size={24} 
                                style={styles.deleteButton} 
                                onPress={() => deleteHorse(item.id)}
                            />
                        )}

                        {role === "ROLE_HORSE_CLUB" && (
                            <MaterialIcons 
                                name='edit' 
                                size={24} 
                                style={styles.deleteButton} 
                                onPress={() => editForm(item)}
                            />
                        )}
                        
                    </View>

                </Card>
            )} style={styles.cards}/>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    cards: {
        marginTop: 5
    },
    buttons: {
        flexDirection: 'row',
        alignSelf: 'flex-end'
    },  
    deleteButton: {
        alignSelf: 'flex-end',
        marginLeft: 10
    },
    title: {
        fontSize: 12,
        color: 'white',
        marginLeft: 17,
        marginTop: -3,
        fontStyle: 'italic'
    },  
    titleLabel: {
        fontSize: 25,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    label: {
        marginTop: 10,
        fontSize: 17,
        fontWeight: 'bold'
    },
})