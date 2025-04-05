import {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import ButtonLinear from '../components/ButtonLinear';
import GradientText from '../components/TextGradient';
import {useStore, newPlayers} from '../../store/context';
import {useNavigation} from '@react-navigation/native';

const Result = () => {
  const {
    category,
    setCategory,
    getPlayers,
    playersStore,
    setPlayersStore,
    setNewPlayers,
  } = useStore();
  const navigation = useNavigation();
  console.log('playersStore', playersStore);

  const categories = [
    {
      category: 'Movie',
    },
    {
      category: 'Sport',
    },
    {
      category: 'Books',
    },
    {
      category: 'Geography',
    },
    {
      category: 'General knowledge',
    },
  ];

  return (
    <View style={styles.container}>
      <SafeAreaView style={{alignItems: 'center'}}>
        <GradientText
          colors={['#E7931D', '#F4B821', '#DE7319']}
          style={{
            fontWeight: '900',
            fontFamily: 'MontserratAlternates-bold',
            fontSize: 32,
            marginTop: 22,
            marginBottom: 72,
          }}>
          RESULT
        </GradientText>
      </SafeAreaView>
      <View style={{marginHorizontal: 15}}>
        <View>
          <LinearGradient
            colors={['#E7931D', '#F4B821', '#DE7319']}
            style={styles.linearGradient}></LinearGradient>
          <View style={{position: 'absolute', top: 17, left: 24}}>
            <Text style={styles.buttonText}>The winner</Text>
            <Text style={styles.buttonText}>is !</Text>
          </View>
          <Image
            source={require('../../assets/img/categoryMan2.png')}
            style={{position: 'absolute', bottom: 20, right: 0}}
          />
        </View>
        {playersStore.map((player, idx) => (
          <TouchableOpacity
            // onPress={() => setCategory(cat.category)}
            // activeOpacity={0.7}
            key={idx}
            style={styles.newPlayerContainer}>
            <Text style={styles.newPlayerContainerText}>{player?.name}</Text>
          </TouchableOpacity>
        ))}
        <View style={{marginTop: 22}}>
          <TouchableOpacity
            onPress={() => {
              navigation.popTo('Home');
            }}
            style={styles.container}>
            <LinearGradient
              colors={['#E7931D', '#F4B821', '#DE7319']}
              style={styles.linearGradient}>
              <Text style={styles.buttonText}>go home</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#520000',
  },
  linearGradient: {
    height: 106,
    width: '100%',
    borderRadius: 24,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '900',
    fontFamily: 'MontserratAlternates-bold',
    color: '#4A1A13',
    backgroundColor: 'transparent',
  },

  addButton: {
    width: 39,
    height: 39,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newPlayerContainer: {
    height: 60,
    backgroundColor: 'rgba(128, 0, 0, 0.45)',
    width: '100%',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(231, 147, 29, 1)',
  },
  inactivePlayerContainer: {
    height: 60,
    backgroundColor: 'rgba(128, 0, 0, 0.45)',
    width: '100%',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(231, 147, 29, 1)',
    opacity: 0.7,
  },
  newPlayerContainerText: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'MontserratAlternates-bold',
    color: '#fff',
  },
  inactiveText: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'MontserratAlternates-bold',
    color: 'rgba(255, 255, 255, 1)',
    opacity: 0.7,
  },
  linearGradient: {
    height: 95,
    width: '100%',
    borderRadius: 24,
    marginBottom: 24,
    shadowColor: 'rgba(179, 179, 179, 0.25)',
    shadowOffset: {
      width: 6,
      height: 7,
    },
    shadowOpacity: 1,
    shadowRadius: 0.5,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '900',
    fontFamily: 'MontserratAlternates-bold',
    textAlign: 'center',
    margin: 10,
    color: '#4A1A13',
    backgroundColor: 'transparent',
    marginTop: 33,
  },
});

export default Result;
