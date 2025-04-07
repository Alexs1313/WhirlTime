import {
  Image,
  SafeAreaView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import GradientText from '../components/TextGradient';
import {useStore} from '../../store/context';

const Result = () => {
  const {playersStore} = useStore();
  const navigation = useNavigation();

  const onShare = async () => {
    try {
      await Share.share({
        message: `The winner is ${ascSortedPlayers[0].name} with ${ascSortedPlayers[0].score} scores`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const ascSortedPlayers = playersStore.sort((a, b) => b.score - a.score);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{alignItems: 'center'}}>
        <GradientText
          colors={['#E7931D', '#F4B821', '#DE7319']}
          style={styles.gradientText}>
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
        {ascSortedPlayers.map((player, idx) =>
          idx === 0 ? (
            <View key={player.id}>
              <LinearGradient
                colors={['#E7931D', '#F4B821', '#DE7319']}
                style={{
                  height: 60,
                  width: '100%',
                  borderRadius: 15,
                  marginBottom: 10,
                }}>
                <View style={styles.scoreWrap}>
                  <Text style={idx === 0 && styles.newPlayerContainerTextFirst}>
                    {player?.name}
                  </Text>
                  <Text
                    style={idx === 0 && styles.newPlayerContainerScoreFirst}>
                    {player?.score}
                  </Text>
                </View>
              </LinearGradient>
            </View>
          ) : (
            <TouchableOpacity key={idx} style={styles.newPlayerContainer}>
              <Text style={styles.newPlayerContainerText}>{player?.name}</Text>
              <Text style={styles.newPlayerContainerScore}>
                {player?.score}
              </Text>
            </TouchableOpacity>
          ),
        )}
        <View style={styles.buttonsWrap}>
          <TouchableOpacity
            onPress={() => {
              navigation.popTo('Home');
            }}>
            <LinearGradient
              colors={['#E7931D', '#F4B821', '#DE7319']}
              style={styles.linearGradientButton}>
              <Image
                source={require('../../assets/img/home2.png')}
                style={{width: 50, height: 50}}
              />
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onShare();
            }}>
            <LinearGradient
              colors={['#E7931D', '#F4B821', '#DE7319']}
              style={styles.linearGradientButton}>
              <Image
                source={require('../../assets/img/share.png')}
                style={{width: 50, height: 50}}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View></View>
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
  gradientText: {
    fontWeight: '900',
    fontFamily: 'MontserratAlternates-bold',
    fontSize: 32,
    marginTop: 22,
    marginBottom: 72,
  },
  scoreWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 20,
    paddingTop: 12,
  },
  buttonsWrap: {
    marginTop: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
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
    width: 95,
    borderRadius: 24,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
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
  newPlayerContainerScore: {
    fontSize: 24,
    fontWeight: '900',
    fontFamily: 'MontserratAlternates-bold',
    color: '#fff',
  },
  newPlayerContainerScoreFirst: {
    fontSize: 24,
    fontWeight: '900',
    fontFamily: 'MontserratAlternates-bold',
    color: '#4A1A13',
  },
  newPlayerContainerText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'MontserratAlternates-bold',
    color: '#fff',
  },
  newPlayerContainerTextFirst: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'MontserratAlternates-bold',
    color: '#4A1A13',
  },
});

export default Result;
