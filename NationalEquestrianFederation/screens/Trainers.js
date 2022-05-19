import { Text, ImageBackground, FlatList, StyleSheet, View } from 'react-native';
import Card from '../shared/card';
import { globalStyles } from '../styles/global';
import { useState } from 'react';

export default function Trainers({ navigation }) {

    const [trainers, setTrainers] = useState([
        { name: 'Sara', surname: 'Poparic' },
        { name: 'Mila', surname: 'Poparic' }
    ])

    return (
        <ImageBackground source={require('../assets/background.jpg')} style={globalStyles.container} >
            <FlatList data={trainers} renderItem={({ item }) => (
                <Card>
                <View style={styles.name}>
                    <Text style={globalStyles.titleText}>{item.name}</Text>
                    <Text style={styles.title}>{item.surname}</Text>
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