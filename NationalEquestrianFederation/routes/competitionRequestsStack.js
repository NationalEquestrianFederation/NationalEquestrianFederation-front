import { createStackNavigator } from 'react-navigation-stack';
import Header from '../shared/header';
import CompetitionRequests from '../screens/competitions/CompetitionRequests';

const screens = {
    CompetitionRequests: {
        screen: CompetitionRequests,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header title='Competition Requests' navigation={navigation} />
            }
        }
    },
}

const CompetitionRequestsStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
      headerTintColor: '#9c9998',
      headerStyle: { 
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          height: 70,
        }
    }
  });

export default CompetitionRequestsStack;