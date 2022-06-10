import { createStackNavigator } from 'react-navigation-stack';
import ChoosenCompetition from '../screens/competitions/ChoosenCompetition';
import ChoosenDate from '../screens/competitions/ChoosenDate';
import CompetitionApplications from '../screens/competitions/CompetitionApplications';
import CompetitionCalendar from '../screens/competitions/CompetitionCalendar';
import Header from '../shared/header';

const screens = {
    CompetitionCalendar: {
        screen: CompetitionCalendar,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header title='Competition Calendar' navigation={navigation} />
            }
        }
    },
    ChoosenDate: {
        screen: ChoosenDate,
        navigationOptions: {
            title: ''
        }
    },
    ChoosenCompetition: {
        screen: ChoosenCompetition,
        navigationOptions: {
            title: ''
        }
    },
    CompetitionApplications: {
        screen: CompetitionApplications,
        navigationOptions: {
            title: 'Applications'
        }
    }
}

const CompetitionCalendarStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
      headerTintColor: '#9c9998',
      headerStyle: { 
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          height: 70,
        }
    }
  });

export default CompetitionCalendarStack;