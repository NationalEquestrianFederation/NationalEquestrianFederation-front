import { View, ImageBackground, StyleSheet, Text } from 'react-native';
import { globalStyles } from '../../styles/global';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

export default function HorseClubLocation({ navigation }) {

    const [role, setRole] = useState("");
    const [longitude, setLongitude] = useState(19.843904);
    const [latitude, setLatitude] = useState(45.263938);
    const [address, setAddress] = useState("");

    useEffect(() => {
        setRoleName();

        var initLatitude = 45.263938;
        var initLongitude = 19.843904;
        setLocation(initLatitude, initLongitude);
    }, [])

    const setRoleName = async () => {
        var token = await AsyncStorage.getItem('access_token');
        var decodedToken = jwt_decode(token);
        setRole(decodedToken.role);
    }

    const setLocation = async (latitude, longitude) => {

        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          console.log(
            'Permission not granted',
            'Allow the app to use location service.',
            [{ text: 'OK' }],
            { cancelable: false }
          );
        }

        var data = await Location.reverseGeocodeAsync({latitude, longitude});
        for(let item of data) {
            let address = `${item.street} ${item.streetNumber}, ${item.city}, ${item.country}`;
            setAddress(address);
        }
    }

    const moveMarker = (e) => {
        if(role === "ROLE_NATIONAL_FEDERATION") {
            var latlng = e.nativeEvent.coordinate;
            setLatitude(latlng.latitude);
            setLongitude(latlng.longitude);
            setLocation(latlng.latitude, latlng.longitude);
        }        
    }

    return (
        <ImageBackground source={require('../../assets/background.jpg')} style={globalStyles.container} >
            <Text style={styles.address}>{address}</Text>
            <MapView 
                style={styles.map} 
                initialRegion={{
                    latitude: 45.263938,
                    longitude: 19.843904,
                    latitudeDelta: 0.09,
                    longitudeDelta: 0.04,
                }}
                onPress={(e) => moveMarker(e)}
            >
                <Marker
                    coordinate={{latitude: latitude, longitude: longitude}}
                />
            </MapView>
        </ImageBackground>
    )

}

const styles = StyleSheet.create({
    map: {
        width: '90%',
        height: '90%',
        alignSelf: 'center',
        marginVertical: 20,
    },
    address: {
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: -6,
        fontSize: 20,
        color: 'white',
        fontStyle: 'italic'
    }
})