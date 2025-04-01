import {useNavigation} from '@react-navigation/native';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ButtonLinear = ({text, navigateTo, selectedCat, newPlayers}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={selectedCat === null}
      onPress={() => navigation.navigate(navigateTo, newPlayers)}
      style={styles.container}>
      <LinearGradient
        colors={['#E7931D', '#F4B821', '#DE7319']}
        style={styles.linearGradient}>
        <Text style={styles.buttonText}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default ButtonLinear;
