import { Text, ImageBackground, FlatList, StyleSheet, View, Modal, TouchableOpacity, Keyboard } from 'react-native';
import Card from '../../shared/card';
import { globalStyles } from '../../styles/global';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

export default function CompetitionRequests({ navigation }) {

    const serverUrl = process.env.SERVER_URL;

    const [requests, setRequests] = useState([]);

    useEffect(() => {
        //setRoleName();
        getRequests();
    }, [])

    const setRoleName = async () => {
        var token = await AsyncStorage.getItem('access_token');
        var decodedToken = jwt_decode(token);
        setRole(decodedToken.role);
    }

    const getRequests = () => {
        var requests = [
            {
                id: 1,
                federation: 'Novosadski konjički savez',
                competitionName: 'Prvenstvo Vojvodine',
                competitionLocation: 'Novosadski sajam',
                competitionStartDate: '28-07-2022',
                competitionEndDate: '29-07-2022',
                competitionOrganizer: 'Novosadski konjički savez',
                competitionDiscipline: 'dressage'
            }
        ]
        setRequests(requests)
    }

    return (
        <ImageBackground source={require('../../assets/background.jpg')} style={globalStyles.container} >

            <FlatList data={requests} renderItem={({ item }) => (
                <Card>

                    <Text style={styles.titleLabel}>{item.competitionName}</Text>
                    <View>
                        {item.competitionDiscipline === "jumping" && (
                            <View style={styles.jumping}></View>
                        )}
                        {item.competitionDiscipline === "dressage" && (
                            <View style={styles.dressage}></View>
                        )}
                        {item.competitionDiscipline === "eventing" && (
                            <View style={styles.eventing}></View>
                        )}
                    </View>

                    <Text style={styles.label}>* Requested by:</Text>
                    <Text>{item.federation}</Text>
                    <Text style={styles.label}>* Start date</Text>
                    <Text>{item.competitionStartDate}</Text>
                    <Text style={styles.label}>* End date</Text>
                    <Text>{item.competitionEndDate}</Text>
                    <Text style={styles.label}>* Discipline</Text>
                    <Text>{item.competitionDiscipline}</Text>
                    <Text style={styles.label}>* Location</Text>
                    <Text>{item.competitionLocation}</Text>
                    <Text style={styles.label}>* Organizer</Text>
                    <Text>{item.competitionOrganizer}</Text>

                    <View style={styles.hr}></View>

                        <Text style={styles.label}>* Officials: </Text>
                        <View style={styles.officials}>
                            <Text>- Nikola Vukičević</Text> 
                            <Text>- Marina Jovanović</Text> 
                        </View>

                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Deny</Text>
                        </TouchableOpacity>
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
    button: {
        marginTop: 40,
        backgroundColor: 'black',
        marginLeft: 15,
        borderRadius: 20,
        width: 80
    },
    buttonText: {
        color: 'white',
        padding: 8,
        alignSelf: 'center'
    },
    hr: {
        marginTop: 20,
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    officials: {
        marginLeft: 40
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
})