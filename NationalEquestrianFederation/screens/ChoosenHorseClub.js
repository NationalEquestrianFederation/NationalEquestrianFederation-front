import { Text, ImageBackground, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';
import Card from '../shared/card';

export default function ChoosenHorseClub({ navigation }) {

    const club = {
        name: navigation.getParam('name'),
        place: navigation.getParam('place'),
        description: navigation.getParam('description')
    }

    const goToHorses = () => {
        navigation.navigate('Horses');
    }

    return (
        <ImageBackground source={require('../assets/background.jpg')} style={globalStyles.container} >
            <TouchableOpacity onPress={() => goToHorses()}>
                <Card>
                    <Text style={globalStyles.titleText}>Horses</Text>
                </Card>
            </TouchableOpacity>
            <Card>
                <Text style={globalStyles.titleText}>Riders</Text>
            </Card>
            <Card>
                <Text style={globalStyles.titleText}>Riding school</Text>
            </Card>
            <Card>
                <Text style={globalStyles.titleText}>Trainers</Text>
            </Card>
            <ScrollView>
                <Card>
                    <Text style={styles.label}>Name</Text>
                    <Text>{club.name}</Text>
                    <Text style={styles.label}>Location</Text>
                    <Text>{club.place}</Text>
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