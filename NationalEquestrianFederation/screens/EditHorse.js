import { StyleSheet, Button, TextInput, View, Text, ScrollView } from "react-native";
import { globalStyles } from "../styles/global";
import { Formik } from 'formik';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

export default function EditHorse({ horse, editHorse }) {

    const id = horse.id;
    const [name, setName] = useState(horse.name);
    const [gender, setGender] = useState(horse.gender);
    const [owner, setOwner] = useState(horse.owner);
    const [yearOfBirth, setYearOfBirth] = useState(horse.yearOfBirth);

    const editHorseHandler = () => {
        var horse = {
            id: id,
            name: name,
            gender: gender,
            owner: owner,
            yearOfBirth: yearOfBirth
        }
        editHorse(horse);
    }

    return (
        <View>
            <ScrollView>
                <Text style={styles.titleText}>Edit horse</Text>

                <TextInput 
                    style={globalStyles.input} 
                    placeholder='Name'
                    onChangeText={(value) => setName(value)}
                    value={name}
                />
                <Text></Text>

                <Picker 
                    selectedValue={gender}
                    onValueChange={value => setGender(value)}>
                    <Picker.Item label="Stallion" value="stallion" />
                    <Picker.Item label="Mare" value="mare" />
                </Picker>
                <Text></Text>

                <TextInput 
                    style={globalStyles.input} 
                    keyboardType='numeric'
                    placeholder='Year of birth'
                    onChangeText={(value) => setYearOfBirth(value)}
                    value={yearOfBirth.toString()}
                />
                <Text></Text>

                <TextInput 
                    style={globalStyles.input} 
                    placeholder='Owner'
                    onChangeText={(value) => setOwner(value)}
                    value={owner}
                />
                <Text></Text>

                <Button title="Submit" onPress={editHorseHandler} />
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
    checkbox: {
        flexDirection: 'row'
    }
})