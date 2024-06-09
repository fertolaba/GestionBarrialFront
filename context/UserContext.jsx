import React, { createContext, useContext, useState } from 'react';
import usuariosServices from '../services/usuarios.services';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null)

  const login = async ({ identificador, password }) => {
    const user = await usuariosServices.login({ identificador, password });
    Boolean(user) && setUsuario(user);

    return user;
  }

  const logout = () => {
    setUsuario(null);
  }

  return (
    <UserContext.Provider value={{ usuario, login, logout }}>
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