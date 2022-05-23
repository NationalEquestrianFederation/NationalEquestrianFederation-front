import { StyleSheet, Button, TextInput, View, Text, ScrollView } from "react-native";
import { globalStyles } from "../styles/global";
import { Formik } from 'formik';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

export default function EditRider({ rider, editRider }) {

    const id = rider.id;
    const [name, setName] = useState(rider.name);
    const [surname, setSurname] = useState(rider.surname);
    const [dateOfBirth, setDateOfBirth] = useState(rider.dateOfBirth);
    const [gender, setGender] = useState(rider.gender);
    const [licence, setLicence] = useState(rider.licence);

    const editRiderHandler = () => {
        var rider = {
            id: id,
            name: name,
            surname: surname,
            dateOfBirth: dateOfBirth,
            gender: gender,
            licence: licence
        }
        editRider(rider);
    }

    return (
        <View>
            <ScrollView>
                <Text style={styles.titleText}>Edit rider</Text>

                <TextInput 
                    style={globalStyles.input} 
                    placeholder='Name'
                    onChangeText={(value) => setName(value)}
                    value={name}
                />
                <Text></Text>

                <TextInput 
                    style={globalStyles.input} 
                    placeholder='Surname'
                    onChangeText={(value) => setSurname(value)}
                    value={surname}
                />
                <Text></Text>

                <TextInput 
                    style={globalStyles.input} 
                    placeholder='Date of birth'
                    onChangeText={(value) => setDateOfBirth(value)}
                    value={dateOfBirth}
                />
                <Text></Text>

                <Picker 
                    selectedValue={gender}
                    onValueChange={value => setGender(value)}>
                    <Picker.Item label="Female" value="female" />
                    <Picker.Item label="Male" value="male" />
                </Picker>
                <Text></Text>

                <Picker 
                    selectedValue={licence}
                    onValueChange={value => setLicence(value)}>
                    <Picker.Item label="Children" value="children" />
                    <Picker.Item label="Junior" value="junior" />
                    <Picker.Item label="Senior" value="senior" />
                </Picker>
                <Text></Text>

                <Button title="Submit" onPress={editRiderHandler} />
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