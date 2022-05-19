import { Text, ImageBackground, FlatList, TouchableOpacity, StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { globalStyles } from '../styles/global';
import Card from '../shared/card';

export default function HorseClubs({ navigation }) {

    const [clubs, setClubs] = useState([
        { name: 'KK Viking', place: 'Novi Sad', 
        description: 'Mi smo VIKING', key: 1 },
        { name: 'KK Granicar', place: 'Belgrade', description: 'Mi smo GRANICAR', key: 2 }

    ])

    const horseClubPressHandler = (club) => {
        navigation.navigate('HorseClub', club);
    }

    return (
        <ImageBackground source={require('../assets/background.jpg')} style={globalStyles.container} >
            <FlatList data={clubs} renderItem={({ item }) => (
                <TouchableOpacity onPress={() => horseClubPressHandler(item)} >
                    <Card>
                        <Text style={globalStyles.titleText}>{item.name}</Text>
                        <Text style={styles.place}>{item.place}</Text>
                    </Card>
                </TouchableOpacity>
            )} style={styles.cards}/>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    cards: {
        marginTop: 15
    },
    place: {
        marginTop: 3
    }
  });