import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../screens/Home';
import News from '../screens/News';
import ChoosenNews from '../screens/ChoosenNews';

const screens = {
    Home: {
        screen: Home
    },
    News: {
        screen: News
    },
    ChoosenNews: {
        screen: ChoosenNews,
        navigationOptions: {
            title: ''
        }
    }
}

const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
      headerTintColor: '#9c9998',
      headerStyle: { 
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          height: 70,
        }
    }
  });

export default createAppContainer(HomeStack);