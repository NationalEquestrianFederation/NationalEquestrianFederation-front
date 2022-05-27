import { StyleSheet, Button, TextInput, View, Text, ScrollView } from "react-native";
import { globalStyles } from "../../styles/global";
import { Formik } from 'formik';

export default function AddTrainer({ addTrainer }) {

    return (
        <View>
            <Formik
                initialValues={{name: '', surname: '', dateOfBirth: '', gender: '', horseClub: 1}}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    addTrainer(values);
                }}>
                {(props) => (
                    <ScrollView>

                        <Text style={styles.titleText}>Add trainer</Text>

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