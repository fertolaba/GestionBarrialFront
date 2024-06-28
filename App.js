import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { UserProvider, DeviceProvider } from './context';
import { DrawerNavigator } from './pages/drawerNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <DeviceProvider>
        <UserProvider>
          <DrawerNavigator />
        </UserProvider>
      </DeviceProvider>
    </NavigationContainer>
  );
}

