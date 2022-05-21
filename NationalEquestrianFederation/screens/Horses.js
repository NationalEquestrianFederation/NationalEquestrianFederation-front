import { Text, ImageBackground, FlatList, StyleSheet } from 'react-native';
import Card from '../shared/card';
import { globalStyles } from '../styles/global';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Horses({ navigation }) {

    const serverUrl = "http://10.0.2.2:8080";

    const [horses, setHorses] = useState([]);

    useEffect(() => {
        getHorses();
    }, [])

    const getHorses = () => {
        axios.get(serverUrl + "/horses?horseClub=0")
            .then(response => {
                setHorses(response.data);
            })
    }

    return (
        <ImageBackground source={require('../assets/background.jpg')} style={globalStyles.container} >
            <FlatList data={horses} renderItem={({ item }) => (
                <Card>
                    <Text style={globalStyles.titleText}>{item.name}</Text>
                    <Text style={styles.place}>{item.gender.toString()}</Text>
                </Card>
            )} style={styles.cards}/>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    cards: {
        marginTop: 15
    },
})