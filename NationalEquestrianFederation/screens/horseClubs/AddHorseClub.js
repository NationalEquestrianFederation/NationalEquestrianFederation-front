import { StyleSheet, Button, TextInput, View, Text, ScrollView } from "react-native";
import { globalStyles } from "../../styles/global";
import { Formik } from 'formik';

export default function AddHorseClub({ addHorseClub }) {

    return (
        <View>
            <Formik
                initialValues={{name: '', description: '',  email: '', phone: ''}}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    addHorseClub(values);
                }}>
                {(props) => (
                    <ScrollView>

                        <Text style={styles.titleText}>Add horse club</Text>

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
                            placeholder='Email'
                            onChangeText={props.handleChange('email')}
                            value={props.values.email}
                            onBlur={props.handleBlur('email')}
                        />
                        <Text style={globalStyles.errorText}>{props.touched.email && props.errors.email}</Text>

                        <TextInput 
                            style={globalStyles.input} 
                            placeholder='Phone'
                            onChangeText={props.handleChange('phone')}
                            value={props.values.phone}
                            onBlur={props.handleBlur('phone')}
                        />
                        <Text style={globalStyles.errorText}>{props.touched.phone && props.errors.phone}</Text>

                        <TextInput 
                            style={globalStyles.input}
                            multiline 
                            minHeight={60}
                            placeholder='Something about...'
                            onChangeText={props.handleChange('description')}
                            value={props.values.description}
                            onBlur={props.handleBlur('description')}
                        />
                        <Text style={globalStyles.errorText}>{props.touched.description && props.errors.description}</Text>

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