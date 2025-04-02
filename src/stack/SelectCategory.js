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

const SelectCategory = ({route}) => {
  const [inputValue, setInputValue] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const players = route.params;
  console.log('route', players);

  const categories = [
    {
      category: 'Movie',
    },
    {
      category: 'Sport',
    },
    {
      category: 'Books',
    },
    {
      category: 'Geography',
    },
    {
      category: 'General knowledge',
    },
  ];

  const filter = () => {
    if (selectedCat !== '') {
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{alignItems: 'center'}}>
        <GradientText
          colors={['#E7931D', '#F4B821', '#DE7319']}
          style={{
            fontWeight: '900',
            fontFamily: 'MontserratAlternates-bold',
            fontSize: 32,
            marginTop: 22,
            marginBottom: 72,
          }}>
          NEW GAME
        </GradientText>
      </SafeAreaView>
      <View style={{marginHorizontal: 15}}>
        <View onPress={() => navigation.navigate(navigateTo)}>
          <LinearGradient
            colors={['#E7931D', '#F4B821', '#DE7319']}
            style={styles.linearGradient}></LinearGradient>
          <View style={{position: 'absolute', top: 17, left: 24}}>
            <Text style={styles.buttonText}>Nice!</Text>
            <Text style={styles.buttonText}>Select a category</Text>
          </View>
          <Image
            source={require('../../assets/img/categoryMan2.png')}
            style={{position: 'absolute', bottom: 20, right: 0}}
          />
        </View>
        {categories.map((category, idx) => (
          <TouchableOpacity
            onPress={() => setSelectedCat(category.category)}
            activeOpacity={0.7}
            key={idx}
            style={
              category.category === selectedCat || selectedCat === null
                ? styles.newPlayerContainer
                : styles.inactivePlayerContainer
            }>
            <Text
              style={
                category.category === selectedCat || selectedCat === null
                  ? styles.newPlayerContainerText
                  : styles.inactiveText
              }>
              {category.category}
            </Text>
            {category.category === selectedCat && (
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
          </TouchableOpacity>
        ))}
        <View style={{marginTop: 22}}>
          <ButtonLinear
            text={'Start Play'}
            navigateTo={'Game'}
            selectedCat={selectedCat}
            newPlayers={players}
          />
        </View>
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
    opacity: 0.7,
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

export default SelectCategory;
