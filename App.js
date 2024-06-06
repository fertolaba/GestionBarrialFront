import { View, Image, TouchableOpacity } from 'react-native';
import React from 'react'; // Solo una vez aquí
import 'react-native-gesture-handler';
import { DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { NativeScreenNavigationContainer } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import CustomDrawer from './components/CustomDrawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import Foto from "./assets/foto1.png";
import StyledText from './components/ui/StyledText';
import theme from './styles/theme';

import { DenunciasStack, ReclamosStack, ServiciosStack, Stack } from './pages/routes';
import LoginScreen from './pages/login/LoginScreen';
import InicioScreen from './pages/InicioScreen';


const Drawer = createDrawerNavigator();

export function MainStack() {
  return (
    <Stack.Navigator>

      <Stack.Screen name="Home" component={DrawerNavigator} options={{ headerShown: false }} />

      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerTitle: 'Iniciar Sesión' }}
      />
    </Stack.Navigator>
  );
}

function DrawerNavigator(props) {
  return (
    <Drawer.Navigator
      drawerContent={(drawerProps) => (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.white }}>
          <View
            style={{
              height: 200,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Image
              source={Foto}
              style={{
                height: 130,
                width: 130,
              }}
            />
            <StyledText>Bienvenido!</StyledText>
            <StyledText>Invitado</StyledText>
          </View>
          <DrawerItemList {...drawerProps} />
          <View style={{ marginTop: 'auto', padding: 20, alignItems: 'center' }}>
            <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
              <StyledText style={{ color: 'blue' }}>Iniciar Sesión</StyledText>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
    >
      <Drawer.Screen name="Gestion Barrial" component={InicioScreen} />
      <Drawer.Screen name="Reclamos" component={ReclamosStack} />
      <Drawer.Screen name="Servicios" component={ServiciosStack} />
      <Drawer.Screen name="Denuncias" component={DenunciasStack} />

    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}
