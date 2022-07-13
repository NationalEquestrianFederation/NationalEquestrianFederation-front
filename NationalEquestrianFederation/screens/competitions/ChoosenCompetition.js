import { StyleSheet, View, ImageBackground, ScrollView, Text, TouchableOpacity, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Card from '../../shared/card';
import { globalStyles } from '../../styles/global';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import CompetitionApplication from './CompetitionApplication';

export default function ChoosenCompetition({ navigation }) {

    const serverUrl = process.env.SERVER_URL;

    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
    }, [])

    const apply = (application) => {
        console.log(application);
        var newApplication = {
            riderId: application.riderId,
            horseId: application.horseId,
            competitionId: navigation.getParam('id')
        }
        console.log(newApplication)

        axios.post(serverUrl + "/competitionApplication", newApplication)
            .then(response => {
                setModalOpen(false);
            })
    }

    return (
        <ImageBackground source={require('../../assets/background.jpg')} style={globalStyles.container} >
            <View style={styles.container}>

                <Modal visible={modalOpen} transparent={true}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={globalStyles.modalContent}>
                            <MaterialIcons 
                                name='close' 
                                size={24} 
                                style={{...globalStyles.closeButton, ...globalStyles.modalClose}}
                                onPress={() => setModalOpen(false)}
                            />
                            <CompetitionApplication apply={apply} competition={navigation.getParam('name')} />
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

                <TouchableOpacity onPress={() => setModalOpen(true)}>
                    <Text style={styles.apply}>APPLY</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('CompetitionApplications', navigation.getParam('id'))}>
                    <Text style={styles.apply}>APPLICATIONS</Text>
                </TouchableOpacity>
                
                <Card>
                    <ScrollView>
                        <Text style={styles.titleLabel}>{navigation.getParam('name')}</Text>
                        <View>
                                {navigation.getParam('discipline') === "jumping" && (
                                    <View style={styles.jumping}></View>
                                )}
                                {navigation.getParam('discipline') === "dressage" && (
                                    <View style={styles.dressage}></View>
                                )}
                                {navigation.getParam('discipline') === "eventing" && (
                                    <View style={styles.eventing}></View>
                                )}
                        </View>
                        <Text style={styles.label}>* Discipline: </Text>
                        <Text>{navigation.getParam('discipline')}</Text>
                        <Text style={styles.label}>* Start date: </Text>
                        <Text>{navigation.getParam('startDate')}</Text>
                        <Text style={styles.label}>* End date: </Text>
                        <Text>{navigation.getParam('endDate')}</Text>
                        <Text style={styles.label}>* Place: </Text>
                        <Text>{navigation.getParam('location')}</Text>

                        <View style={styles.hr}></View>

                        <Text style={styles.label}>* Officials: </Text>
                        <View style={styles.officials}>
                            <Text>- Nikola Vukičević</Text> 
                            <Text>- Marina Jovanović</Text> 
                        </View>

                    </ScrollView>
                </Card>
            </View>
            
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        marginTop: 15
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
    apply: {
        color: 'rgba(200, 200, 200, 0.8)',
        fontSize: 17,
        alignSelf: 'flex-end',
        fontWeight: 'bold',
        marginRight: 20
    },
    jumping: {
        height: 1,
        width: 40,
        borderTopColor: 'lightgreen',
        borderTopWidth: 4,
        marginBottom: 2
    },
    dressage: {
        height: 1,
        width: 40,
        borderTopColor: 'skyblue',
        borderTopWidth: 4,
        marginBottom: 2
    },
    eventing: {
        height: 1,
        width: 40,
        borderTopColor: 'pink',
        borderTopWidth: 4,
        marginBottom: 2
    }, 
    hr: {
        marginTop: 20,
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    officials: {
        marginLeft: 40
    }
})