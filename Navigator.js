import { StackNavigator } from 'react-navigation';
import CityList from './src/components/CityList';
import Positions from './src/components/Positions';

const RootNavigator = StackNavigator({
  Home: {
    screen: CityList,
    navigationOptions: {
      header: null,
      headerTitle: 'Home',
    },
  },
  Positions: {
    screen: Positions,
    navigationOptions: {
      header: null,
      headerTitle: 'Positions',
    },
  },
});

export default RootNavigator;
