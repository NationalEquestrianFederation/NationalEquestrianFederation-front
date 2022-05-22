import { StyleSheet, Button, TextInput, View, Text, ScrollView } from "react-native";
import { globalStyles } from "../styles/global";
import { Formik } from 'formik';

export default function EditHorse({ horse, editHorse }) {

    return (
        <View>
            <Formik
                initialValues={{id: horse.id, name: horse.name, gender: horse.gender, yearOfBirth: horse.yearOfBirth.toString(), owner: horse.owner}}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    editHorse(values);
                }}>
                {(props) => (
                    <ScrollView>

                        <Text style={styles.titleText}>Edit horse</Text>

                        <TextInput 
                            style={globalStyles.input} 
                            placeholder='Name'
                            onChangeText={props.handleChange('name')}
                            value={props.values.name}
                            onBlur={props.handleBlur('name')}
                        />
                        <Text style={globalStyles.errorText}>{props.touched.name && props.errors.name}</Text>

                        <TextInput 
                            style={globalStyles.input} 
                            placeholder='Gender'
                            onChangeText={props.handleChange('gender')}
                            value={props.values.gender}
                            onBlur={props.handleBlur('gender')}
                        />
                        <Text style={globalStyles.errorText}>{props.touched.gender && props.errors.gender}</Text>

                        <TextInput 
                            style={globalStyles.input} 
                            placeholder='Year of birth'
                            onChangeText={props.handleChange('yearOfBirth')}
                            value={props.values.yearOfBirth}
                            onBlur={props.handleBlur('yearOfBirth')}
                        />
                        <Text style={globalStyles.errorText}>{props.touched.yearOfBirth && props.errors.yearOfBirth}</Text>

                        <TextInput 
                            style={globalStyles.input} 
                            placeholder='Owner'
                            onChangeText={props.handleChange('owner')}
                            value={props.values.owner}
                            onBlur={props.handleBlur('owner')}
                        />
                        <Text style={globalStyles.errorText}>{props.touched.owner && props.errors.owner}</Text>

                        <Button title="Submit" onPress={props.handleSubmit} />

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
    checkbox: {
        flexDirection: 'row'
    }
})