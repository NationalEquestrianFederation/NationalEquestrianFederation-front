import { Text, ImageBackground, FlatList, TouchableOpacity, StyleSheet, View, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useState, useEffect } from 'react';
import { globalStyles } from '../../styles/global';
import Card from '../../shared/card';
import AddNews from './AddNews';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

export default function News({ navigation }) {

    const serverUrl = process.env.SERVER_URL;

    const [role, setRole] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [news, setNews] = useState([]);

    useEffect(() => {
        getNews();
        setRoleName();
    }, [])

    const getNews = () => {
        const headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}
        console.log(process.env.SERVER_URL);
        axios.get(serverUrl + "/news?newsType=nationalFederation", {headers: headers})
            .then((response) => {
                setNews(response.data);
            })
            .catch(error => console.log(error))
    }

    const setRoleName = async () => {
        var token = await AsyncStorage.getItem('access_token');
        var decodedToken = jwt_decode(token);
        setRole(decodedToken.role);
    }

    const addNews = (news) => {
        axios.post(serverUrl + "/news", news)
            .then((response) => {
                setModalOpen(false);
                getNews();
            })
    }

    return (
        <ImageBackground source={require('../../assets/background.jpg')} style={globalStyles.container} >
            
            <Modal visible={modalOpen}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modalContent}>
                        <MaterialIcons 
                            name='close' 
                            size={24} 
                            style={{...styles.closeButton, ...styles.modalClose}}
                            onPress={() => setModalOpen(false)} />
                        <AddNews addNews={addNews} />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {role === "ROLE_NATIONAL_FEDERATION" && (
                <MaterialIcons 
                    name='add' 
                    size={24} 
                    style={styles.addButton}
                    color="rgba(252, 252, 252, 0.8)"
                    onPress={() => setModalOpen(true)} 
                />
            )}

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
        flex: 1,
        backgroundColor: 'rgba(200, 200, 200, 0.8)'
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