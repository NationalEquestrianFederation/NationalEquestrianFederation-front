import Clubs from '../screens/horseClubs/HorseClubs';
import { createStackNavigator } from 'react-navigation-stack';
import Header from '../shared/header';
import ChoosenHorseClub from '../screens/horseClubs/ChoosenHorseClub';
import Horses from '../screens/horses/Horses';
import Riders from '../screens/riders/Riders';
import RidingSchoolOffers from '../screens/horseClubs/ridingSchoolOffers/RidingSchoolOffers';
import Trainers from '../screens/trainers/Trainers';
import HorseClubLocation from '../screens/horseClubs/HorseClubLocation';

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
        screen: RidingSchoolOffers,
        navigationOptions: {
            title: 'Riding school offers'
        }
    },
    Trainers: {
        screen: Trainers
    },
    HorseClubLocation: {
        screen: HorseClubLocation,
        navigationOptions: {
            title: 'Location'
        }
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