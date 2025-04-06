import {Text, View} from 'react-native';
import Home from './src/stack/Home';
import StackNav from './src/navigation/StackNav';
import {NavigationContainer} from '@react-navigation/native';
import Onboard from './src/stack/Onboard';
import {createStackNavigator} from '@react-navigation/stack';
import Spiner from './src/components/Spiner';
import Game from './src/stack/Game';
import {StoreProvider} from './store/context';
import {useEffect, useState} from 'react';

const App = () => {
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoader(true);
    }, 3000);
  }, []);

  return (
    <NavigationContainer>
      <StoreProvider>{loader ? <StackNav /> : <Spiner />}</StoreProvider>
      {/* <Game /> */}
      {/* <Onboard /> */}
    </NavigationContainer>
  );
};

export default App;
