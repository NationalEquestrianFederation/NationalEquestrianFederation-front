import { StyleSheet, View, Text, ImageBackground, ScrollView } from "react-native";
import Card from '../../shared/card';
import { globalStyles } from "../../styles/global";

export default function ChoosenNews({ navigation }) {

    return (
        <ImageBackground source={require('../../assets/background.jpg')} style={globalStyles.container} >
            <View style={styles.container}>
                <Card>
                    <ScrollView>
                        <Text style={globalStyles.titleDate}>{navigation.getParam('date')}</Text>
                        <Text style={globalStyles.titleText}>
                        { navigation.getParam('title') }
                        </Text>
                        <Text style={styles.content}>{ navigation.getParam('content') }</Text>
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
    content: {
        marginTop: 10,
        fontSize: 16
    }
})