import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from "react-native"

import * as Location from 'expo-location';

const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const coords = location?.coords || null;

  async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert('No se concedieron permisos de localización');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    return location
  }

  async function updateLocation() {
    const location = await getLocation()
    setLocation(location)
  }

  useEffect(() => {
    updateLocation() // localización inicial
  }, []);

  return (
    <DeviceContext.Provider value={{ location, coords, updateLocation }}>
      {children}
    </DeviceContext.Provider>
  )
}

export const useDevice = () => {
  const context = useContext(DeviceContext);
  if (context === undefined) {
    throw new Error('useDevice must be used within a DeviceProvider');
  }
  return context;
}

export default DeviceContext;