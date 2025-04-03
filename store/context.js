import {createContext, useContext, useState} from 'react';

export const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

export const StoreProvider = ({children}) => {
  const [newPlayers, setNewPlayers] = useState([]);
  const [category, setCategory] = useState(null);

  const value = {
    newPlayers,
    setNewPlayers,
    category,
    setCategory,
  };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
