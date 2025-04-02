import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet, Text, View} from 'react-native';
import Home from '../stack/Home';
import Onboard from '../stack/Onboard';
import NewGame from '../stack/NewGame';
import SelectCategory from '../stack/SelectCategory';
import Game from '../stack/Game';
import Info from '../stack/Info';
import Rules from '../stack/Rules';
import Questions from '../stack/Questions';

const Stack = createStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="Onboard" component={Onboard} /> */}
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="NewGame" component={NewGame} />
      <Stack.Screen name="SelectCategory" component={SelectCategory} />
      <Stack.Screen name="Game" component={Game} />
      <Stack.Screen name="Info" component={Info} />
      <Stack.Screen name="Rules" component={Rules} />
      <Stack.Screen name="Questions" component={Questions} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default StackNav;
