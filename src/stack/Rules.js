import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import GradientText from '../components/TextGradient';

const Rules = () => {
  const info = `Whirl Time - answer or miss is an exciting quiz where wit, speed and a little luck will help you become a champion!
Play with friends, choose topics, answer tricky questions and prove that you are the brains of the company

What's inside:
Categories: Cinema, Sports, Books, Geography, General Knowledge
A cartoon host who will cheer you on!
An arrow that decides who is next
A fun atmosphere, no pressure - only intelligence and fan spirit!`;

  const infoSecond = `The arrow spins again - and a new player answers a new question.
After all the questions of the round - the one who scored the most points wins!
You have 10 seconds to answer.
The round continues until all the questions are finished.

P.S. You can't give hints - I see everything`;

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <GradientText
          colors={['#E7931D', '#F4B821', '#DE7319']}
          style={{
            fontWeight: '900',
            fontFamily: 'MontserratAlternates-bold',
            fontSize: 32,
            marginTop: 10,
          }}>
          RULES
        </GradientText>
      </SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginHorizontal: 15, alignItems: 'center'}}>
          <Image
            source={require('../../assets/img/rules.png')}
            style={{top: 40}}
          />
          <View style={styles.textContainer}>
            <Text style={styles.text}>{info}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{infoSecond}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#520000',
    alignItems: 'center',
  },
  textContainer: {
    backgroundColor: '#670000',
    borderRadius: 22,
    padding: 25,
    marginBottom: 15,
  },
  text: {
    fontSize: 14,
    fontWeight: '900',
    fontFamily: 'MontserratAlternates-bold',
    color: '#fff',
  },
});

export default Rules;
