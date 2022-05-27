import { StyleSheet, View, ImageBackground, ScrollView, Text } from 'react-native';
import Card from '../../shared/card';
import { globalStyles } from '../../styles/global';

export default function ChoosenCompetition({ navigation }) {
    return (
        <ImageBackground source={require('../../assets/background.jpg')} style={globalStyles.container} >
            <View style={styles.container}>
                <Card>
                    <ScrollView>
                        <Text style={globalStyles.titleDate}></Text>
                        <Text style={styles.title}>{navigation.getParam('name')}</Text>
                        <Text style={styles.label}>Discipline: </Text>
                        <Text>{navigation.getParam('discipline')}</Text>
                        <Text style={styles.label}>Start date: </Text>
                        <Text>{navigation.getParam('startDate')}</Text>
                        <Text style={styles.label}>End date: </Text>
                        <Text>{navigation.getParam('endDate')}</Text>
                        <Text style={styles.label}>Place: </Text>
                        <Text>{navigation.getParam('location')}</Text>
                        <Text style={styles.content}></Text>
                    </ScrollView>
                </Card>
            </View>
            
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        marginTop: 15
    },
    label: {
        marginTop: 10,
        fontSize: 17,
        fontWeight: 'bold'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'italic',
        marginTop: -20
    }
})