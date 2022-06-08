import { Text, ImageBackground, FlatList, StyleSheet, View, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Card from '../../../shared/card';
import { globalStyles } from '../../../styles/global';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import AddRidingSchoolOffer from './AddRidingSchoolOffer';
import EditRidingSchoolOffer from './EditRidingSchoolOffer';

export default function RidingSchoolOffers({ navigation }) {

    const serverUrl = process.env.SERVER_URL;

    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [offers, setOffers] = useState([]);
    const [editingOffer, setEdditingOffer] = useState({});

    useEffect(() => {
        getOffers();
    }, [])

    const getOffers = () => {
        console.log(process.env.SERVER_URL);
        axios.get(serverUrl + "/ridingSchoolOffers?horseClub=0")
            .then(response => {
                setOffers(response.data);
            })
    }

    const deleteOffer = (id) => {
        axios.delete(serverUrl + "/ridingSchoolOffers/" + id)
            .then(response => {
                getOffers();
            })
    }

    const addOffer = (offer) => {
        axios.post(serverUrl + "/ridingSchoolOffers", offer)
            .then(response => {
                setAddModalOpen(false);
                getOffers();
            })
    }

    const editOffer = (offer) => {
        axios.put(serverUrl + "/ridingSchoolOffers", offer)
            .then(response => {
                setEditModalOpen(false);
                getOffers();
            })
    }

    const editForm = (offer) => {
        setEdditingOffer(offer);
        setEditModalOpen(true);
    }

    return (
        <ImageBackground source={require('../../../assets/background.jpg')} style={globalStyles.container} >

            <Modal visible={addModalOpen}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={globalStyles.modalContent}>
                        <MaterialIcons 
                            name='close' 
                            size={24} 
                            style={{...globalStyles.closeButton, ...globalStyles.modalClose}}
                            onPress={() => setAddModalOpen(false)} />
                        <AddRidingSchoolOffer addOffer={addOffer}  />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <MaterialIcons 
                name='add' 
                size={24} 
                style={globalStyles.addButton}
                color="rgba(252, 252, 252, 0.8)"
                onPress={() => setAddModalOpen(true)} />

            <FlatList data={offers} renderItem={({ item }) => (
                <Card>

                    <Modal visible={editModalOpen}>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={globalStyles.modalContent}>
                                <MaterialIcons 
                                    name='close' 
                                    size={24} 
                                    style={{...globalStyles.closeButton, ...globalStyles.modalClose}}
                                    onPress={() => setEditModalOpen(false)} />
                                <EditRidingSchoolOffer offer={editingOffer} editOffer={editOffer}  />
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>

                    <Text style={globalStyles.titleText}>{item.name}</Text>
                    <View style={styles.content}>
                        <Text style={styles.label}>Start</Text>
                        <Text >{item.startDate}</Text>
                        <Text></Text>
                        <Text style={styles.label}>End</Text>
                        <Text >{item.endDate}</Text>
                        <Text></Text>
                        <Text style={styles.label}>Price</Text>
                        <Text>{item.price}e</Text>
                    </View>

                    <View style={styles.buttons}>
                        <MaterialIcons 
                            name='delete' 
                            size={24} 
                            style={styles.deleteButton} 
                            onPress={() => deleteOffer(item.id)} />

                        <MaterialIcons 
                            name='edit' 
                            size={24} 
                            style={styles.deleteButton} 
                            onPress={() => editForm(item)} />
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
    content: {
        paddingTop: 10,
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#acaeb0',
    },
    label: {
        fontSize: 15,
        fontWeight: 'bold'
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