import { Text, ImageBackground, FlatList, StyleSheet, View } from 'react-native';
import Card from '../shared/card';
import { globalStyles } from '../styles/global';
import { useState } from 'react';

export default function RidingSchoolOffers({ navigation }) {

    const ridingSchool = {
        name: 'Viking riding school',
        description: 'Our riding school exists 30 years, and yearly we produce more than 20 riders'
    }

    const [offers, setOffers] = useState([
        { name: 'Monthly 100e', duration: '30 days', price: 100 },
        { name: 'Summer holiday sale', duration: '10 days', price: 50 },
    ])

    return (
        <ImageBackground source={require('../assets/background.jpg')} style={globalStyles.container} >
            <FlatList data={offers} renderItem={({ item }) => (
                <Card>
                    <Text style={globalStyles.titleText}>{item.name}</Text>
                    <View style={styles.content}>
                        <Text style={styles.label}>Duration</Text>
                        <Text >{item.duration}</Text>
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
        maxHeight: 100
    },
    label: {
        fontSize: 15,
        fontWeight: 'bold'
    },

})