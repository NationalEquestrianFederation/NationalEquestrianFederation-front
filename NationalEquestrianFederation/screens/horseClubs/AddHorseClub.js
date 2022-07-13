import { StyleSheet, TextInput, View, Text, ScrollView } from "react-native";
import { globalStyles } from "../../styles/global";
import { Formik } from 'formik';
import { useState, useEffect } from 'react';
import axios from "axios";
import { Picker } from '@react-native-picker/picker';
import Button from "../../shared/button";

export default function AddHorseClub({ addHorseClub }) {

    const serverUrl = process.env.SERVER_URL;

    const [trainers, setTrainers] = useState([]);
    const [trainer, setTrainer] = useState('');

    useEffect(() => {
        getTrainers();
    }, [])

    const getTrainers = () => {
        axios.get(serverUrl + "/trainers?horseClub=0")
            .then(response => {
                setTrainers(response.data);
            })
    }

    const submitHandler = (horseClub) => {
        var horseClub = {

        }
    }

    return (
        <View>
            <Formik
                initialValues={{name: '', description: '',  email: '', phone: '', webSite: ''}}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    addHorseClub(values);
                }}>
                {(props) => (
                    <ScrollView>

                        <Text style={styles.titleText}>Register horse club</Text>

                        <Text></Text>
                        <TextInput 
                            style={globalStyles.input} 
                            placeholder='Club name'
                            onChangeText={props.handleChange('name')}
                            value={props.values.name}
                            onBlur={props.handleBlur('name')}
                        />
                        <Text style={globalStyles.errorText}>{props.touched.name && props.errors.name}</Text>

                        <TextInput 
                            style={globalStyles.input} 
                            placeholder='Phone number'
                            onChangeText={props.handleChange('phone')}
                            value={props.values.phone}
                            onBlur={props.handleBlur('phone')}
                        />
                        <Text style={globalStyles.errorText}>{props.touched.phone && props.errors.phone}</Text>

                        <TextInput 
                            style={globalStyles.input} 
                            placeholder='Email'
                            onChangeText={props.handleChange('email')}
                            value={props.values.email}
                            onBlur={props.handleBlur('email')}
                        />
                        <Text style={globalStyles.errorText}>{props.touched.email && props.errors.email}</Text>

                        <TextInput 
                            style={globalStyles.input} 
                            placeholder='Web site'
                            onChangeText={props.handleChange('webSite')}
                            value={props.values.webSite}
                            onBlur={props.handleBlur('webSite')}
                        />
                        <Text style={globalStyles.errorText}>{props.touched.webSite && props.errors.webSite}</Text>

                        <Text style={styles.label}>Trainer</Text>
                        <Picker 
                            selectedValue={trainer}
                            onValueChange={value => setTrainer(value)}
                            style={globalStyles.input}>
                            {trainers.map(trainer => <Picker.Item key={trainer.id} label={trainer.name + " " + trainer.surname} value={trainer.id}/>)}
                        </Picker>
                        <Text style={globalStyles.errorText}></Text>

                        <TextInput 
                            style={globalStyles.input}
                            multiline 
                            minHeight={130}
                            placeholder='Something about...'
                            onChangeText={props.handleChange('description')}
                            value={props.values.description}
                            onBlur={props.handleBlur('description')}
                        />

                        <Button handler={props.handleSubmit} text="Submit" />

                    </ScrollView>
                )}
            </Formik>
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
    label: {
        marginLeft: '8%',
        fontStyle: 'italic'
    }
})