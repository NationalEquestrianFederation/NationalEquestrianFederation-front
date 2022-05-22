import { Text, ImageBackground, StyleSheet, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback, Keyboard, View } from 'react-native';
import { globalStyles } from '../styles/global';
import Card from '../shared/card';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import EditHorseClub from './EditHorseClub';
import axios from 'axios';

export default function ChoosenHorseClub({ navigation }) {
    
    const serverUrl = "http://10.0.2.2:8080";
    const [modalOpen, setModalOpen] = useState(false);

    const [club, setClub] = useState({
        id: navigation.getParam('id'),
        name: navigation.getParam('name'),
        address: navigation.getParam('address'),
        description: navigation.getParam('description'),
        email: navigation.getParam('email'),
        phone: navigation.getParam('phone')
    });

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
        <ImageBackground source={require('../assets/background.jpg')} style={globalStyles.container} >
            <TouchableOpacity onPress={() => navigation.navigate('Horses')}>
                <Card>
                    <Text style={globalStyles.titleText}>Horses</Text>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Riders')}>
                <Card>
                    <Text style={globalStyles.titleText}>Riders</Text>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('RidingSchoolOffers')}>
                <Card>
                    <Text style={globalStyles.titleText}>Riding School</Text>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Trainers')}>
                <Card>
                    <Text style={globalStyles.titleText}>Trainers</Text>
                </Card>
            </TouchableOpacity>

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

                <MaterialIcons 
                    name='edit' 
                    size={24} 
                    style={styles.editButton}
                    onPress={() => setModalOpen(true)} />

                    <Text style={styles.label}>Name</Text>
                    <Text>{club.name}</Text>
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
    label: {
        marginTop: 10,
        fontSize: 17,
        fontWeight: 'bold'
    },
    editButton: {
        alignSelf: 'flex-end'
    }
})