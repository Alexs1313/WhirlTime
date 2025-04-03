import {Text, View} from 'react-native';
import Home from './src/stack/Home';
import StackNav from './src/navigation/StackNav';
import {NavigationContainer} from '@react-navigation/native';
import Onboard from './src/stack/Onboard';
import {createStackNavigator} from '@react-navigation/stack';
import Spiner from './src/components/Spiner';
import Game from './src/stack/Game';
import {StoreProvider} from './store/context';

const App = () => {
  return (
    <NavigationContainer>
      <StoreProvider>
        <StackNav />
      </StoreProvider>
      {/* <Game /> */}
      {/* <Onboard /> */}
      {/* <Spiner /> */}
    </NavigationContainer>
  );
};

export default App;
