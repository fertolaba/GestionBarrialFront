import { View, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react'; // Solo una vez aquí
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Foto from "./assets/foto1.png";
import StyledText from './components/ui/StyledText';
import theme from './styles/theme';
import DrawerNavigation from './VecinoUsuario/InicioVecino';
import Detalle from './Detalle';
import { ServiciosStack, Stack } from './pages/routes';
import LoginScreen from './pages/login/LoginScreen';
import InicioVecino from './VecinoUsuario/InicioVecino';
import InicioInspector from './InspectorUsuario/InicioInspector';
import InicioScreen from './pages/InicioScreen';
import { UserProvider } from './context/UserContext';

const Drawer = createDrawerNavigator();

function CustomDrawerContent({ navigation }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // FORZANDO LOGEO PARA PRUEBAS DE PANTALLAS INDIVIDUALES

  const handlePress = (screenName) => {
    if (!isLoggedIn && screenName !== 'Gestion Barrial') {
      Alert.alert(
        'Debe iniciar sesion',
        null,
        [{ text: 'OK' }],
        { cancelable: false }
      );
    } else {
      navigation.navigate(screenName);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.white }}>
      <View style={{ height: 200, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <Image source={Foto} style={{ height: 130, width: 130 }} />
        <StyledText>Bienvenido!</StyledText>
        <StyledText>Invitado</StyledText>
      </View>
      <View>
        <TouchableOpacity style={{ padding: 20 }} onPress={() => handlePress('Inicio')}>
          <StyledText>Inicio</StyledText>
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 20 }} onPress={() => handlePress('Reclamos')}>
          <StyledText>Reclamos</StyledText>
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 20 }} onPress={() => handlePress('Servicios')}>
          <StyledText>Servicios</StyledText>
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 20 }} onPress={() => handlePress('Denuncias')}>
          <StyledText>Denuncias</StyledText>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 'auto', padding: 20, alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <StyledText style={{ color: 'blue' }}>Iniciar Sesión</StyledText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={DrawerNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Detalle" component={Detalle} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerTitle: 'Iniciar Sesión' }} />
      <Stack.Screen name="InicioVecino" component={InicioVecino} options={{ headerShown: false }} />
      <Stack.Screen name="InicioInspector" component={InicioInspector} options={{ headerShown: false }} />
      <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function DrawerNavigator({ navigation }) {
  return (
    <Drawer.Navigator drawerContent={(drawerProps) => <CustomDrawerContent {...drawerProps} navigation={navigation} />}>
      <Drawer.Screen name="Inicio" component={InicioScreen} />
      <Drawer.Screen name="Reclamos" component={() => null} />
      <Drawer.Screen name="Servicios" component={ServiciosStack} />
      <Drawer.Screen name="Denuncias" component={() => null} />
    </Drawer.Navigator>
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
