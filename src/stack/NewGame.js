import {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput} from 'react-native-gesture-handler';

import LinearGradient from 'react-native-linear-gradient';
import ButtonLinear from '../components/ButtonLinear';
import GradientText from '../components/TextGradient';
import {useStore} from '../../store/context';

const NewGame = () => {
  const [inputValue, setInputValue] = useState('');
  const {newPlayers, setNewPlayers, setCategory, setCurrentIdx} = useStore();
  const [toggleInput, setToggleInput] = useState(true);

  useEffect(() => {
    setNewPlayers([]);
    setCategory(null);
    setCurrentIdx(0);
    AsyncStorage.clear();
  }, []);

  const addPlayer = () => {
    setToggleInput(!toggleInput);
    if (inputValue === '') {
      return;
    }
    const newPlayer = {
      name: inputValue,
      id: Date.now(),
      score: 0,
    };
    setNewPlayers([...newPlayers, newPlayer]);
    setInputValue('');
  };

  const removePlayer = playerId => {
    const filtered = newPlayers.filter(player => player.id !== playerId);
    setNewPlayers(filtered);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{alignItems: 'center'}}>
        <GradientText
          colors={['#E7931D', '#F4B821', '#DE7319']}
          style={styles.gradientText}>
          NEW GAME
        </GradientText>
      </SafeAreaView>
      <View style={{marginHorizontal: 15}}>
        <View onPress={() => navigation.navigate(navigateTo)}>
          <LinearGradient
            colors={['#E7931D', '#F4B821', '#DE7319']}
            style={styles.linearGradient}></LinearGradient>
          <View style={{position: 'absolute', top: 17, left: 24}}>
            <Text style={styles.buttonText}>Hey!</Text>
            <Text style={styles.buttonText}>Add players!</Text>
            <Text style={styles.secondTitleText}>Maximum 6 players</Text>
          </View>
          <Image
            source={require('../../assets/img/newGameMan.png')}
            style={{position: 'absolute', bottom: 63, right: 25}}
          />
        </View>
        {!toggleInput && (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}>
            {newPlayers.map(player => (
              <View key={player.id} style={styles.newPlayerContainer}>
                <Text style={styles.newPlayerContainerText}>{player.name}</Text>
                <TouchableOpacity onPress={() => removePlayer(player.id)}>
                  <Image source={require('../../assets/img/close.png')} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
        {toggleInput && (
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter player name"
              placeholderTextColor={'rgba(255, 255, 255, 0.49)'}
              style={styles.input}
              value={inputValue}
              onChangeText={setInputValue}
              maxLength={8}
            />

            <LinearGradient
              colors={['#E7931D', '#F4B821', '#DE7319']}
              style={styles.addButton}>
              <Image
                source={require('../../assets/img/add.png')}
                style={{
                  backgroundColor: 'transparent',
                }}
              />
            </LinearGradient>
          </View>
        )}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => addPlayer()}
          disabled={newPlayers.length > 5}>
          <LinearGradient
            colors={['#E7931D', '#F4B821', '#DE7319']}
            style={styles.addPlayerBtn}>
            <View style={styles.addPlayerContainer}>
              <Text style={styles.addPlayerText}>Add player</Text>
              <Image source={require('../../assets/img/add.png')} />
            </View>
          </LinearGradient>
        </TouchableOpacity>
        {!toggleInput && (
          <View style={{marginTop: 70}}>
            <ButtonLinear text={'Next'} navigateTo={'SelectCategory'} />
          </View>
        )}
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
  gradientText: {
    fontWeight: '900',
    fontFamily: 'MontserratAlternates-bold',
    fontSize: 32,
    marginTop: 22,
    marginBottom: 72,
  },
  image: {
    width: '100%',
    height: 310,
  },
  secondTitleText: {
    fontSize: 10,
    fontWeight: '500',
    fontFamily: 'MontserratAlternates-bold',
    color: '#1D1D1D',
    marginTop: 5,
  },
  linearGradient: {
    height: 106,
    width: '100%',
    borderRadius: 24,
    marginBottom: 62,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '900',
    fontFamily: 'MontserratAlternates-bold',
    color: '#4A1A13',
    backgroundColor: 'transparent',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 92,
  },
  input: {
    padding: 22,
    backgroundColor: 'rgba(128, 0, 0, 0.45)',
    borderRadius: 15,
    width: '50%',
    color: '#fff',
    fontSize: 15,
    fontWeight: '5s00',
    fontFamily: 'MontserratAlternates-bold',
  },
  addButton: {
    width: 62,
    height: 62,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },
  addPlayerContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
  },
  addPlayerBtn: {
    marginHorizontal: 105,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    height: 62,
    width: 180,
    marginTop: 20,
  },
  addPlayerText: {
    fontSize: 15,
    fontWeight: '900',
    fontFamily: 'MontserratAlternates-bold',
    color: '#4A1A13',
    marginRight: 10,
  },
  newPlayerContainer: {
    height: 60,
    backgroundColor: 'rgba(128, 0, 0, 0.45)',
    width: '48%',
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
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'MontserratAlternates-bold',
    color: '#fff',
  },
});

export default NewGame;
