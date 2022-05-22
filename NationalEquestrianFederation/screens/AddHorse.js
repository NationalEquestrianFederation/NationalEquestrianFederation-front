import { StyleSheet, Button, TextInput, View, Text, ScrollView } from "react-native";
import { globalStyles } from "../styles/global";
import { Formik } from 'formik';

export default function AddHorse({ addHorse }) {

    return (
        <View>
            <Formik
                initialValues={{name: '', gender: '', horseClub: 1, owner: '', yearOfBirth: ''}}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    addHorse(values);
                }}>
                {(props) => (
                    <ScrollView>

                        <Text style={styles.titleText}>Add horse</Text>

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
})