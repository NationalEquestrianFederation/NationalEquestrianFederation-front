import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    titleDate: {
        fontSize: 12,
        color: '#333',
        textAlign: 'right',
        marginTop: -3,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
    },
    errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 6,
        textAlign: 'center'
    }
})