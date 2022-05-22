import { StyleSheet, Button, TextInput, View, Text, ScrollView } from "react-native";
import { globalStyles } from "../styles/global";
import { Formik } from 'formik';

export default function EditRider({ rider, editRider }) {

    return (
        <View>
            <Formik
                initialValues={{id: rider.id, name: rider.name, surname: rider.surname, dateOfBirth: rider.dateOfBirth, 
                    gender: rider.gender, licence: rider.licence}}
                onSubmit={(values, actions) => {
                    editRider(values);
                }}>
                {(props) => (
                    <ScrollView>

                        <Text style={styles.titleText}>Edit rider</Text>

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
                            placeholder='Surname'
                            onChangeText={props.handleChange('surname')}
                            value={props.values.surname}
                            onBlur={props.handleBlur('surname')}
                        />
                        <Text style={globalStyles.errorText}>{props.touched.surname && props.errors.surname}</Text>

                        <TextInput 
                            style={globalStyles.input} 
                            placeholder='Date of birth'
                            onChangeText={props.handleChange('dateOfBirth')}
                            value={props.values.dateOfBirth}
                            onBlur={props.handleBlur('dateOfBirth')}
                        />
                        <Text style={globalStyles.errorText}>{props.touched.dateOfBirth && props.errors.dateOfBirth}</Text>

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
                            placeholder='Licence'
                            onChangeText={props.handleChange('licence')}
                            value={props.values.licence}
                            onBlur={props.handleBlur('licence')}
                        />
                        <Text style={globalStyles.errorText}>{props.touched.licence && props.errors.licence}</Text>

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
})