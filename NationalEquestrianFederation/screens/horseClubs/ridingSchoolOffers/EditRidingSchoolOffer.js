import { StyleSheet, Button, TextInput, View, Text, ScrollView } from "react-native";
import { globalStyles } from "../../../styles/global";
import { Formik } from 'formik';

export default function EditRidingSchoolOffer({ offer, editOffer }) {

    return (
        <View>
            <Formik
                initialValues={{id: offer.id, name: offer.name, price: offer.price.toString(), startDate: offer.startDate, endDate: offer.endDate,
                     description: offer.description}}
                    onSubmit={(values, actions) => {
                    editOffer(values);
                }}>
                {(props) => (
                    <ScrollView>

                        <Text style={styles.titleText}>Edit riding school offer</Text>

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
                            placeholder='Price'
                            keyboardType="numeric"
                            onChangeText={props.handleChange('price')}
                            value={props.values.price}
                            onBlur={props.handleBlur('price')}
                        />
                        <Text style={globalStyles.errorText}>{props.touched.price && props.errors.price}</Text>

                        <TextInput 
                            style={globalStyles.input} 
                            placeholder='Start date'
                            onChangeText={props.handleChange('startDate')}
                            value={props.values.startDate}
                            onBlur={props.handleBlur('startDate')}
                        />
                        <Text style={globalStyles.errorText}>{props.touched.startDate && props.errors.startDate}</Text>

                        <TextInput 
                            style={globalStyles.input} 
                            placeholder='End date'
                            onChangeText={props.handleChange('endDate')}
                            value={props.values.endDate}
                            onBlur={props.handleBlur('endDate')}
                        />
                        <Text style={globalStyles.errorText}>{props.touched.endDate && props.errors.endDate}</Text>

                        <TextInput 
                            style={globalStyles.input} 
                            placeholder='Description'
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
})