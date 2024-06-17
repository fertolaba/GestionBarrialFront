import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { View, Image, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../styles/theme';
import Foto from "../assets/foto1.png";
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotificacionVecino from '../Notificacion';
import Icon from 'react-native-vector-icons/FontAwesome';
import InicioScreen from '../pages/InicioScreen';
import DenunciasVecino from "./DenunciasVecino";
import LoginScreen from '../pages/login/LoginScreen';
import { ReclamosStack, ServiciosStack } from '../pages/routes';
import { StyledButton, StyledText } from '../components/ui';
import { useUser } from '../context/UserContext';
import Detalle from '../pages/servicios/Detalle';
import { isNullOrUndefined } from '../utils/misc';
import ReclamosVecino from './ReclamosVecino';

const Drawer = createDrawerNavigator();

function NotificationButton(props) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={{ alignSelf: "flex-end" }} onPress={() => navigation.navigate('Notificacion')} {...props}>
      <Icon name="bell" size={30} color="black" />
    </TouchableOpacity>
  );
}

function CustomDrawerContent() {
  const navigation = useNavigation();
  const { user, logout } = useUser();

  const handlePress = (screenName) => {
    if (isNullOrUndefined(user) && screenName !== 'Gestion Barrial') {
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

  const secciones = [
    { nombre: 'Inicio', screenName: 'Inicio' },
    { nombre: 'Reclamo', screenName: 'ReclamosVecinos' },
    { nombre: 'Denuncia', screenName: 'DenunciasVecinos' },
    { nombre: 'Servicios', screenName: 'ServiciosScreen' },
  ]

  return (
    <SafeAreaView style={styles.drawerContainer}>
      <View style={styles.headerContainer}>
        <Image source={Foto} style={styles.profileImage} />
        <StyledText style={styles.welcomeText}>¡Bienvenido!</StyledText>
        <StyledText style={styles.usernameText}>{user?.nombre ? `${user?.nombre} ${user.apellido}` : "Invitado"}</StyledText>
      </View>

      {
        secciones.map((seccion) => (
          <StyledButton
            key={`drawer:${seccion.nombre}`}
            variant={'primary'}
            fontSize={'subtitle'}
            style={styles.drawerButton}
            onPress={() => handlePress(seccion.screenName)}
          >
            {seccion.nombre}
          </StyledButton>
        ))
      }

      <View style={styles.logoutContainer}>
        <StyledButton
          naked
          fontSize={'title'}
          onPress={handleLogout}
          color={theme.colors.primary}
        >
          Cerrar Sesión
        </StyledButton>
      </View>
    </SafeAreaView>
  );
}

function DrawerNavigation() {
  const { user } = useUser()

  const drawerScreens = [
    { name: "Inicio", component: InicioScreen, text: "Inicio" },
    { name: "ReclamosVecinos", component: ReclamosStack, text: "Reclamo" },
    { name: "DenunciasVecinos", component: DenunciasVecino, text: "Denuncia" },
    { name: "ServiciosScreen", component: ServiciosStack, text: "Servicios" },
    { name: "Detalle", component: Detalle, text: "Detalle" },
    { name: "SesionCerrada", component: LoginScreen, text: "Iniciar Sesión", options: { drawerItemStyle: { display: 'none' } } },
    { name: "Notificacion", component: NotificacionVecino, text: "Notificaciones" }
    
  ]

  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator
        drawerContent={CustomDrawerContent}
        screenOptions={() => ({
          headerRight: () => isNullOrUndefined(user) && <NotificationButton />,
        })}
      >
        {
          drawerScreens.map(({ name, component, text, options }) => (
            <Drawer.Screen key={`drawer:${name}`} name={name} component={component} options={{
              ...options,
              headerTitle: () => (
                <StyledText
                  fontSize={'screenTitle'}
                  center
                  bold
                >
                  {text}
                </StyledText>
              ),
            }} />
          ))
        }
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
    aspectRatio: 1,
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