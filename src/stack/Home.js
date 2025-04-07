import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import ButtonLinear from '../components/ButtonLinear';

const Home = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView
        style={{
          marginBottom: 25,
          alignItems: 'center',
        }}>
        <Image
          source={require('../../assets/img/main.png')}
          style={styles.image}
        />
      </SafeAreaView>

      <View style={styles.buttonWrap}>
        <ButtonLinear text={'New game'} navigateTo={'NewGame'} />
        <ButtonLinear text={'Rules'} navigateTo={'Rules'} />
        <ButtonLinear text={'Leaders'} navigateTo={'Leaders'} />
        <ButtonLinear text={'Info'} navigateTo={'Info'} />
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
});

export default Home;
