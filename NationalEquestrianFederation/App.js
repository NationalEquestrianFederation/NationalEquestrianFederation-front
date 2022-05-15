import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import Home from './screens/Home';
import { globalStyles } from './styles/global';

export default function App() {
  return (
    <ImageBackground source={require('./assets/background.jpg')} style={globalStyles.container} >
      <Home />
    </ImageBackground>
  );
}

