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

import GradientText from '../components/TextGradient';
import {useStore} from '../../store/context';
import {useNavigation} from '@react-navigation/native';

const Leaders = () => {
  const {playersStore} = useStore();
  const navigation = useNavigation();

  const ascSortedPlayers = playersStore.sort((a, b) => b.score - a.score);

  const onShare = async () => {
    try {
      await Share.share({
        message: `The winner is ${ascSortedPlayers[0].name} with ${ascSortedPlayers[0].score} scores`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

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
          LEADERS
        </GradientText>
      </SafeAreaView>
      <View style={{marginHorizontal: 15}}>
        {!playersStore.length > 0 ? (
          <View>
            <LinearGradient
              colors={['#E7931D', '#F4B821', '#DE7319']}
              style={styles.linearGradient}></LinearGradient>
            <View
              style={{position: 'absolute', top: 17, left: 24, width: '48%'}}>
              <Text style={styles.buttonText}>
                It's hard to say who the leader is...
              </Text>
              <Text style={styles.secondButtonText}>
                {`Play at least one game)`}
              </Text>
              <TouchableOpacity
                style={styles.startNewGameBtn}
                onPress={() => navigation.navigate('NewGame')}>
                <Text style={styles.shareBtnText}>Ok, start the game</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={require('../../assets/img/leadersMan1.png')}
              style={{position: 'absolute', bottom: 20, right: -10}}
            />
          </View>
        ) : (
          <View>
            <LinearGradient
              colors={['#E7931D', '#F4B821', '#DE7319']}
              style={styles.linearGradient}></LinearGradient>
            <View
              style={{position: 'absolute', top: 17, left: 24, width: '48%'}}>
              <Text style={styles.buttonText}>Here is the leaderboard!</Text>
              <Text style={styles.secondButtonText}>
                You can share it with your friends, maybe they will want to be
                the first.
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.shareBtn}
                onPress={() => onShare()}>
                <Text style={styles.shareBtnText}>SHARE</Text>
                <Image source={require('../../assets/img/share.png')} />
              </TouchableOpacity>
            </View>
            <Image
              source={require('../../assets/img/leadersMan.png')}
              style={{position: 'absolute', bottom: 20, right: -10}}
            />
          </View>
        )}

        {playersStore.length > 0 && (
          <View style={styles.leadersContainer}>
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
                      <Text
                        style={idx === 0 && styles.newPlayerContainerTextFirst}>
                        {player?.name}
                      </Text>
                      <Text
                        style={
                          idx === 0 && styles.newPlayerContainerScoreFirst
                        }>
                        {player?.score}
                      </Text>
                    </View>
                  </LinearGradient>
                </View>
              ) : (
                <TouchableOpacity key={idx} style={styles.newPlayerContainer}>
                  <Text style={styles.newPlayerContainerText}>
                    {player?.name}
                  </Text>
                  <Text style={styles.newPlayerContainerScore}>
                    {player?.score}
                  </Text>
                </TouchableOpacity>
              ),
            )}
          </View>
        )}

        {/* <View style={{marginTop: 22}}>
          <ButtonLinear text={'Start Play'} navigateTo={'Game'} />
        </View> */}
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
    height: 240,
    width: '100%',
    borderRadius: 24,
    marginBottom: 20,
  },
  scoreWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 20,
    paddingTop: 12,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '900',
    fontFamily: 'MontserratAlternates-bold',
    color: '#4A1A13',
    backgroundColor: 'transparent',
    marginBottom: 13,
  },
  leadersContainer: {
    backgroundColor: '#670000',
    borderRadius: 22,
    padding: 15,
    marginHorizontal: 10,
  },
  secondButtonText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'MontserratAlternates-bold',
    color: '#4A1A13',
    marginBottom: 13,
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
  shareBtn: {
    width: '90%',
    padding: 20,
    paddingLeft: 35,
    paddingRight: 35,
    backgroundColor: '#fff',
    height: 55,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  startNewGameBtn: {
    width: '100%',
    padding: 15,
    backgroundColor: '#fff',
    height: 55,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareBtnText: {
    fontSize: 14,
    fontWeight: '900',
    fontFamily: 'MontserratAlternates-bold',
    color: '#4A1A13',
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

export default Leaders;
