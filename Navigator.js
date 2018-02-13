import { StackNavigator } from 'react-navigation';
import CityList from './src/components/CityList';
import Positions from './src/components/Positions';
import About from './src/components/About';

const RootNavigator = StackNavigator({
  Home: {
    screen: CityList,
    navigationOptions: {
      header: null,
      headerTitle: 'Home',
    },
  },
  About: {
    screen: About,
    navigationOptions: {
      headerTitle: 'About',
    },
  },
  Positions: {
    screen: Positions,
    navigationOptions: {
      headerTitle: 'Positions',
    },
  },
});

export default RootNavigator;
