import { StyleSheet, View, Text, ImageBackground, FlatList, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import Card from '../../shared/card';
import { globalStyles } from "../../styles/global";
import axios from 'axios';

export default function ChoosenDate({ navigation }) {

    const serverUrl = process.env.SERVER_URL;

    const [date, setDate] = useState('');
    const [competitions, setCompetitions] = useState([]);

    useEffect(() => {
        getCompetitions();
    }, [])

    const getCompetitions = () => {
        console.log(process.env.SERVER_URL)
        var date = navigation.state.params;
        axios.get(serverUrl + "/competitions/" + date)
            .then(response => {
                setCompetitions(response.data);
                setDate(date);
            })
    }

    const competitionPressHandler = (competition) => {
        navigation.navigate('ChoosenCompetition', competition)
    }

    return (
        <ImageBackground source={require('../../assets/background.jpg')} style={globalStyles.container} >
            <View style={styles.container}>
                    <Text style={styles.date}>{date}</Text>
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