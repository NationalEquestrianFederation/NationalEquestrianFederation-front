import { Text, ImageBackground, StyleSheet, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback, Keyboard, View, Image } from 'react-native';
import { globalStyles } from '../../styles/global';
import Card from '../../shared/card';
import Icon from '../../shared/icon';
import { MaterialIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import EditHorseClub from './EditHorseClub';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

export default function ChoosenHorseClub({ navigation }) {
    
    const serverUrl = process.env.SERVER_URL;

    const [role, setRole] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    const [club, setClub] = useState({
        id: navigation.getParam('id'),
        name: navigation.getParam('name'),
        address: navigation.getParam('address'),
        description: navigation.getParam('description'),
        email: navigation.getParam('email'),
        phone: navigation.getParam('phone'),
        longitude: navigation.getParam('longitude'),
        latitude: navigation.getParam('latitude')
    });

    useEffect(() => {
        console.log(process.env.SERVER_URL);
        setRoleName();
    }, [])

    const setRoleName = async () => {
        var token = await AsyncStorage.getItem('access_token');
        var decodedToken = jwt_decode(token);
        setRole(decodedToken.role);
    }

    const editHorseClub = (club) => {
        axios.put(serverUrl + "/horseClubs", club)
            .then(response => {
                setModalOpen(false);
                getHorseClub();
            })
    }

    const getHorseClub = () => {
        axios.get(serverUrl + "/horseClubs/" + club.id)
            .then(response => {
                setClub(response.data);
            })
    }

    return (
        <ImageBackground source={require('../../assets/background.jpg')} style={globalStyles.container} >
            <View style={styles.icons}>
                <TouchableOpacity onPress={() => navigation.navigate('Horses', club)} >
                    <Icon>
                        <Image source={require('../../assets/horse-icon.png')}/>
                    </Icon>
                    <Text style={styles.title}>Horses</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Riders', club)}>
                    <Icon>
                        <Image style={styles.rider} source={require('../../assets/rider-icon.png')}/>
                    </Icon>
                    <Text style={styles.title}>Riders</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('RidingSchoolOffers', club)}>
                    <Icon>
                        <Image style={styles.ridingSchool} source={require('../../assets/riding-school-icon.png')}/>
                    </Icon>
                    <Text style={styles.title}>Riding</Text>
                    <Text style={styles.title}>School</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Trainers', club)}>
                    <Icon>
                        <Image style={styles.rider} source={require('../../assets/trainer-icon.png')}/>
                    </Icon>
                    <Text style={styles.title}>Trainers</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('HorseClubLocation', club)}>
                    <Icon>
                        <MaterialIcons 
                            name='location-pin' 
                            size={28} 
                        />
                    </Icon>
                    <Text style={styles.title}>Location</Text>
                </TouchableOpacity>
            </View>

            <Modal visible={modalOpen}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modalContent}>
                        <MaterialIcons 
                            name='close' 
                            size={24} 
                            style={{...styles.closeButton, ...styles.modalClose}}
                            onPress={() => setModalOpen(false)} />
                        <EditHorseClub club={club} editHorseClub={editHorseClub}  />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <ScrollView>
                <Card>

                    {role === "ROLE_HORSE_CLUB" && (
                        <MaterialIcons 
                            name='edit' 
                            size={24} 
                            style={styles.editButton}
                            onPress={() => setModalOpen(true)}
                        />
                    )}

                    <Text style={styles.titleLabel}>{club.name}</Text>
                    <Text style={styles.label}>Location</Text>
                    <Text>{club.address}</Text>
                    <Text style={styles.label}>Email</Text>
                    <Text>{club.email}</Text>
                    <Text style={styles.label}>Phone</Text>
                    <Text>{club.phone}</Text>
                    <Text style={styles.label}>Something about us</Text>
                    <Text>{club.description}</Text>
                </Card>
            </ScrollView>
        </ImageBackground>
    )

}

const styles = StyleSheet.create({
    icons: {
        marginLeft: -5,
        marginTop: 10,
        flexDirection: 'row',
        marginBottom: 20,
        alignSelf: 'center'
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
    rider: {
        width: 29,
        height: 29
    },
    ridingSchool: {
        width: 28,
        height: 28
    },
    label: {
        marginTop: 10,
        fontSize: 17,
        fontWeight: 'bold'
    },
    editButton: {
        alignSelf: 'flex-end'
    }
})