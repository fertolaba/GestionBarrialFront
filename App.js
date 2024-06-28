import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { UserProvider } from './context/UserContext';
import { DrawerNavigator } from './pages/drawerNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <UserProvider>
        <DrawerNavigator />
      </UserProvider>
    </NavigationContainer>
  );
}

