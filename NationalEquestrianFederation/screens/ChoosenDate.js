import { StyleSheet, View, Text, ImageBackground, FlatList, TouchableOpacity } from "react-native";
import { useState } from "react";
import Card from '../shared/card';
import { globalStyles } from "../styles/global";

export default function ChoosenDate({ navigation }) {

    const [competitions, setCompetitions] = useState([
        { name: 'Competition in Belgrade', startDate: '2022-05-25', endDate: '2022-05-26', place: 'Belgrade', discipline: 'jumping' },
        { name: 'Competition in Novi Sad', startDate: '2022-05-25', endDate: '2022-05-30', place: 'Novi Sad', discipline: 'dressage' },
    ]);

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
                            <Text style={globalStyles.titleDate}>{item.date}</Text>
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