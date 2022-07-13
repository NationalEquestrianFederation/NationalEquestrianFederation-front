import { Text, ImageBackground, FlatList, StyleSheet, TouchableWithoutFeedback, Keyboard, Modal, View, Image } from 'react-native';
import Card from '../../shared/card';
import { globalStyles } from '../../styles/global';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import AddHorse from './AddHorse';
import EditHorse from './EditHorse';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import { ScrollView } from 'react-native-gesture-handler';

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

            <ScrollView style={styles.cards}>
                <Card>
                    <View style={styles.horseData}>
                        <View >
                            <Text style={styles.titleLabel}>Quincon Z</Text>
                            <Text style={styles.label}>* Gender</Text>
                            <Text >stallion</Text>
                            <Text style={styles.label}>* Year of birth</Text>
                            <Text>2006</Text>
                            <Text style={styles.label}>* Breed</Text>
                            <Text>Zaingersheide</Text>
                            <Text style={styles.label}>* Owner</Text>
                            <Text>Miloš Krajić</Text>
                        </View>
                        <Image style={styles.image} source={require('../../assets/Q1.jpeg')}/>
                    </View>
                </Card>
                <Card>
                    <View style={styles.horseData}>
                        <View >
                            <Text style={styles.titleLabel}>Easy Gold</Text>
                            <Text style={styles.label}>* Gender</Text>
                            <Text >mare</Text>
                            <Text style={styles.label}>* Year of birth</Text>
                            <Text>2012</Text>
                            <Text style={styles.label}>* Breed</Text>
                            <Text>KWPN</Text>
                            <Text style={styles.label}>* Owner</Text>
                            <Text>Petar Mladenović</Text>
                        </View>
                        <Image style={styles.image} source={require('../../assets/Easy.jpg')}/>
                    </View>
                </Card>
                <Card>
                    <View style={styles.horseData}>
                        <View >
                            <Text style={styles.titleLabel}>Contender</Text>
                            <Text style={styles.label}>* Gender</Text>
                            <Text >gelding</Text>
                            <Text style={styles.label}>* Year of birth</Text>
                            <Text>2017</Text>
                            <Text style={styles.label}>* Breed</Text>
                            <Text>Holstein</Text>
                            <Text style={styles.label}>* Owner</Text>
                            <Text>Jovana Adamović</Text>
                        </View>
                        <Image style={styles.image} source={require('../../assets/horse3.jpg')}/>
                    </View>
                </Card>
            </ScrollView>

            
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
    horseData: {
        flexDirection: 'row'
    },
    image: {
        marginLeft: '10%',
        marginTop: '17%',
        maxWidth: '52%',
        maxHeight: 200,
        borderRadius: 10
    }
})