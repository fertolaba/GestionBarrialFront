import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { UserProvider, DeviceProvider, ImageBagProvider } from './context';
import { DrawerNavigator } from './pages/drawerNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <DeviceProvider>
        <ImageBagProvider>
          <UserProvider>
            <DrawerNavigator />
          </UserProvider>
        </ImageBagProvider>
      </DeviceProvider>
    </NavigationContainer>
  );
}

