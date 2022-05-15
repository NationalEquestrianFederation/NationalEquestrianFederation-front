import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';

export default function Home() {
    return (
        <View style={styles.welcome}>
            <Text style={styles.text}>National Equestrian Federation</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>What's new?</Text>
            </TouchableOpacity>
        </View>
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
        marginTop: 35,
        backgroundColor: 'black',
        width: 300,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },
    buttonText: {
        color: 'white',
        fontSize: 20
    }
})

