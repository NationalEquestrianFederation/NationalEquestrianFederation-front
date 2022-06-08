import { Text, ImageBackground, FlatList, StyleSheet, View, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Card from '../../shared/card';
import { globalStyles } from '../../styles/global';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import AddTrainer from './AddTrainer';
import EditTrainer from './EditTrainer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

export default function Trainers({ navigation }) {

    const serverUrl = process.env.SERVER_URL;

    const [role, setRole] = useState("");
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [trainers, setTrainers] = useState([]);
    const [editingTrainer, setEditingTrainer] = useState({});

    useEffect(() => {
        setRoleName();
        getTrainers();
    }, [])

    const setRoleName = async () => {
        var token = await AsyncStorage.getItem('access_token');
        var decodedToken = jwt_decode(token);
        setRole(decodedToken.role);
    }

    const getTrainers = () => {
        console.log(process.env.SERVER_URL);
        axios.get(serverUrl + "/trainers?horseClub=0")
            .then(response => {
                setTrainers(response.data);
            })
    }

    const deleteTrainer = (id) => {
        axios.delete(serverUrl + "/trainers/" + id)
            .then(response => {
                getTrainers();
            })
    }

    const editTrainer = (trainer) => {
        axios.put(serverUrl + "/trainers", trainer)
            .then(response => {
                setEditModalOpen(false);
                getTrainers();
            })
    }

    const editForm = (trainer) => {
        setEditingTrainer(trainer);
        setEditModalOpen(true);
    }

    const addTrainer = (trainer) => {
        axios.post(serverUrl + "/trainers", trainer)
            .then(response => {
                setAddModalOpen(false);
                getTrainers();
            })
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
                        <AddTrainer addTrainer={addTrainer}  />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {role === "ROLE_NATIONAL_FEDERATION" && (
                <MaterialIcons 
                    name='add' 
                    size={24} 
                    style={globalStyles.addButton}
                    color="rgba(252, 252, 252, 0.8)"
                    onPress={() => setAddModalOpen(true)}
                />
            )}

            <FlatList data={trainers} renderItem={({ item }) => (
                <Card>

                    <Modal visible={editModalOpen}>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={globalStyles.modalContent}>
                                <MaterialIcons 
                                    name='close' 
                                    size={24} 
                                    style={{...globalStyles.closeButton, ...globalStyles.modalClose}}
                                    onPress={() => setEditModalOpen(false)} />
                                <EditTrainer trainer={editingTrainer} editTrainer={editTrainer}  />
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>

                    <View style={styles.name}>
                        <Text style={globalStyles.titleText}>{item.name}</Text>
                        <Text style={styles.title}>{item.surname}</Text>
                    </View>

                    <View style={styles.buttons}>
                        {role === "ROLE_NATIONAL_FEDERATION" && (
                            <MaterialIcons 
                                name='delete' 
                                size={24} 
                                style={styles.deleteButton} 
                                onPress={() => deleteTrainer(item.id)}
                            />
                        )}

                        {role === "ROLE_NATIONAL_FEDERATION" && (
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
    name: {
        flexDirection: 'row'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'italic',
        marginLeft: 3
    },
    buttons: {
        flexDirection: 'row',
        alignSelf: 'flex-end'
    },  
    deleteButton: {
        alignSelf: 'flex-end',
        marginLeft: 10
    }

})