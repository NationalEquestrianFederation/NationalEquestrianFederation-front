import { Text, ImageBackground, FlatList, TouchableOpacity, StyleSheet, View, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useState } from 'react';
import { globalStyles } from '../styles/global';
import Card from '../shared/card';
import AddHorseClub from './AddHorseClub';
import { MaterialIcons } from '@expo/vector-icons';

export default function HorseClubs({ navigation }) {

    const [modalOpen, setModalOpen] = useState(false);
    const [clubs, setClubs] = useState([
        { name: 'KK Viking', place: 'Novi Sad', description: 'Mi smo VIKING', key: 1 },
        { name: 'KK Granicar', place: 'Belgrade', description: 'Mi smo GRANICAR', key: 2 }

    ])

    const horseClubPressHandler = (club) => {
        navigation.navigate('HorseClub', club);
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
                        <AddHorseClub  />
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
                        <Text style={styles.place}>{item.place}</Text>
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