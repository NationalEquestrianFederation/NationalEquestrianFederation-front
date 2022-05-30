import { View, Text, StyleSheet, Button, TouchableOpacity, ImageBackground } from 'react-native';
import { globalStyles } from '../styles/global';

export default function Home({ navigation }) {
    return (
        <ImageBackground source={require('../assets/background.jpg')} style={globalStyles.container} >
            <View style={styles.buttons}>
                <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
                    <Text style={styles.logIn}>Log in</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
                    <Text style={styles.logIn}>Register</Text>
                </TouchableOpacity>
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

