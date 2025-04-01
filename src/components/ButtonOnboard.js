import {useNavigation} from '@react-navigation/native';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ButtonOnboard = ({
  text,
  navigateTo,
  setCurrentIdx,
  currentIdx,
  onboard,
}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        if (currentIdx === onboard.length - 1) {
          navigation.navigate('Home');
        } else {
          setCurrentIdx(currentIdx + 1);
        }
      }}
      style={styles.container}>
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E17E1A',
    borderRadius: 15,
    marginHorizontal: 28,
    padding: 25,
  },
  linearGradient: {
    height: 95,
    width: '100%',
    borderRadius: 24,
    marginBottom: 24,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'MontserratAlternates-bold',
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'transparent',
  },
});

export default ButtonOnboard;
