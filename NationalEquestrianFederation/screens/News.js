import { Text, ImageBackground } from 'react-native';
import { globalStyles } from '../styles/global';

export default function News() {
    return (
        <ImageBackground source={require('../assets/background.jpg')} style={globalStyles.container} >
            <Text>News</Text>
        </ImageBackground>
    )
}