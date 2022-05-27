import { StyleSheet, Button, TextInput, View, Text } from "react-native";
import { globalStyles } from "../../styles/global";
import { Formik } from 'formik';

export default function AddNews({ addNews }) {

    return (
        <View>
            <Formik
                initialValues={{title: '', content: '', newsType: 'nationalFederation', postedBy: 1}}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    addNews(values);
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
                            onChangeText={props.handleChange('content')}
                            value={props.values.content}
                            onBlur={props.handleBlur('content')}
                        />
                        <Text style={globalStyles.errorText}>{props.touched.content && props.errors.content}</Text>

                        <Button title="Submit" onPress={props.handleSubmit} />

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