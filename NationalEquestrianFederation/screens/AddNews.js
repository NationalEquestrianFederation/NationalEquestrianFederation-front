import { StyleSheet, Button, TextInput, View, Text } from "react-native";
import { globalStyles } from "../styles/global";
import { Formik } from 'formik';

export default function AddNews() {

    return (
        <View>
            <Formik
                initialValues={{title: '', body: '', rating: ''}}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                }}>
                {(props) => (
                    <View>

                        <Text style={styles.titleText}>Add news</Text>

                        <TextInput 
                            style={globalStyles.input} 
                            placeholder='News title'
                            onChangeText={props.handleChange('title')}
                            value={props.values.title}
                            onBlur={props.handleBlur('title')}
                        />
                        <Text style={globalStyles.errorText}>{props.touched.title && props.errors.title}</Text>

                        <TextInput 
                            style={globalStyles.input}
                            multiline 
                            minHeight={60}
                            placeholder='News content'
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
    }
})