import StackNav from './src/navigation/StackNav';
import {NavigationContainer} from '@react-navigation/native';
import Spiner from './src/components/Spiner';
import {StoreProvider} from './store/context';
import {useEffect, useState} from 'react';

const App = () => {
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoader(true);
    }, 4000);
  }, []);

  return (
    <NavigationContainer>
      <StoreProvider>{loader ? <StackNav /> : <Spiner />}</StoreProvider>
    </NavigationContainer>
  );
};

export default App;
