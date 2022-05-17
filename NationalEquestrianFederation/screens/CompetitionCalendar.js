import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Calendar, CaledarList, Agenda } from 'react-native-calendars';
import { globalStyles } from '../styles/global';

export default function CompetitionCalendar({ navigation }) {

    const datePressHandler = (day) => {
        console.log(day.dateString)
        navigation.navigate('ChoosenDate', day)
    }

    return (
        <ImageBackground source={require('../assets/background.jpg')} style={globalStyles.container} >
            <View style={globalStyles.container}>
                <Calendar style={styles.calendar} 
                markingType="multi-period"
                markedDates={{
                    '2022-05-14': {
                    periods: [
                        {startingDay: false, endingDay: true, color: '#5f9ea0'},
                        {startingDay: false, endingDay: true, color: '#ffa500'},
                        {startingDay: true, endingDay: false, color: '#f0e68c'}
                    ]
                    },
                    '2022-05-15': {
                    periods: [
                        {startingDay: true, endingDay: false, color: '#ffa500'},
                        {color: 'transparent'},
                        {startingDay: false, endingDay: false, color: '#f0e68c'}
                    ]
                    }
                }}
                onDayPress={(day) => datePressHandler(day)}
                />
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    calendar: {
        marginTop: 15,
        height: '75%',
        width: '95%',
        alignSelf: 'center',
        backgroundColor: 'white',
        opacity: 0.9,
        borderRadius: 10
    }
})