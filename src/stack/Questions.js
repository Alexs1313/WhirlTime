import {useState} from 'react';
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
import {questions} from '../data/questions';
import {useStore} from '../../store/context';
import {useNavigation} from '@react-navigation/native';

const Questions = () => {
  const [inputValue, setInputValue] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [findAnswer, setFindAnswer] = useState(false);
  const navigation = useNavigation();

  const {category, setCategory} = useStore();
  const [filtered, setFiltered] = useState(
    questions.filter(question => question.category === category),
  );
  console.log('isCorrect', isCorrect);

  const findOutAnswer = () => {
    const isCorrectAnswer = filtered[currentIdx].answer == selectedCat;
    setIsCorrect(isCorrectAnswer);
    setFindAnswer(true);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{alignItems: 'center'}}></SafeAreaView>
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
            <TouchableOpacity
              onPress={() => setSelectedCat(category)}
              activeOpacity={0.7}
              key={idx}
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
          ) : (
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
          ),
        )}

        {selectedCat !== null &&
          (findAnswer ? (
            <View style={{marginTop: 22, marginHorizontal: 20}}>
              <TouchableOpacity
                activeOpacity={0.7}
                disabled={selectedCat === null}
                onPress={() => navigation.navigate('Game')}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#520000',
  },
  linearGradient: {
    width: '100%',
    borderRadius: 24,
    marginBottom: 20,
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

export default Questions;
