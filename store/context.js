import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useContext, useEffect, useState} from 'react';

export const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

export const StoreProvider = ({children}) => {
  const [newPlayers, setNewPlayers] = useState([]);
  const [category, setCategory] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [filteredPlayer, setFilteredPlayer] = useState();
  const [score, setScore] = useState(0);
  const [score1, setScore1] = useState(0);
  const [randomIdx, setRandomIdx] = useState(0);
  const [playersStore, setPlayersStore] = useState(null);

  useEffect(() => {
    getPlayers();
    // savePlayers(playersStore);
  }, [score]);

  // const totalScore = [score, score1];

  // const saveScore = async players => {
  //   try {
  //     await AsyncStorage.setItem('score', JSON.stringify(totalScore));
  //     console.log('saved SCORE');
  //   } catch (error) {
  //     console.log('err to save players', error);
  //   }
  // };

  // const getScore = async () => {
  //   try {
  //     const data = await AsyncStorage.getItem('score');
  //     const players = data != null ? JSON.parse(data) : [];
  //     console.log('score from storage', score);
  //     // setPlayersStore(players);
  //   } catch (error) {
  //     console.log('err to save players', error);
  //   }
  // };

  const savePlayers = async players => {
    try {
      await AsyncStorage.setItem('players', JSON.stringify(players));
      console.log('saved');
    } catch (error) {
      console.log('err to save players', error);
    }
  };

  const getPlayers = async () => {
    try {
      const data = await AsyncStorage.getItem('players');
      const players = data != null ? JSON.parse(data) : [];
      console.log('players from storage', players);
      setPlayersStore(players);
    } catch (error) {
      console.log('err to save players', error);
    }
  };

  const removePlayers = async () => {
    try {
      await AsyncStorage.removeItem('players');

      console.log('players from storage removed', players);
    } catch (error) {
      console.log('err to save players', error);
    }
  };

  const value = {
    newPlayers,
    setNewPlayers,
    category,
    setCategory,
    currentIdx,
    setCurrentIdx,
    filteredPlayer,
    setFilteredPlayer,
    score,
    setScore,
    score1,
    setScore1,
    randomIdx,
    setRandomIdx,
    savePlayers,
    getPlayers,
    playersStore,
    removePlayers,
    setPlayersStore,
  };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
