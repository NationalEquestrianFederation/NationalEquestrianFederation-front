import { StyleSheet, Button, TextInput, View, Text, ScrollView, TouchableOpacity } from "react-native";
import { globalStyles } from "../../styles/global";
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import { Picker } from '@react-native-picker/picker';
import axios from "axios";

export default function CompetitionApplication({ apply, competition }) {

    const serverUrl = process.env.SERVER_URL;

    const [riderId, setRiderId] = useState('');
    const [horseId, setHorseId] = useState('');
    const [horses, setHorses] = useState([]);
    const [riders, setRiders] = useState([]);

    useEffect(() => {
        getHorses();
        getRiders();
    }, [])

    const applyHandler = () => {
        var application = {
            riderId: riderId,
            horseId: horseId
        }

        apply(application);
    }

    const getHorses = async () => {
        console.log(process.env.SERVER_URL);
        var token = await AsyncStorage.getItem('access_token');
        var decodedToken = jwt_decode(token);
        var owner = decodedToken.id;

        axios.get(serverUrl + "/horses/horseNames?owner=" + owner)
            .then(response => {
                setHorses(response.data);
                console.log(response.data)
            })
    }

    const getRiders = async () => {
        console.log(process.env.SERVER_URL);
        var token = await AsyncStorage.getItem('access_token');
        var decodedToken = jwt_decode(token);
        var owner = decodedToken.id;

        axios.get(serverUrl + "/riders/riderNames?owner=" + owner)
            .then(response => {
                setRiders(response.data);
                console.log(response.data)
            })
    }

    return (
        <View>
            <ScrollView>
                <Text style={styles.titleText}>Competition Application</Text>

                <TextInput 
                    style={globalStyles.input} 
                    placeholder='Competition'
                    value={competition}
                    editable={false}
                />
                <Text></Text>

                <Picker 
                    selectedValue={riderId}
                    onValueChange={value => setRiderId(value)}>
                    {riders.map(rider => <Picker.Item key={rider.id} label={rider.name} value={rider.id}/>)}
                </Picker>
                <Text></Text>

                <Picker 
                    selectedValue={horseId}
                    onValueChange={value => setHorseId(value)}>
                    {horses.map(horse => <Picker.Item key={horse.id} label={horse.name} value={horse.id}/>)}
                </Picker>
                <Text></Text>

                <Button title="Submit" onPress={applyHandler} />

            </ScrollView>
        </View>
    )

}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        fontStyle: 'italic',
        alignSelf: 'center',
        marginBottom: 10
    },
    
})