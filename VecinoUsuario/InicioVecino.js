import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { View, Image, TouchableOpacity, Alert, StyleSheet, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import StyledText from '../components/ui/StyledText';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../styles/theme';
import Foto from "../assets/foto1.png";
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotificacionVecino from '../Notificacion';
import Icon from 'react-native-vector-icons/FontAwesome';
import SesionCerrada from "./SesionCerrada";

import ReclamosVecino from "./ReclamosVecino";
import ServiciosScreen from '../pages/servicios/ServiciosScreen';
import DenunciasVecino from "./DenunciasVecino";
import LoginScreen from '../pages/login/LoginScreen';

const Drawer = createDrawerNavigator();

function NotificationButton({ navigation }) {
  return (
    <TouchableOpacity style={{ marginRight: 15 }} onPress={() => navigation.navigate('Notificacion')}>
      <Icon name="bell" size={30} color="black" />
    </TouchableOpacity>
  );
}

function CustomDrawerContent() {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const password = await AsyncStorage.getItem('password');
        if (password) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, []); 

  const handlePress = (screenName) => {
    if (!isLoggedIn && screenName !== 'Gestion Barrial') {
      Alert.alert(
        'Debe iniciar sesión',
        null,
        [{ text: 'OK' }],
        { cancelable: false }
      );
    } else {
      navigation.navigate(screenName);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('password');
      setIsLoggedIn(false);
      navigation.navigate('SesionCerrada');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <SafeAreaView style={styles.drawerContainer}>
      <View style={styles.headerContainer}>
        <Image source={Foto} style={styles.profileImage} />
        <StyledText style={styles.welcomeText}>¡Bienvenido!</StyledText>
        <StyledText style={styles.usernameText}>Nombre de Usuario</StyledText>
      </View>
      <TouchableOpacity style={styles.drawerButton} onPress={() => handlePress('Inicio')}>
        <StyledText style={styles.drawerButtonText}>Inicio</StyledText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerButton} onPress={() => handlePress('ReclamosVecinos')}>
        <StyledText style={styles.drawerButtonText}>Reclamo</StyledText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerButton} onPress={() => handlePress('DenunciasVecinos')}>
        <StyledText style={styles.drawerButtonText}>Denuncia</StyledText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerButton} onPress={() => handlePress('ServiciosScreen')}>
        <StyledText style={styles.drawerButtonText}>Servicios</StyledText>
      </TouchableOpacity>
      <View style={styles.logoutContainer}>
        <TouchableOpacity onPress={handleLogout}>
          <StyledText style={styles.logoutText}>Cerrar Sesión</StyledText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function DrawerNavigation() {
  const navigation = useNavigation();

  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator
        drawerContent={CustomDrawerContent}
        screenOptions={({ route }) => ({
          headerRight: route.name !== "SesionCerrada" ? () => <NotificationButton navigation={navigation} /> : null,
        })}
      >
        <Drawer.Screen
          name="Inicio"
          component={() => null}
          options={{
            headerTitle: () => (
              <View style={{ padding: 10, paddingLeft: 60, justifyContent: "center" }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Gestión Barrial</Text>
              </View>
            ),
          }}
        />
        <Drawer.Screen name="ReclamosVecinos" component={ReclamosVecino} options={{
            headerTitle: () => (
              <View style={{ padding: 10, paddingLeft: 83, justifyContent: "center" }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Reclamos</Text>
              </View>
            ),
          }}/>
        <Drawer.Screen name="DenunciasVecinos" component={DenunciasVecino} options={{
            headerTitle: () => (
              <View style={{ padding: 10, paddingLeft: 83, justifyContent: "center" }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Denuncias</Text>
              </View>
            ),
          }} />
        <Drawer.Screen name="ServiciosScreen" component={ServiciosScreen} options={{
            headerTitle: () => (
              <View style={{ padding: 10, paddingLeft: 85, justifyContent: "center" }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Servicios</Text>
              </View>
            ),
          }}/>
        <Drawer.Screen name="SesionCerrada" component={LoginScreen} options={{ drawerItemStyle: { display: 'none' } }} />
        <Drawer.Screen name="Notificacion" component={NotificacionVecino} options={{ headerTitle: 'Notificaciones' }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 30,
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  welcomeText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: 'bold',
  },
  usernameText: {
    fontSize: 14,
    color: 'gray',
  },
  drawerButton: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: 8,
    width: '70%',
    alignItems: 'center',
    marginTop: 15,
  },
  drawerButtonText: {
    color: 'white',
    fontSize: 14,
  },
  logoutContainer: {
    marginTop: 'auto',
    marginBottom: 15,
  },
  logoutText: {
    color: 'blue',
    fontSize: 14,
  },
});

export default DrawerNavigation;