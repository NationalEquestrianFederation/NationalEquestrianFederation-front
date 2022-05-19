import { Text, ImageBackground, FlatList, StyleSheet } from 'react-native';
import Card from '../shared/card';
import { globalStyles } from '../styles/global';
import { useState } from 'react';

export default function Horses({ navigation }) {

    const [horses, setHorses] = useState([
        { name: 'Quincon Z', gender: 'stalion' },
        { name: 'Easy Gold', gender: 'mare' }
    ])

    return (
        <ImageBackground source={require('../assets/background.jpg')} style={globalStyles.container} >
            <FlatList data={horses} renderItem={({ item }) => (
                <Card>
                    <Text style={globalStyles.titleText}>{item.name}</Text>
                    <Text style={styles.place}>{item.gender}</Text>
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