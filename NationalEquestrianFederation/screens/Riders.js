import { Text, ImageBackground, FlatList, StyleSheet, View } from 'react-native';
import Card from '../shared/card';
import { globalStyles } from '../styles/global';
import { useState } from 'react';

export default function Riders({ navigation }) {

    const [riders, setRiders] = useState([
        { name: 'Sara', surname: 'Poparic', age: 22 },
        { name: 'Mila', surname: 'Poparic', age: 19 }
    ])

    return (
        <ImageBackground source={require('../assets/background.jpg')} style={globalStyles.container} >
            <FlatList data={riders} renderItem={({ item }) => (
                <Card>
                <View style={styles.name}>
                    <Text style={globalStyles.titleText}>{item.name}</Text>
                    <Text style={styles.title}>{item.surname}</Text>
                </View>
                <View style={styles.name}>
                    <Text >Age: </Text>
                    <Text>{item.age}</Text>
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