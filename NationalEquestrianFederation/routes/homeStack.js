import { createStackNavigator } from 'react-navigation-stack';
import Home from '../screens/Home';
import News from '../screens/news/News';
import ChoosenNews from '../screens/news/ChoosenNews';
import Header from '../shared/header';
import LogIn from '../screens/LogIn';

const screens = {
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header title='Welcome to NEF' navigation={navigation} />
            }
        }
    },
    LogIn: {
        screen: LogIn,
        navigationOptions: {
            title: 'Log in'
        }
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

export default HomeStack;