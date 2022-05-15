import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../screens/Home';
import News from '../screens/News';

const screens = {
    Home: {
        screen: Home
    },
    News: {
        screen: News
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);