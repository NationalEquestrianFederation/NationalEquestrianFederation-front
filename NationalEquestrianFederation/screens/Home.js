import { View, Text, StyleSheet, Button, TouchableOpacity, ImageBackground } from 'react-native';
import { globalStyles } from '../styles/global';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

export default function Home({ navigation }) {

    const [role, setRole] = useState("");
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        checkUser();
    }, [])
    
    const checkUser = async () => {
        var token = await AsyncStorage.getItem('access_token');
        var decodedToken = jwt_decode(token);
        if(token !== null) {
            setLogged(true);
            setRole(decodedToken.role);
        } else {
            setLogged(false);
        }
        
    }

    const logOut = async () => {
        await AsyncStorage.removeItem('access_token');
        setLogged(false);
    }

    return (
        <ImageBackground source={require('../assets/background.jpg')} style={globalStyles.container} >
            <View style={styles.buttons}>
                {!logged && (
                    <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
                        <Text style={styles.logIn}>Log in</Text>
                    </TouchableOpacity>
                )}
                {!logged && (
                    <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
                        <Text style={styles.logIn}>Register</Text>
                    </TouchableOpacity>
                )}
                {logged && (
                    <TouchableOpacity onPress={() => logOut()}>
                        <Text style={styles.logIn}>Log out</Text>
                    </TouchableOpacity>
                )}
            </View>
            <View style={styles.welcome}>
                <Text style={styles.text}>National Equestrian Federation</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('News')}>
                    <Text style={styles.buttonText}>What's new?</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    welcome: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        fontSize: 35,
        textAlign: 'center',
        fontStyle: 'italic',
        fontWeight: '500'
    },
    button: {
        marginTop: 20,
        backgroundColor: 'rgba(252, 252, 252, 0.8)',
        width: 300,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },
    buttonText: {
        color: 'black',
        fontSize: 20
    },
    buttons: {
        alignSelf: 'flex-end',
        flexDirection: 'row'
    },  
    logIn: {
        color: 'rgba(252, 252, 252, 0.8)',
        fontSize: 20,
        fontWeight: '400',
        fontStyle: 'italic',
        alignSelf: 'flex-end',
        marginRight: 20,
        marginTop: 10
    }
})

