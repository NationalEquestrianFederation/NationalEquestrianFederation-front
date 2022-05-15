import { Text, ImageBackground, FlatList, TouchableOpacity, StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { globalStyles } from '../styles/global';
import Card from '../shared/card';

export default function News({ navigation }) {

    const [news, setNews] = useState([
        { title: 'Competition in Belgrade', 
        content: 'Are you ready for big \n competition we are planning \n in few days\
        \n in few days\
        \n in few days\
        \n in few days\
        \n in few days\
        \n in few days\
        \n in few days\
        \n in few days\
        \n in few days\
        \n in few days\
        \n in few days', 
        date: '22.05.2022.', key: 1 },
        { title: 'Big win in Germany', content: 'Our competitor won competition', date: '02.04.2022.', key: 2 },
        { title: 'Big  meeting on Saturday', 
        content: 'We have important meeting', 
        date: '23.03.2022.', key: 3 }

    ])

    return (
        <ImageBackground source={require('../assets/background.jpg')} style={globalStyles.container} >
            <FlatList data={news} renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigation.navigate('ChoosenNews', item)}>
                    <Card>
                        <Text style={globalStyles.titleDate}>{item.date}</Text>
                        <Text style={globalStyles.titleText}>{item.title}</Text>
                        <View style={styles.content}>
                            <Text>{item.content}</Text>
                        </View>
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
    content: {
        paddingTop: 10,
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#acaeb0',
        maxHeight: 30
    }
  });