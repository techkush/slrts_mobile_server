import { StackNavigator } from 'react-navigation';
import MainScene from './scenes/bgStart';


const RootNavigator = StackNavigator({
  Main: { screen: MainScene },
});

export default RootNavigator;