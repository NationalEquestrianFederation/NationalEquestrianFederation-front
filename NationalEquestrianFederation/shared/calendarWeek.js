import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';

export default function CalendarWeek ({dates, week, navigation}) {

    const datePressHandler = (day) => {
        console.log(day)
        navigation.navigate('ChoosenDate', day)
    }

    const isDateFromPreviousMonth = (date) => {
        date = new Date(date).getDate();
        return (week === 0 && date > 7);
    }

    const isDateFromFollowingMonth = (date) => {
        date = new Date(date).getDate();
        return (week > 3 && date < 14);
    }

    const isDateFromCurrentMonth = (date) => {
        if(isDateFromPreviousMonth(date) || isDateFromFollowingMonth(date)){
            return false;
        }
        return true;
    }


    return (
        <FlatList data={dates} horizontal style={styles.week} renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => datePressHandler(item.date)}>
                {isDateFromCurrentMonth(item.date) ? (
                    <Text style={styles.date}>{new Date(item.date).getDate().toString()}</Text>
                ) : (
                    <Text style={styles.disabledDate}>{new Date(item.date).getDate().toString()}</Text>
                )}
                {item.competitions.length > 0 && (
                    <FlatList data={item.competitions} style={styles.competitions} renderItem={({ item }) => (
                        <View>
                            {item === "jumping" && (
                                <View style={styles.jumping}></View>
                            )}
                            {item === "dressage" && (
                                <View style={styles.dressage}></View>
                            )}
                            {item === "eventing" && (
                                <View style={styles.eventing}></View>
                            )}
                        </View>
                        
                    )}
                    />
                )}
                
            </TouchableOpacity>
            )} 
        />
    )

}

const styles = StyleSheet.create({
    card: {
        width: 47,
        height: 50,
        paddingTop: 0,
        paddingBottom: 10,
        paddingRight: 5,
    },
    date: {
        alignSelf: 'flex-end',
    },
    disabledDate: {
        alignSelf: 'flex-end',
        color: 'gray'
    },
    competitions: {
        width: 47
    },
    jumping: {
        height: 1,
        width: 45,
        borderTopColor: 'lightgreen',
        borderTopWidth: 4,
        marginBottom: 2
    },
    dressage: {
        height: 1,
        width: 45,
        borderTopColor: 'skyblue',
        borderTopWidth: 4,
        marginBottom: 2
    },
    eventing: {
        height: 1,
        width: 45,
        borderTopColor: 'pink',
        borderTopWidth: 4,
        marginBottom: 2
    }
})