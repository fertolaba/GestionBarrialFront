import React, { createContext, useContext, useState } from 'react';
import usuariosServices from '../services/usuarios.services';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const login = async ({ identificador, password }) => {
    const user = await usuariosServices.login({ identificador, password });
    Boolean(user) && setUser(user);

    return user;
  }

  const logout = () => {
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