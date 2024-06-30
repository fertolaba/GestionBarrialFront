import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from "react-native"

import * as Location from 'expo-location';
import * as Network from 'expo-network';

const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
  const [networkState, setNetworkState] = useState(null);
  const isUsingWifi = networkState?.type === Network.NetworkStateType.WIFI ?? false;
  const [location, setLocation] = useState(null);
  const coords = location?.coords || null;

  async function getNetworkState() {
    const networkState = await Network.getNetworkStateAsync();
    return networkState
  }

  async function updateNetworkState() {
    const networkState = await getNetworkState()
    setNetworkState(networkState)
  }

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
    updateNetworkState() // estado de red inicial
  }, []);

  return (
    <DeviceContext.Provider value={{
      location, coords, getLocation, updateLocation,
      networkState, isUsingWifi, getNetworkState, updateNetworkState
    }}>
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