import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import HomeStack from './homeStack';
import CompetitionCalendarStack from './competitionCalendarStack';
import HorseClubsStack from './horseClubsStack';
import CompetitionRequestsStack from './competitionRequestsStack';

const RootDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: HomeStack
    },
    CompetitionCalendar: {
        screen: CompetitionCalendarStack
    },
    CompetitionRequests: {
        screen: CompetitionRequestsStack
    },
    HorseClubs: {
        screen: HorseClubsStack
    }
})

export default createAppContainer(RootDrawerNavigator);