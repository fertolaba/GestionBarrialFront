import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react'; // Solo una vez aquí
import 'react-native-gesture-handler';
import { DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { NativeScreenNavigationContainer } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import Inicio from './pages/Inicio';
import Denuncias from './pages/Denuncias';
import Servicios from './pages/Servicios';
import CustomDrawer from './components/CustomDrawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import Foto from "./assets/foto1.png";
import Reclamos from './pages/Reclamos';
import GenerarReclamos from './pages/screens/GenerarReclamos';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function ReclamosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Reclamos"
        component={Reclamos}
        options={{ headerShown: false }} // Ocultar el encabezado del Stack.Navigator
      />
      <Stack.Screen
        name="GenerarReclamos"
        component={GenerarReclamos}
        options={{ headerTitle: 'Generar Reclamos', headerShown: false }} // Mostrar encabezado personalizado para GenerarReclamos
      />
    </Stack.Navigator>
  );
}

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerTitle: 'Iniciar Sesión' }}
      />
    </Stack.Navigator>
  );
}

function DrawerNavigator(props) {
  return (
    <Drawer.Navigator
      drawerContent={(drawerProps) => (
        <SafeAreaView style={{ flex: 1 }}>
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
            <Text>Bienvenido!</Text>
            <Text>Invitado</Text>
          </View>
          <DrawerItemList {...drawerProps} />
          <View style={{ marginTop: 'auto', padding: 20, alignItems: 'center' }}>
            <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
              <Text style={{ color: 'blue' }}>Iniciar Sesión</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
    >
      <Drawer.Screen name="Gestion Barrial" component={Inicio} />
      <Drawer.Screen name="Reclamos" component={ReclamosStack} />
      <Drawer.Screen name="Servicios" component={Servicios} />
      <Drawer.Screen name="Denuncias" component={Denuncias} />
      
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
