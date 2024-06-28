import React, { createContext, useContext, useState } from 'react';
import usuariosServices from '../services/usuarios.services';
import { exists } from '../utils/misc';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const login = async ({ documento, password }) => {
    const user = await usuariosServices.login({ documento, password });
    if (exists(user)) {
      Promise.all([AsyncStorage.setItem('documento', documento), await AsyncStorage.setItem('password', password)])
        .then(() => console.log('AsyncStorage set'))
        .catch((err) => console.error('Error setting AsyncStorage:', err))
        .finally(() => setUser(_prev => user))
    }

    console.log("logged in as:", user)
    return user;
  }

  const logout = async () => {
    Promise.all([AsyncStorage.removeItem('documento'), await AsyncStorage.removeItem('password')])
      .then(() => console.log('AsyncStorage cleared'))
      .catch((err) => console.error('Error clearing AsyncStorage:', err))
      .finally(() => setUser(null))
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export default UserContext;