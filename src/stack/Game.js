import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  StyleSheet,
  View,
  Image,
  Easing,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import GradientText from '../components/TextGradient';
import LinearGradient from 'react-native-linear-gradient';

import {useStore} from '../../store/context';

const Game = () => {
  const rotation = useRef(new Animated.Value(0)).current;
  const [isAnimating, setIsAnimating] = useState(false);
  const [stopLoader, setStopLoader] = useState(false);
  const {newPlayers} = useStore();
  const navigation = useNavigation();
  const {setCurrentIdx, randomIdx, setRandomIdx} = useStore();

  const randomIndex = () => {
    const random = Math.floor(Math.random() * newPlayers.length);
    setRandomIdx(random);
  };

  useEffect(() => {
    const startRotation = () => {
      setIsAnimating(true);
      Animated.loop(
        Animated.timing(rotation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ).start();
    };
    startRotation();
    setTimeout(() => {
      rotation.stopAnimation();
      randomIndex();
      setStopLoader(true);
    }, 3000);
  }, []);

  const rotationValue = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <GradientText
          colors={['#E7931D', '#F4B821', '#DE7319']}
          style={{
            fontWeight: '900',
            fontFamily: 'MontserratAlternates-bold',
            fontSize: 32,
            marginTop: stopLoader ? 120 : 22,
            marginBottom: 62,
            textAlign: 'center',
            marginHorizontal: 19,
          }}>
          {!stopLoader
            ? `ATTENTION! 
WE ARE CHOOSING A PLAYER!`
            : `PLAYER SELECTED!`}
        </GradientText>
      </SafeAreaView>
      <View style={styles.wrapper}>
        {stopLoader && (
          <View style={styles.newPlayerContainerSelected}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.newPlayerContainerText}>
                {newPlayers[randomIdx].name}
              </Text>
              <LinearGradient
                colors={['#E7931D', '#F4B821', '#DE7319']}
                style={styles.addButton}>
                <Image
                  source={require('../../assets/img/select.png')}
                  style={{
                    backgroundColor: 'transparent',
                  }}
                />
              </LinearGradient>
            </View>
          </View>
        )}

        {newPlayers.map(
          (player, idx) =>
            !stopLoader && (
              <View
                key={player.id}
                style={
                  (idx == 0 && styles.newPlayerContainer) ||
                  (idx == 1 && styles.newPlayerContainer1) ||
                  (idx == 2 && styles.newPlayerContainer2) ||
                  (idx == 3 && styles.newPlayerContainer3) ||
                  (idx == 4 && styles.newPlayerContainer4) ||
                  (idx == 5 && styles.newPlayerContainer5)
                }>
                <Text style={styles.newPlayerContainerText}>{player.name}</Text>
              </View>
            ),
        )}
      </View>
      <Animated.Image
        source={require('../../assets/img/mainLoader.png')}
        style={[
          styles.image,
          {
            transform: [{rotate: rotationValue}],
          },
        ]}
      />
      {!stopLoader && (
        <Image
          source={require('../../assets/img/manRoulette.png')}
          style={{top: 90, right: -120}}
        />
      )}
      {stopLoader && (
        <View style={{marginTop: 88, width: '85%'}}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('Questions'), setCurrentIdx(prev => prev + 1);
            }}
            style={styles.container}>
            <LinearGradient
              colors={['#E7931D', '#F4B821', '#DE7319']}
              style={styles.linearGradient}>
              <Text style={styles.buttonText}>Show question</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#520000',
    alignItems: 'center',
  },
  image: {
    marginTop: 60,
  },
  wrapper: {
    marginHorizontal: 15,
    width: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  newPlayerContainer: {
    height: 60,
    left: 130,
    backgroundColor: 'rgba(128, 0, 0, 0.45)',
    borderRadius: 15,
    padding: 15,
    width: '30%',
    borderWidth: 1,
    borderColor: 'rgba(231, 147, 29, 1)',
  },
  newPlayerContainerSelected: {
    height: 60,
    left: 110,
    backgroundColor: 'rgba(128, 0, 0, 0.45)',
    borderRadius: 15,
    padding: 10,
    minWidth: '30%',
    borderWidth: 1,
    borderColor: 'rgba(231, 147, 29, 1)',
  },
  addButton: {
    width: 39,
    height: 39,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  newPlayerContainer1: {
    height: 60,
    position: 'absolute',
    top: 330,
    left: 130,
    backgroundColor: 'rgba(128, 0, 0, 0.45)',
    borderRadius: 15,
    width: '30%',
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(231, 147, 29, 1)',
  },
  newPlayerContainer2: {
    height: 60,
    position: 'absolute',
    top: 100,
    right: 0,
    width: '30%',
    backgroundColor: 'rgba(128, 0, 0, 0.45)',
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(231, 147, 29, 1)',
  },
  newPlayerContainer3: {
    height: 60,
    top: 250,
    right: 0,
    position: 'absolute',
    backgroundColor: 'rgba(128, 0, 0, 0.45)',
    borderRadius: 15,
    padding: 15,
    width: '30%',
    borderWidth: 1,
    borderColor: 'rgba(231, 147, 29, 1)',
  },
  newPlayerContainer4: {
    height: 60,
    top: 100,
    position: 'absolute',
    width: '30%',
    backgroundColor: 'rgba(128, 0, 0, 0.45)',
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(231, 147, 29, 1)',
  },
  newPlayerContainer5: {
    height: 60,
    top: 250,
    position: 'absolute',
    width: '30%',
    backgroundColor: 'rgba(128, 0, 0, 0.45)',
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(231, 147, 29, 1)',
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
});

export default Game;
