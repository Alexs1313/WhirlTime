import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import GradientText from '../components/TextGradient';
import {useStore} from '../../store/context';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';

const Result = () => {
  const {playersStore, getScore} = useStore();
  const navigation = useNavigation();

  //   useEffect(() => {
  //     getScore();
  //   }, []);

  const ascSortedPlayers = playersStore.sort((a, b) => b.score - a.score);
  console.log('sorted', ascSortedPlayers);

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
            <Text style={styles.buttonText}>
              is {ascSortedPlayers[0].name}!
            </Text>
          </View>
          <Image
            source={require('../../assets/img/categoryMan2.png')}
            style={{position: 'absolute', bottom: 20, right: 0}}
          />
        </View>
        {ascSortedPlayers.map((player, idx) => (
          <TouchableOpacity key={idx} style={styles.newPlayerContainer}>
            <Text style={styles.newPlayerContainerText}>{player?.name}</Text>
            <Text style={styles.newPlayerContainerScore}>{player?.score}</Text>
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
              style={styles.linearGradientButton}>
              <Text style={styles.buttonTextGoHome}>go home</Text>
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
  newPlayerContainerScore: {
    fontSize: 24,
    fontWeight: '900',
    fontFamily: 'MontserratAlternates-bold',
    color: '#fff',
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
  linearGradientButton: {
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
  buttonTextGoHome: {
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
