import {
  Image,
  SafeAreaView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Info = () => {
  const info = `Whirl Time - answer or miss is an exciting quiz where wit, speed and a little luck will help you become a champion!
Play with friends, choose topics, answer tricky questions and prove that you are the brains of the company

What's inside:
Categories: Cinema, Sports, Books, Geography, General Knowledge
A cartoon host who will cheer you on!
An arrow that decides who is next
A fun atmosphere, no pressure - only intelligence and fan spirit!`;

  const onShare = async () => {
    try {
      await Share.share({
        message: info,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Image
          source={require('../../assets/img/board.png')}
          style={{marginVertical: 25}}
        />
      </SafeAreaView>
      <View style={{marginHorizontal: 15}}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{info}</Text>
          <View style={{marginHorizontal: 80}}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{}}
              onPress={() => console.log('object')}>
              <LinearGradient
                colors={['#E7931D', '#F4B821', '#DE7319']}
                style={styles.linearGradient}>
                <TouchableOpacity onPress={onShare} style={styles.btnContainer}>
                  <Text style={styles.buttonText}>SHARE</Text>
                  <Image source={require('../../assets/img/share.png')} />
                </TouchableOpacity>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
  },
  btnContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 28,
    paddingRight: 28,
    paddingTop: 10,
  },
  linearGradient: {
    height: 57,
    borderRadius: 24,
  },
  text: {
    fontSize: 14,
    fontWeight: '900',
    fontFamily: 'MontserratAlternates-bold',
    color: '#fff',
    marginBottom: 25,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '900',
    fontFamily: 'MontserratAlternates-bold',
    color: '#4A1A13',
    backgroundColor: 'transparent',
  },
});

export default Info;
