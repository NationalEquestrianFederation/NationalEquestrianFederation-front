import { StyleSheet, Button, TextInput, View, Text } from "react-native";
import { globalStyles } from "../styles/global";
import { Formik } from 'formik';

export default function AddHorseClub() {

    return (
        <View>
            <Formik
                initialValues={{title: '', body: '', rating: ''}}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                }}>
                {(props) => (
                    <View>

                        <Text style={styles.titleText}>Add horse club</Text>

                        <TextInput 
                            style={globalStyles.input} 
                            placeholder='Club name'
                            onChangeText={props.handleChange('title')}
                            value={props.values.title}
                            onBlur={props.handleBlur('title')}
                        />
                        <Text style={globalStyles.errorText}>{props.touched.title && props.errors.title}</Text>

                        <TextInput 
                            style={globalStyles.input} 
                            placeholder='Club location'
                            onChangeText={props.handleChange('title')}
                            value={props.values.title}
                            onBlur={props.handleBlur('title')}
                        />
                        <Text style={globalStyles.errorText}>{props.touched.title && props.errors.title}</Text>

                        <TextInput 
                            style={globalStyles.input}
                            multiline 
                            minHeight={60}
                            placeholder='Something about...'
                            onChangeText={props.handleChange('body')}
                            value={props.values.body}
                            onBlur={props.handleBlur('body')}
                        />
                        <Text style={globalStyles.errorText}>{props.touched.body && props.errors.body}</Text>

                    </View>
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