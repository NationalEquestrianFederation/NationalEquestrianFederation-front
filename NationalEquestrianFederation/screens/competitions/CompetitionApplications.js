import { Text, ImageBackground, FlatList, StyleSheet, View, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Card from '../../shared/card';
import { globalStyles } from '../../styles/global';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

export default function CompetitionApplications({ navigation, competitionId }) {

    const serverUrl = process.env.SERVER_URL;

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        //setRoleName();
        getApplications();
    }, [])

    const setRoleName = async () => {
        var token = await AsyncStorage.getItem('access_token');
        var decodedToken = jwt_decode(token);
        setRole(decodedToken.role);
    }

    const getApplications = () => {
        console.log(process.env.SERVER_URL)
        console.log(navigation.state.params)
        axios.get(serverUrl + "/competitionApplication?id=" + navigation.state.params)
            .then(response => {
                setApplications(response.data);
                console.log(response.data)
            })
    }

    return (
        <ImageBackground source={require('../../assets/background.jpg')} style={globalStyles.container} >

            <FlatList data={applications} renderItem={({ item }) => (
                <Card>

                    <Text style={styles.titleLabel}>HC: {item.horse.horseClub.name}</Text>
                    <Text style={styles.label}>* Rider</Text>
                    <Text>{item.rider.name} {item.rider.surname}</Text>
                    <Text style={styles.label}>* Horse</Text>
                    <Text>{item.horse.name}</Text>

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

})