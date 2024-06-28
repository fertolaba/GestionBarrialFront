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
      setUser(_prev => user ?? null);
      await AsyncStorage.setItem('documento', documento);
      await AsyncStorage.setItem('password', password);
    }

    console.log("logged as:", user)
    return user;
  }

  const logout = async () => {
    await AsyncStorage.removeItem('documento');
    await AsyncStorage.removeItem('password');
    setUser(null);
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