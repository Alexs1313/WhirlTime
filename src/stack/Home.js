import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ButtonLinear from '../components/ButtonLinear';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {useStore} from '../../store/context';
import {useIsFocused} from '@react-navigation/native';

const Home = () => {
  const {removePlayers} = useStore();
  const isFocused = useIsFocused();

  // useEffect(() => {
  //   AsyncStorage.clear();
  //   console.log('asyncstorage CLEAR');
  // }, []);

  useEffect(() => {
    console.log('isFocused');
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <SafeAreaView
        style={{
          marginBottom: 25,
          alignItems: 'center',
        }}>
        <Image
          source={require('../../assets/img/main.png')}
          style={styles.image}
        />
      </SafeAreaView>

      <View style={styles.buttonWrap}>
        <ButtonLinear text={'New game'} navigateTo={'NewGame'} />
        <ButtonLinear text={'Rules'} navigateTo={'Rules'} />
        <ButtonLinear text={'Leaders'} navigateTo={'Leaders'} />
        <ButtonLinear text={'Info'} navigateTo={'Info'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#520000',
  },
  buttonWrap: {
    marginHorizontal: 39,
  },
  image: {},
});

export default Home;
