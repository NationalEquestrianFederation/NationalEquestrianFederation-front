import { StyleSheet, Button, TextInput, View, Text, ScrollView } from "react-native";
import { globalStyles } from "../styles/global";
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

export default function AddHorse({ addHorse }) {

    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [owner, setOwner] = useState('');
    const [yearOfBirh, setYearOfBirth] = useState('');

    const addHorseHandler = () => {
        var horse = {
            name: name,
            gender: gender,
            owner: owner,
            yearOfBirh: yearOfBirh,
            horseClub: 1
        }
        addHorse(horse);
    }

    return (
        <View>
            <ScrollView>
                <Text style={styles.titleText}>Add horse</Text>

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
                    placeholder='Year of birth'
                    onChangeText={(value) => setYearOfBirth(value)}
                    value={yearOfBirh}
                />
                <Text></Text>

                <TextInput 
                    style={globalStyles.input} 
                    placeholder='Owner'
                    onChangeText={(value) => setOwner(value)}
                    value={owner}
                />
                <Text></Text>

                <Button title="Submit" onPress={addHorseHandler} />
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