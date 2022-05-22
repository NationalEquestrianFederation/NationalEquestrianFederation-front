import { Text, ImageBackground, FlatList, StyleSheet, View, Modal,TouchableWithoutFeedback, Keyboard } from 'react-native';
import Card from '../shared/card';
import { globalStyles } from '../styles/global';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import AddRider from './AddRider';
import EditRider from './EditRider';

export default function Riders({ navigation }) {

    const serverUrl = "http://10.0.2.2:8080";

    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [riders, setRiders] = useState([])

    useEffect(() => {
        getRiders();
    }, [])

    const getRiders = () => {
        axios.get(serverUrl + "/riders?horseClub=0")
            .then(response => {
                setRiders(response.data);
            })
    }

    const deleteRider = (id) => {
        axios.delete(serverUrl + "/riders/" + id)
            .then(response => {
                getRiders();
            })
    }

    const addRider = (rider) => {
        axios.post(serverUrl + "/riders", rider)
            .then(response => {
                setAddModalOpen(false);
                getRiders();
            })
    }

    const editRider = (rider) => {
        axios.put(serverUrl + "/riders", rider)
            .then(response => {
                setEditModalOpen(false);
                getRiders();
            })
    }

    return (
        <ImageBackground source={require('../assets/background.jpg')} style={globalStyles.container} >

            <Modal visible={addModalOpen}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={globalStyles.modalContent}>
                        <MaterialIcons 
                            name='close' 
                            size={24} 
                            style={{...globalStyles.closeButton, ...globalStyles.modalClose}}
                            onPress={() => setAddModalOpen(false)} />
                        <AddRider addRider={addRider}  />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <MaterialIcons 
                name='add' 
                size={24} 
                style={globalStyles.addButton}
                color="rgba(252, 252, 252, 0.8)"
                onPress={() => setAddModalOpen(true)} />

            <FlatList data={riders} renderItem={({ item }) => (
                <Card>

                    <Modal visible={editModalOpen}>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={globalStyles.modalContent}>
                                <MaterialIcons 
                                    name='close' 
                                    size={24} 
                                    style={{...globalStyles.closeButton, ...globalStyles.modalClose}}
                                    onPress={() => setEditModalOpen(false)} />
                                <EditRider rider={item} editRider={editRider}  />
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>

                    <View style={styles.name}>
                        <Text style={globalStyles.titleText}>{item.name}</Text>
                        <Text style={styles.title}>{item.surname}</Text>
                    </View>
                    <View style={styles.name}>
                        <Text>{item.licence}</Text>
                    </View>

                    <View style={styles.buttons}>
                        <MaterialIcons 
                            name='delete' 
                            size={24} 
                            style={styles.deleteButton} 
                            onPress={() => deleteRider(item.id)} />

                        <MaterialIcons 
                            name='edit' 
                            size={24} 
                            style={styles.deleteButton} 
                            onPress={() => setEditModalOpen(true)} />
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