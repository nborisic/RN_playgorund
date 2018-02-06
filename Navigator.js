import { StackNavigator } from 'react-navigation';
import Scroll from './src/components/Scroll';
import About from './src/components/About';

const RootNavigator = StackNavigator({
  Home: {
    screen: Scroll,
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
});

export default RootNavigator;
