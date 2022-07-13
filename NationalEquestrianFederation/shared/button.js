import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Button({handler, text}) {
    return (
        <TouchableOpacity style={styles.button} onPress={handler}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        marginTop: 20,
        backgroundColor: 'black',
        width: '55%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        alignSelf: 'center'
    },
    buttonText: {
        color: 'rgba(252, 252, 252, 0.8)',
        fontSize: 20,
        fontWeight: 'bold'
    },
  });