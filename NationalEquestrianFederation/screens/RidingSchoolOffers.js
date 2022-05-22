import { Text, ImageBackground, FlatList, StyleSheet, View } from 'react-native';
import Card from '../shared/card';
import { globalStyles } from '../styles/global';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function RidingSchoolOffers({ navigation }) {

    const serverUrl = "http://10.0.2.2:8080";

    const [offers, setOffers] = useState([])

    useEffect(() => {
        getOffers();
    }, [])

    const getOffers = () => {
        axios.get(serverUrl + "/ridingSchoolOffers?horseClub=0")
            .then(response => {
                setOffers(response.data);
            })
    }

    return (
        <ImageBackground source={require('../assets/background.jpg')} style={globalStyles.container} >
            <FlatList data={offers} renderItem={({ item }) => (
                <Card>
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

})