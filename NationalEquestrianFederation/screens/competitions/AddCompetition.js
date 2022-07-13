import { StyleSheet, TextInput, View, Text, ScrollView, TouchableOpacity } from "react-native";
import { globalStyles } from "../../styles/global";
import { useEffect, useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Button from "../../shared/button";
import MultiSelect from 'react-native-multiple-select';

export default function AddCompetition({ addCompetition }) {

    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [openStartDate, setOpenStartDate] = useState(false);
    const [startDateText, setStartDateText] = useState(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate());
    const [endDate, setEndDate] = useState(new Date());
    const [openEndDate, setOpenEndDate] = useState(false);
    const [endDateText, setEndDateText] = useState(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate());
    const [location, setLocation] = useState('');
    const [discipline, setDiscipline] = useState('');
    const [officials, setOfficials] = useState([]);
    const [chosenOfficials, setChosenOfficials] = useState([]);

    useEffect(() => {
        getOfficials();
    }, [])

    const getOfficials = () => {
        var officials = [
            {
                id: 1,
                name: "Marina Jovanović"
            }, 
            {
                id: 2,
                name: "Nikola Nikić"
            }
        ]
        setOfficials(officials);
    }

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
        var month = "";
        var date = "";
        if(tempDate.getMonth() < 10){
            var m = tempDate.getMonth() + 1;
            month = '0' + m;
        } else {
            month = tempDate.getMonth() + 1;
        }

        if(tempDate.getDate() < 10){
            var d = tempDate.getDate();
            date = '0' + d;
        } else {
            date = tempDate.getDate();
        }


        let fDate = tempDate.getFullYear() + '-' + month + '-' + date;
        setStartDateText(fDate);
    }

    const endDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || endDate;
        setEndDate(currentDate);
        setOpenEndDate(false);

        var tempDate = new Date(currentDate);
        var month = "";
        var date = "";
        if(tempDate.getMonth() < 10){
            var m = tempDate.getMonth() + 1;
            month = '0' + m;
        } else {
            month = tempDate.getMonth() + 1;
        }

        if(tempDate.getDate() < 10){
            var d = tempDate.getDate();
            date = '0' + d;
        } else {
            date = tempDate.getDate();
        }

        let fDate = tempDate.getFullYear() + '-' + month + '-' + date;
        setEndDateText(fDate);
    }

    return (
        <View>
            <ScrollView>
                <Text style={styles.titleText}>Organize competition</Text>

                <Text></Text>
                <TextInput 
                    style={globalStyles.input} 
                    placeholder='Name'
                    onChangeText={(value) => setName(value)}
                    value={name}
                />
                <Text style={globalStyles.errorText}></Text>

                {openStartDate && (<DateTimePicker
                    value={startDate}
                    onChange={startDateChange}
                    dateFormat="day month year"
                    minimumDate={new Date()}
                    />
                )}

                <TouchableOpacity style={globalStyles.input} onPress={() => setOpenStartDate(true)}>
                    <Text style={globalStyles.dateButtonText}>Start date - {startDateText}</Text>
                </TouchableOpacity>
                <Text style={globalStyles.errorText}></Text>

                {openEndDate && (<DateTimePicker
                    value={endDate}
                    onChange={endDateChange}
                    dateFormat="day month year"
                    minimumDate={new Date()}
                    />
                )}

                <TouchableOpacity style={globalStyles.input} onPress={() => setOpenEndDate(true)}>
                    <Text style={globalStyles.dateButtonText}>End date - {endDateText}</Text>
                </TouchableOpacity>
                <Text style={globalStyles.errorText}></Text>
                
                <TextInput 
                    style={globalStyles.input} 
                    placeholder='Location'
                    onChangeText={(value) => setLocation(value)}
                    value={location}
                />
                <Text style={globalStyles.errorText}></Text>

                <Picker 
                    selectedValue={discipline}
                    style={globalStyles.input}
                    onValueChange={value => setDiscipline(value)}>
                    <Picker.Item label="Jumping" value="jumping" />
                    <Picker.Item label="Dressage" value="dressage" />
                    <Picker.Item label="Eventing" value="eventing" />
                </Picker>
                <Text style={globalStyles.errorText}></Text>

                <TextInput 
                    style={globalStyles.input} 
                    placeholder='Organizer'
                    onChangeText={(value) => setLocation(value)}
                    value={location}
                />
                <Text style={globalStyles.errorText}></Text>

                <MultiSelect
                    hideTags
                    items={officials}
                    uniqueKey="id"
                    onSelectedItemsChange={() => setChosenOfficials(chosenOfficials)}
                    selectedItems={chosenOfficials}
                    selectText="Officials"
                    searchInputPlaceholderText="Search officials..."
                    onChangeInput={ (text)=> console.log(text)}
                    tagRemoveIconColor="#CCC"
                    tagBorderColor="#CCC"
                    tagTextColor="#CCC"
                    selectedItemTextColor="#CCC"
                    selectedItemIconColor="#CCC"
                    itemTextColor="#000"
                    displayKey="name"
                    styleMainWrapper={{width: '85%', alignSelf: 'center'}}
                    searchInputStyle={{ color: '#CCC', fontSize: 17, padding: 7 }}
                    styleDropdownMenu={{fontSize: 20}}
                    submitButtonColor="black"
                    submitButtonText="Submit"
                    fontSize={16}
                    style={globalStyles.input}
                />

                <Text></Text>

            <Button handler={addCompetitionHandler} text="Submit" />

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