import { Text, Button, View, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { globalStyles } from '../styles/global';
import axios from 'axios';

export default function Registration({ navigation }) {

    const serverUrl = "http://10.0.2.2:8080";

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const logIn = () => {
        var user = {
            username: username,
            password: password
        }

        axios.post(serverUrl + "/authentication/register", user)
            .then(response => {
                setUsername('');
                setPassword('');
                navigation.goBack();
            })
    }

    return (
        <ImageBackground source={require('../assets/background.jpg')} style={globalStyles.container} >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                <View style={styles.logInForm}>
                    <Text style={styles.header}>Registration</Text>
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
                        <Text style={styles.buttonText}>Registration</Text>
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