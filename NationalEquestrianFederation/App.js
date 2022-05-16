import { ImageBackground } from 'react-native';
import { globalStyles } from './styles/global';
import Navigator from './routes/drawer';

export default function App() {
  return (
    <ImageBackground source={require('./assets/background.jpg')} style={globalStyles.container} >
      <Navigator />
    </ImageBackground>
  );
}

