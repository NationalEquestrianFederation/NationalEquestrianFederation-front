import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
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
        borderBottomColor: '#ddd',
        fontSize: 18,
        borderRadius: 6,
        alignSelf: 'center',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
        backgroundColor: 'white',
        width: '85%'
    },
    errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 6,
        textAlign: 'center'
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
        padding: 2,
        marginRight: 5,
        alignSelf: 'flex-end',
    },
    modalClose: {
        marginTop: 5,
        marginBottom: 0,
    },
    dateButton: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
    },
    dateButtonText: {
        fontSize: 18,
    }
})