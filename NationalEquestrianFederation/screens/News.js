import { Text, ImageBackground, FlatList, TouchableOpacity, StyleSheet, View, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useState } from 'react';
import { globalStyles } from '../styles/global';
import Card from '../shared/card';
import AddNews from './AddNews';
import { MaterialIcons } from '@expo/vector-icons';

export default function News({ navigation }) {

    const [modalOpen, setModalOpen] = useState(false);
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
            
            <Modal visible={modalOpen}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modalContent}>
                        <MaterialIcons 
                            name='close' 
                            size={24} 
                            style={{...styles.closeButton, ...styles.modalClose}}
                            onPress={() => setModalOpen(false)} />
                        <AddNews  />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <MaterialIcons 
                name='add' 
                size={24} 
                style={styles.addButton}
                color="rgba(252, 252, 252, 0.8)"
                onPress={() => setModalOpen(true)} />

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
        marginTop: 5
    },
    content: {
        paddingTop: 10,
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#acaeb0',
        maxHeight: 30
    },
    modalContent: {
        flex: 1
    },
    addButton: {
        marginTop: 10,
        borderWidth: 1,
        padding: 2,
        borderRadius: 10,
        marginRight: '5%',
        alignSelf: 'flex-end',
    },
    closeButton: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'lightgray',
        padding: 2,
        borderRadius: 10,
        marginRight: 5,
        alignSelf: 'flex-end',
    },
    modalClose: {
        marginTop: 5,
        marginBottom: 0,
    }
  });