import { StackNavigator } from 'react-navigation';
import CityList from './src/components/CityList';
import Scroll from './src/components/Scroll';
import About from './src/components/About';

const RootNavigator = StackNavigator({
  Home: {
    screen: CityList,
    navigationOptions: {
      headerTitle: 'Home',
    },
  },
  About: {
    screen: About,
    navigationOptions: {
      headerTitle: 'About',
    },
  },
  Scroll: {
    screen: Scroll,
    navigationOptions: {
      headerTitle: 'Scroll',
    },
  },
});

export default RootNavigator;
