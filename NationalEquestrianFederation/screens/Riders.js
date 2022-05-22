import { Text, ImageBackground, FlatList, StyleSheet, View } from 'react-native';
import Card from '../shared/card';
import { globalStyles } from '../styles/global';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Riders({ navigation }) {

    const serverUrl = "http://10.0.2.2:8080";

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

    return (
        <ImageBackground source={require('../assets/background.jpg')} style={globalStyles.container} >
            <FlatList data={riders} renderItem={({ item }) => (
                <Card>
                <View style={styles.name}>
                    <Text style={globalStyles.titleText}>{item.name}</Text>
                    <Text style={styles.title}>{item.surname}</Text>
                </View>
                <View style={styles.name}>
                    <Text>{item.licence}</Text>
                </View>
                </Card>
            )} style={styles.cards}/>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    cards: {
        marginTop: 15
    },
    name: {
        flexDirection: 'row'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'italic',
        marginLeft: 3
    }

})