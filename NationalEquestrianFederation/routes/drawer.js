import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import HomeStack from './homeStack';
import CompetitionCalendarStack from './competitionCalendarStack';
import HorseClubsStack from './horseClubsStack';

const RootDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: HomeStack
    },
    CompetitionCalendar: {
        screen: CompetitionCalendarStack
    },
    HorseClubs: {
        screen: HorseClubsStack
    }
})

export default createAppContainer(RootDrawerNavigator);