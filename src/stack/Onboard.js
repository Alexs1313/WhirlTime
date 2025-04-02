import {useState} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import ButtonLinear from '../components/ButtonLinear';
import ButtonOnboard from '../components/ButtonOnboard';
import GradientText from '../components/TextGradient';
import Gradient from '../components/RadialGrad';

const Onboard = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const onboard = [
    {
      title: `Hello, smart guy! I'm the host of your game!`,
      image: require('../../assets/img/onboard/man1.png'),
      buttonText: 'Hello! Lets Go',
      description:
        'I will take you to the world of intellectual battles! Here everything is decided by your intelligence, speed and a little luck.',
    },
    {
      title: `Join the battle of minds!`,
      image: require('../../assets/img/onboard/group.png'),
      buttonText: 'Next',
      description: `Invite your friends, choose your favorite category and become the smartest in the game.
Your intuition and erudition are your main weapons`,
    },
    {
      title: `Turn the arrow and act!`,
      image: require('../../assets/img/onboard/loader.png'),
      buttonText: 'Continue',
      description: `The arrow chooses who answers. 
Don't know? You're out of the round.
The smartest and smartest player wins! `,
    },
    {
      title: `5 topics, 
1 winner!`,
      image: require('../../assets/img/onboard/man2.png'),
      buttonText: 'Start to play',
      description: `Movies, sports, geography, books, general knowledge - choose what you like.
Get ready for fun but tricky questions!`,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center'}}>
        {currentIdx === 0 && (
          <Image
            source={require('../../assets/img/onboard/man1.png')}
            style={{position: 'absolute', bottom: -250}}
          />
        )}

        {currentIdx === 1 && (
          <View>
            <Gradient />
            <Image
              source={require('../../assets/img/onboard/group.png')}
              style={{}}
            />
          </View>
        )}

        {currentIdx === 2 && (
          <Image
            source={require('../../assets/img/onboard/loader.png')}
            style={{marginBottom: 85}}
          />
        )}
        {currentIdx === 3 && (
          <Image
            source={require('../../assets/img/onboard/man2.png')}
            style={{position: 'absolute', bottom: -110}}
          />
        )}
      </View>
      <View style={styles.sectionContainer}>
        <GradientText
          colors={['#E7931D', '#F4B821', '#DE7319']}
          style={{
            fontWeight: '900',
            fontFamily: 'MontserratAlternates-bold',
            fontSize: 24,
            textAlign: 'center',
            marginBottom: 20,
          }}>
          {onboard[currentIdx].title}
        </GradientText>
        <Text
          style={{
            textAlign: 'center',
            marginBottom: 35,
            fontSize: 14,
            fontWeight: '500',
            fontFamily: 'MontserratAlternates-bold',
            color: '#fff',
          }}>
          {onboard[currentIdx].description}
        </Text>

        <ButtonOnboard
          text={onboard[currentIdx].buttonText}
          setCurrentIdx={setCurrentIdx}
          currentIdx={currentIdx}
          onboard={onboard}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#520000',
    justifyContent: 'flex-end',
  },
  sectionContainer: {
    marginHorizontal: 20,
    backgroundColor: '#670000',
    borderRadius: 50,
    paddingTop: 25,
    paddingBottom: 28,
    paddingLeft: 26,
    paddingRight: 26,
    // position: 'absolute',
    marginBottom: 27,
  },
});

export default Onboard;
