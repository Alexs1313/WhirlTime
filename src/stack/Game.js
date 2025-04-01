import {useEffect, useState} from 'react';
import {
  Animated,
  Easing,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Game = ({route}) => {
  const [inputValue, setInputValue] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const players = route.params;
  console.log('gamescreen', players);

  const spinValue = new Animated.Value(0);
  const spin = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => spin());
  };

  // useEffect(() => {
  //   spin();
  // }, []);

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      {/* <SafeAreaView>
        <Text style={{marginBottom: 62}}>
          Attention! We are choosing a player!
        </Text>
      </SafeAreaView>
      <View style={{marginHorizontal: 15}}>
        
        <View style={{marginTop: 22}}>
          <ButtonLinear text={'Start Play'} />
        </View>
        {players.map((player, idx) => (
          <View key={player.id} style={styles.newPlayerContainer}>
            <Text style={styles.newPlayerContainerText}>{player.name}</Text>
            <TouchableOpacity
              onPress={() => removePlayer(player.id)}></TouchableOpacity>
          </View>
        ))}
      </View> */}
      <Animated.View style={{transform: [{rotate}]}}>
        <Image source={require('../../assets/img/mainLoader.png')} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#520000',
    justifyContent: 'center',
    alignItems: 'center',
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
    width: '30%',
    backgroundColor: 'rgba(128, 0, 0, 0.45)',
    borderRadius: 15,
    alignItems: 'center',
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
  inactiveText: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'MontserratAlternates-bold',
    color: 'rgba(255, 255, 255, 1)',
    opacity: 0.7,
  },
});

export default Game;
