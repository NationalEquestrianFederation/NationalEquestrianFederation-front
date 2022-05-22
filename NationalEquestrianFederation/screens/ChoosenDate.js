import { StyleSheet, View, Text, ImageBackground, FlatList, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import Card from '../shared/card';
import { globalStyles } from "../styles/global";
import axios from 'axios';

export default function ChoosenDate({ navigation }) {

    const serverUrl = "http://10.0.2.2:8080";

    const [competitions, setCompetitions] = useState([]);

    useEffect(() => {
        getCompetitions();
    }, [])

    const getCompetitions = () => {
        axios.get(serverUrl + "/competitions/" + navigation.getParam('dateString'))
            .then(response => {
                setCompetitions(response.data);
            })
    }

    const competitionPressHandler = (competition) => {
        navigation.navigate('ChoosenCompetition', competition)
    }

    return (
        <ImageBackground source={require('../assets/background.jpg')} style={globalStyles.container} >
            <View style={styles.container}>
                    <Text style={styles.date}>{navigation.getParam('dateString')}</Text>
                <FlatList data={competitions} renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => competitionPressHandler(item)} >
                        <Card>
                            <Text style={globalStyles.titleDate}>{item.startDate} - {item.endDate}</Text>
                            <Text style={globalStyles.titleText}>{item.name}</Text>
                        </Card>
                    </TouchableOpacity>
                    )} style={styles.cards}/>
            </View>
            
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        marginTop: 15
    },
    date: {
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#9c9998'
    },
    cards: {
        marginTop: 15
    }

})