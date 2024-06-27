import { View, Image, TouchableOpacity, Alert, StyleSheet, Text, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Foto from "./assets/foto1.png";
import { StyledButton, StyledText } from './components/ui';
import theme from './styles/theme';
import DrawerNavigation from './VecinoUsuario/InicioVecino';
import Detalle from './pages/servicios/Detalle';
import { ServiciosStack, Stack, ReclamosStack } from './pages/routes';
import LoginScreen from './pages/login/LoginScreen';
import InicioVecino from './VecinoUsuario/InicioVecino';
import InicioInspector from './InspectorUsuario/InicioInspector';
import InicioScreen from './pages/InicioScreen';
import { UserProvider, useUser } from './context/UserContext';
import SesionCerrada from './VecinoUsuario/SesionCerrada';
import Notificacion from './Notificacion';
import { isNullOrUndefined } from './utils/misc';


const Drawer = createDrawerNavigator();

function CustomDrawerContent({ navigation }) {
  const { user } = useUser();

  const handlePress = (screenName) => {
    if (!user && screenName !== 'Gestion Barrial') {

      ToastAndroid.show('Debe iniciar sesión', ToastAndroid.SHORT);

      // Alert.alert(
      //   'Debe iniciar sesion',
      //   null,
      //   [{ text: 'OK' }],
      //   { cancelable: false }
      // );
    } else {
      navigation.navigate(screenName);
    }
  };

  const rutasDrawer = [
    { title: 'Inicio', /* Aca podrian armarse otros props para usarse en todos los botones del drawer */ },
    { title: 'Reclamos', /* Aca podrian armarse otros props para usarse en todos los botones del drawer */ },
    { title: 'Denuncias', /* Aca podrian armarse otros props para usarse en todos los botones del drawer */ },
    { title: 'Servicios', /* Aca podrian armarse otros props para usarse en todos los botones del drawer */ }
  ]

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
        onPress={() => navigation.navigate('SesionCerrada')}
      >
        Cerrar sesión
      </StyledButton>
    )


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.white }}>
      <View style={{ height: 200, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <Image source={Foto} style={{ height: 130, width: 130 }} />
        <StyledText>Bienvenido!</StyledText>
        <StyledText>{user?.nombre ?? "Invitado"}</StyledText>
      </View>

      <View>
        {
          rutasDrawer.map((ruta, index) => (
            <StyledButton
              key={index}
              color='white'
              style={styles.drawerButton}
              onPress={() => handlePress(ruta.title)}
              title={ruta.title}
            />
          ))
        }
      </View>

      <View style={{ marginTop: 'auto', padding: 20, alignItems: 'center' }}>
        {<BotonSesion />}
      </View>
    </SafeAreaView>
  );
}

function DrawerNavigator({ navigation }) {
  return (
    <Drawer.Navigator drawerContent={(drawerProps) => <CustomDrawerContent {...drawerProps} navigation={navigation} />}>
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
      <Drawer.Screen
        name="Servicios"
        component={ServiciosStack}
        options={{
          headerTitle: () => (
            <View style={{ padding: 10, paddingLeft: 85, justifyContent: "center" }}>
              <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Servicios</Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Reclamos"
        component={ReclamosStack}
        options={{
          headerTitle: () => (
            <View style={{ padding: 10, paddingLeft: 85, justifyContent: "center" }}>
              <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Servicios</Text>
            </View>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={DrawerNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Detalle" component={Detalle} />
      <Stack.Screen name="Notificacion" component={Notificacion} />
      <Stack.Screen name="SesionCerrada" component={SesionCerrada} options={{ headerTitle: 'Sesión Cerrada' }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerTitle: 'Iniciar Sesión' }} />
      <Stack.Screen name="InicioVecino" component={InicioVecino} options={{ headerShown: false }} />
      <Stack.Screen name="InicioInspector" component={InicioInspector} options={{ headerShown: false }} />
      <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} options={{ headerShown: false }} />

      {/* Este reclamos funciona con la pantalla que vale segun el tipo de usuario */}
      <Stack.Screen name="Reclamos" component={ReclamosStack} options={{ headerTitle: "Reclamos" }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <UserProvider>
        <MainStack />
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


