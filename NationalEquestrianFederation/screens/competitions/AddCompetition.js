import { StyleSheet, Button, TextInput, View, Text, ScrollView, TouchableOpacity } from "react-native";
import { globalStyles } from "../../styles/global";
import { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

export default function AddCompetition({ addCompetition }) {

    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [openStartDate, setOpenStartDate] = useState(false);
    const [startDateText, setStartDateText] = useState(new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear());
    const [endDate, setEndDate] = useState(new Date());
    const [openEndDate, setOpenEndDate] = useState(false);
    const [endDateText, setEndDateText] = useState(new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear());
    const [location, setLocation] = useState('');
    const [discipline, setDiscipline] = useState('');

    const addCompetitionHandler = () => {
        var competition = {
            name: name,
            startDate: startDateText,
            endDate: endDateText,
            location: location,
            discipline: discipline
        }
        addCompetition(competition);
    }

    const startDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || startDate;
        setStartDate(currentDate);
        setOpenStartDate(false);

        var tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        setStartDateText(fDate);
    }

    const endDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || endDate;
        setEndDate(currentDate);
        setOpenEndDate(false);

        var tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        setEndDateText(fDate);
    }

    return (
        <View>
            <ScrollView>
                <Text style={styles.titleText}>Add competition</Text>

                <TextInput 
                    style={globalStyles.input} 
                    placeholder='Name'
                    onChangeText={(value) => setName(value)}
                    value={name}
                />
                <Text></Text>

                {openStartDate && (<DateTimePicker
                    value={startDate}
                    onChange={startDateChange}
                    dateFormat="day month year"
                    minimumDate={new Date()}
                    />
                )}

                <TouchableOpacity style={globalStyles.dateButton} onPress={() => setOpenStartDate(true)}>
                    <Text style={globalStyles.dateButtonText}>Start date - {startDateText}</Text>
                </TouchableOpacity>
                <Text></Text>

                {openEndDate && (<DateTimePicker
                    value={endDate}
                    onChange={endDateChange}
                    dateFormat="day month year"
                    minimumDate={new Date()}
                    />
                )}

                <TouchableOpacity style={globalStyles.dateButton} onPress={() => setOpenEndDate(true)}>
                    <Text style={globalStyles.dateButtonText}>End date - {endDateText}</Text>
                </TouchableOpacity>
                <Text></Text>
                
                <TextInput 
                    style={globalStyles.input} 
                    placeholder='Location'
                    onChangeText={(value) => setLocation(value)}
                    value={location}
                />
                <Text></Text>

                <Picker 
                    selectedValue={discipline}
                    onValueChange={value => setDiscipline(value)}>
                    <Picker.Item label="Jumping" value="jumping" />
                    <Picker.Item label="Dressage" value="dressage" />
                    <Picker.Item label="Eventing" value="eventing" />
                </Picker>
                <Text></Text>

                <Button title="Submit" onPress={addCompetitionHandler} />

            </ScrollView>
        </View>
    )

}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        fontStyle: 'italic',
        alignSelf: 'center',
        marginBottom: 10
    },
    
})