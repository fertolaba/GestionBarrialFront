import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaView, View, Image, Text, ToastAndroid } from 'react-native';
import LoginScreen from './pages/login/LoginScreen';
import InicioScreen from './pages/InicioScreen';
import Detalle from './pages/servicios/Detalle';
import Notificacion from './Notificacion';
import SesionCerrada from './pages/logout/SesionCerrada';
import { ServiciosStack, ReclamosStack } from './pages/routes';
import { UserProvider, useUser } from './context/UserContext';
import theme from './styles/theme';
import { StyledButton, StyledText } from './components/ui';
import { isNullOrUndefined } from './utils/misc';
import Foto from "./assets/foto1.png";
import { StyleSheet } from 'react-native';

const Drawer = createDrawerNavigator();

function CustomDrawerContent({ navigation }) {
  const { user, logout } = useUser();

  const handlePress = (screenName) => {
    if (!user && screenName !== 'Gestion Barrial') {
      ToastAndroid.show('Debe iniciar sesión', ToastAndroid.SHORT);
    } else {
      navigation.navigate(screenName);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'SesionCerrada' }],
    });
  };

  const rutasDrawer = [
    { title: 'Inicio', route: 'Inicio' },
    { title: 'Reclamos', route: 'Reclamos' },
    { title: 'Denuncias', route: 'Denuncias' },
    { title: 'Servicios', route: 'Servicios' }
  ];

  const BotonSesion = () => isNullOrUndefined(user)
    ? (
      <StyledButton
        naked
        fontSize={'subheading'}
        color={theme.colors.primary}
        onPress={() => navigation.navigate('Login')}
      >
        Iniciar sesión
      </StyledButton>
    ) : (
      <StyledButton
        naked
        fontSize={'subheading'}
        color={theme.colors.primary}
        onPress={handleLogout}
      >
        Cerrar sesión
      </StyledButton>
    );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.white }}>
      <View style={{ height: 200, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <Image source={Foto} style={{ height: 130, width: 130 }} />
        <StyledText>Bienvenido!</StyledText>
        <StyledText>{user?.nombre ?? "Invitado"}</StyledText>
      </View>
      <View>
        {rutasDrawer.map((ruta, index) => (
          <StyledButton
            key={index}
            color='white'
            style={styles.drawerButton}
            onPress={() => handlePress(ruta.route)}
            title={ruta.title}
          />
        ))}
      </View>
      <View style={{ marginTop: 'auto', padding: 20, alignItems: 'center' }}>
        <BotonSesion />
      </View>
    </SafeAreaView>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Inicio" component={InicioScreen} options={{
        headerTitle: () => (
          <View style={{ padding: 10, paddingLeft: 60, justifyContent: "center" }}>
            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Gestión Barrial</Text>
          </View>
        ),
      }} />
      <Drawer.Screen name="Servicios" component={ServiciosStack} options={{
        headerTitle: () => (
          <View style={{ padding: 10, paddingLeft: 85, justifyContent: "center" }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Servicios</Text>
          </View>
        ),
      }} />
      <Drawer.Screen name="Reclamos" component={ReclamosStack} />
      <Drawer.Screen name="Detalle" component={Detalle} />
      <Drawer.Screen name="Notificacion" component={Notificacion} />
      <Drawer.Screen name="SesionCerrada" component={SesionCerrada} options={{ headerTitle: 'Sesión Cerrada' }} />
      <Drawer.Screen name="Login" component={LoginScreen} options={{ headerTitle: 'Iniciar Sesión' }} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <UserProvider>
        <DrawerNavigator />
      </UserProvider>
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
    fontWeight: 'bold', // Letra en negrita
  },
  usernameText: {
    fontSize: 14,
    color: 'gray',
    fontWeight: 'bold', // Letra en negrita
  },
  drawerButton: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: 8,
    width: '80%', // Ajusta el ancho según tus necesidades
    alignItems: 'center',
    marginTop: 15,
    alignSelf: 'center', // Añade esta línea para centrar el botón
  },
  drawerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold', // Letra en negrita
  },
  logoutContainer: {
    marginTop: 'auto',
    marginBottom: 15,
    alignItems: 'center', // Añade esta línea para centrar el texto
  },
  logoutText: {
    color: 'blue',
    fontSize: 14,
    fontWeight: 'bold', // Letra en negrita
  },
});


