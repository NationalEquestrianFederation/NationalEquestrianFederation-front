import Clubs from '../screens/HorseClubs';
import { createStackNavigator } from 'react-navigation-stack';
import Header from '../shared/header';
import ChoosenHorseClub from '../screens/ChoosenHorseClub';
import Horses from '../screens/Horses';
import Riders from '../screens/Riders';
import RidingSchoolOffers from '../screens/RidingSchoolOffers';
import Trainers from '../screens/Trainers';

const screens = {
    HorseClubs: {
        screen: Clubs,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header title='Horse Clubs' navigation={navigation} />
            }
        }
    },
    HorseClub: {
        screen: ChoosenHorseClub,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: navigation.getParam('name')
            }
        }
    },
    Horses: {
        screen: Horses
    },
    Riders: {
        screen: Riders
    },
    RidingSchoolOffers: {
        screen: RidingSchoolOffers
    },
    Trainers: {
        screen: Trainers
    }
}

const HorseClubsStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#9c9998',
        headerStyle: { 
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            height: 70,
          }
      }
})

export default HorseClubsStack;