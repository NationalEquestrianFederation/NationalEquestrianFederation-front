import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import HomeStack from './homeStack';
import CompetitionCalendarStack from './competitionCalendarStack';

const RootDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: HomeStack
    },
    CompetitionCalendar: {
        screen: CompetitionCalendarStack
    }
})

export default createAppContainer(RootDrawerNavigator);