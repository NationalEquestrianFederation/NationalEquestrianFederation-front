import { Text, ImageBackground, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';
import Card from '../shared/card';

export default function ChoosenHorseClub({ navigation }) {

    const club = {
        name: navigation.getParam('name'),
        location: navigation.getParam('address'),
        description: navigation.getParam('description'),
        email: navigation.getParam('email'),
        phone: navigation.getParam('phone')
    }

    return (
        <ImageBackground source={require('../assets/background.jpg')} style={globalStyles.container} >
            <TouchableOpacity onPress={() => navigation.navigate('Horses')}>
                <Card>
                    <Text style={globalStyles.titleText}>Horses</Text>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Riders')}>
                <Card>
                    <Text style={globalStyles.titleText}>Riders</Text>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('RidingSchoolOffers')}>
                <Card>
                    <Text style={globalStyles.titleText}>Riding School</Text>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Trainers')}>
                <Card>
                    <Text style={globalStyles.titleText}>Trainers</Text>
                </Card>
            </TouchableOpacity>
            <ScrollView>
                <Card>
                    <Text style={styles.label}>Name</Text>
                    <Text>{club.name}</Text>
                    <Text style={styles.label}>Location</Text>
                    <Text>{club.location}</Text>
                    <Text style={styles.label}>Email</Text>
                    <Text>{club.email}</Text>
                    <Text style={styles.label}>Phone</Text>
                    <Text>{club.phone}</Text>
                    <Text style={styles.label}>Something about us</Text>
                    <Text>{club.description}</Text>
                </Card>
            </ScrollView>
        </ImageBackground>
    )

}

const styles = StyleSheet.create({
    label: {
        marginTop: 10,
        fontSize: 17,
        fontWeight: 'bold'
    },
})