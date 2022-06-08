import { Text, Button, View, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { globalStyles } from '../styles/global';
import axios from 'axios';
import { setStatusBarStyle } from 'expo-status-bar';
import jwt_decode from 'jwt-decode'

export default function LogIn({ navigation }) {

    const serverUrl = process.env.SERVER_URL;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setUrl();
    }, [])

    const setUrl = () => {
        console.log(process.env.SERVER_URL);
    }

    const logIn = () => {
        var user = {
            username: username,
            password: password
        }

        axios.post(serverUrl + "/authentication/login", user)
            .then(response => {
                var token = response.data.accessToken;
                var decodedToken = jwt_decode(token);
                console.log(decodedToken);
                setToken(token);
                setUsername('');
                setPassword('');
                navigation.goBack();
            })
    }

    const setToken = async (token) => {
        await AsyncStorage.setItem('access_token', token);
    }

    return (
        <ImageBackground source={require('../assets/background.jpg')} style={globalStyles.container} >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                <View style={styles.logInForm}>
                    <Text style={styles.header}>Log in</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder='Username'
                        onChangeText={(value) => setUsername(value)}
                        value={username}
                    />
                    <TextInput 
                        style={styles.input} 
                        placeholder='Password'
                        secureTextEntry={true}
                        onChangeText={(value) => setPassword(value)}
                        value={password}
                    />

                    <Text></Text>
                    <TouchableOpacity style={styles.button} onPress={() => logIn()}>
                        <Text style={styles.buttonText}>Log in</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </ImageBackground>
    )

}

const styles = StyleSheet.create({
    header: {
        color: 'rgba(252, 252, 252, 0.8)',
        fontSize: 35,
        textAlign: 'center',
        fontStyle: 'italic',
        fontWeight: '500',
    },
    logInForm: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        marginTop: 20,
        borderBottomWidth: 1,
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
        backgroundColor: 'rgba(252, 252, 252, 0.8)',
        width: '85%'
    },
    button: {
        marginTop: 20,
        backgroundColor: 'rgba(252, 252, 252, 0.8)',
        width: '55%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },
    buttonText: {
        color: 'black',
        fontSize: 20
    },
})