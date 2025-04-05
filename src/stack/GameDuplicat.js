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
import ButtonLinear from '../components/ButtonLinear';
import GradientText from '../components/TextGradient';
import LinearGradient from 'react-native-linear-gradient';

import {questions} from '../data/questions';

import {useNavigation} from '@react-navigation/native';

import {useStore} from '../../store/context';

const GameDuplicat = () => {
  const rotation = useRef(new Animated.Value(0)).current;
  const [isAnimating, setIsAnimating] = useState(false);
  const [randomIdx, setRandomIdx] = useState(0);
  const [stopLoader, setStopLoader] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const {newPlayers} = useStore();
  const [selectedCat, setSelectedCat] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [findAnswer, setFindAnswer] = useState(false);
  const navigation = useNavigation();

  const {category, setCategory} = useStore();
  const [filtered, setFiltered] = useState(
    questions.filter(question => question.category === category),
  );
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(15);

  useEffect(() => {
    let timerInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        if (minutes === 0) {
          clearInterval(timerInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [minutes, seconds]);

  const findOutAnswer = () => {
    const isCorrectAnswer = filtered[currentIdx].answer == selectedCat;
    setIsCorrect(isCorrectAnswer);
    setFindAnswer(true);
  };

  const randomIndex = () => {
    const random = Math.floor(Math.random() * (newPlayers.length - 1));
    setRandomIdx(random);
    console.log('randome', random);
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
    <>
      {!showQuestion ? (
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
              }}>
              {!stopLoader
                ? `ATTENTION! 
WE ARE CHOOSING A PLAYER!`
                : `PLAYER SELECTED!`}
            </GradientText>
          </SafeAreaView>
          <View
            style={{
              marginHorizontal: 15,
              width: '90%',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
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
                    <Text style={styles.newPlayerContainerText}>
                      {player.name}
                    </Text>
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
                onPress={() => setShowQuestion(true)}
                style={styles.container}>
                <LinearGradient
                  colors={['#E7931D', '#F4B821', '#DE7319']}
                  style={styles.linearGradient}>
                  <Text style={styles.buttonTextShowQuestion}>
                    Show question
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.container}>
          <SafeAreaView style={{alignItems: 'center'}}>
            {!findAnswer ? (
              <View style={styles.timerContainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.timerText}>{`${minutes
                    .toString()
                    .padStart(2, '0')}:${seconds
                    .toString()
                    .padStart(2, '0')}`}</Text>
                  <LinearGradient
                    colors={['#E7931D', '#F4B821', '#DE7319']}
                    style={styles.addButton}>
                    <Image
                      source={require('../../assets/img/timer.png')}
                      style={{
                        backgroundColor: 'transparent',
                      }}
                    />
                  </LinearGradient>
                </View>
              </View>
            ) : (
              <GradientText
                colors={['#E7931D', '#F4B821', '#DE7319']}
                style={{
                  fontWeight: '900',
                  fontFamily: 'MontserratAlternates-bold',
                  fontSize: 32,
                  marginTop: 22,
                  marginBottom: 72,
                }}>
                {isCorrect ? 'KEEP IT UP!' : 'OH, NOT THIS TIME!'}
              </GradientText>
            )}
          </SafeAreaView>
          <View style={{marginHorizontal: 15}}>
            <View style={styles.qustionContainer}>
              <GradientText
                colors={['#E7931D', '#F4B821', '#DE7319']}
                style={{
                  fontWeight: '900',
                  fontFamily: 'MontserratAlternates-bold',
                  fontSize: 24,
                  textAlign: 'center',
                }}>
                {<Text>{filtered[currentIdx].question}</Text>}
              </GradientText>
            </View>

            {filtered[currentIdx].options.map((category, idx) =>
              findAnswer ? (
                <View key={idx}>
                  <TouchableOpacity
                    disabled={findAnswer}
                    onPress={() => setSelectedCat(category)}
                    activeOpacity={0.7}
                    style={
                      category === selectedCat || selectedCat === null
                        ? isCorrect
                          ? styles.newPlayerContainerCorrect
                          : styles.newPlayerContainerUnCorrect
                        : styles.inactivePlayerContainer
                    }>
                    <Text
                      style={
                        category === selectedCat || selectedCat === null
                          ? styles.newPlayerContainerText
                          : styles.inactiveText
                      }>
                      {category}
                    </Text>
                    {category === selectedCat && isCorrect && (
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
                    )}
                    {category === selectedCat && !isCorrect && (
                      <LinearGradient
                        colors={['#E7931D', '#F4B821', '#DE7319']}
                        style={styles.addButton}>
                        <Image
                          source={require('../../assets/img/inCorrect.png')}
                          style={{
                            backgroundColor: 'transparent',
                          }}
                        />
                      </LinearGradient>
                    )}
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <TouchableOpacity
                    onPress={() => setSelectedCat(category)}
                    activeOpacity={0.7}
                    key={idx}
                    style={
                      category === selectedCat || selectedCat === null
                        ? styles.newPlayerContainer
                        : styles.inactivePlayerContainer
                    }>
                    <Text
                      style={
                        category === selectedCat || selectedCat === null
                          ? styles.newPlayerContainerText
                          : styles.inactiveText
                      }>
                      {category}
                    </Text>
                  </TouchableOpacity>
                </View>
              ),
            )}

            {selectedCat !== null &&
              (findAnswer ? (
                <View style={{marginTop: 22, marginHorizontal: 20}}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    disabled={selectedCat === null}
                    onPress={() => {
                      setShowQuestion(false),
                        setFindAnswer(false),
                        setSelectedCat(null);
                      setCurrentIdx(prev => prev + 1);
                    }}
                    style={{}}>
                    <LinearGradient
                      colors={['#E7931D', '#F4B821', '#DE7319']}
                      style={styles.linearGradientBtn}>
                      <Text style={styles.buttonText}>Continue</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={{marginTop: 22, marginHorizontal: 20}}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    disabled={selectedCat === null}
                    onPress={() => findOutAnswer()}
                    style={{}}>
                    <LinearGradient
                      colors={['#E7931D', '#F4B821', '#DE7319']}
                      style={styles.linearGradientBtn}>
                      <Text style={styles.buttonText}>Find out the answer</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        </View>
      )}
    </>
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
    // width: 100,
    // height: 100,
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

  // linearGradient: {
  //   width: '100%',
  //   borderRadius: 24,
  //   marginBottom: 20,
  // },
  timerContainer: {
    height: 60,
    width: '30%',
    borderRadius: 15,
    backgroundColor: '#800000',
    borderWidth: 1,
    borderColor: '#E7931D',
    padding: 10,
    marginBottom: 40,
    marginTop: 20,
  },
  timerText: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'MontserratAlternates-bold',
    textAlign: 'center',
    marginLeft: 5,
    color: '#fff',
  },
  linearGradientBtn: {
    height: 95,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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
  buttonTextShowQuestion: {
    fontSize: 24,
    fontWeight: '900',
    fontFamily: 'MontserratAlternates-bold',
    textAlign: 'center',
    margin: 10,
    color: '#4A1A13',
    backgroundColor: 'transparent',
    marginTop: 33,
  },
  qustionContainer: {
    backgroundColor: '#670000',
    borderRadius: 25,
    paddingBottom: 28,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 10,
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
  newPlayerContainerCorrect: {
    height: 60,
    backgroundColor: 'green',
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
  newPlayerContainerUnCorrect: {
    height: 60,
    backgroundColor: 'red',
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
    opacity: 0.6,
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
    opacity: 0.6,
  },
});

export default GameDuplicat;
