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
import InicioScreen from '../pages/InicioScreen';
import ReclamosVecino from "./ReclamosVecino";
import ServiciosScreen from '../pages/servicios/ServiciosScreen';
import DenunciasVecino from "./DenunciasVecino";
import LoginScreen from '../pages/login/LoginScreen';
import { ServiciosStack } from '../pages/routes';
import { StyledButton } from '../components/ui';
import { useUser } from '../context/UserContext';
import Detalle from '../pages/servicios/Detalle';

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
  const { user, logout } = useUser();

  const handlePress = (screenName) => {
    if (!Boolean(user) && screenName !== 'Gestion Barrial') {
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
      logout();
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
        <StyledText style={styles.usernameText}>{user?.nombre ? `${user?.nombre} ${user.apellido}` : "Invitado"}</StyledText>
      </View>
      <StyledButton variant={'primary'} fontSize={'subtitle'} style={styles.drawerButton} onPress={() => handlePress('Inicio')}>
        Inicio
      </StyledButton>
      <StyledButton variant={'primary'} fontSize={'subtitle'} style={styles.drawerButton} onPress={() => handlePress('ReclamosVecinos')}>
        Reclamo
      </StyledButton>
      <StyledButton variant={'primary'} fontSize={'subtitle'} style={styles.drawerButton} onPress={() => handlePress('DenunciasVecinos')}>
        Denuncia
      </StyledButton>
      <StyledButton variant={'primary'} fontSize={'subtitle'} style={styles.drawerButton} onPress={() => handlePress('ServiciosScreen')}>
        Servicios
      </StyledButton>
      <View style={styles.logoutContainer}>
        <StyledButton onPress={handleLogout}>
          <StyledText style={styles.logoutText}>Cerrar Sesión</StyledText>
        </StyledButton>
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
          component={InicioScreen}
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
        }} />
        <Drawer.Screen name="DenunciasVecinos" component={DenunciasVecino} options={{
          headerTitle: () => (
            <View style={{ padding: 10, paddingLeft: 83, justifyContent: "center" }}>
              <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Denuncias</Text>
            </View>
          ),
        }} />
        <Drawer.Screen name="ServiciosScreen" component={ServiciosStack} options={{
          headerTitle: () => (
            <View style={{ padding: 10, paddingLeft: 85, justifyContent: "center" }}>
              <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Servicios</Text>
            </View>
          ),
        }} />
        <Drawer.Screen name="SesionCerrada" component={LoginScreen} options={{ drawerItemStyle: { display: 'none' } }} />
        <Drawer.Screen name="Notificacion" component={NotificacionVecino} options={{ headerTitle: 'Notificaciones' }} />
        <Drawer.Screen name="Detalle" component={Detalle} />
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
    width: '70%',
    alignItems: 'center',
    marginTop: 15,
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