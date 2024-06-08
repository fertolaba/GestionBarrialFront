import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { View, Image, TouchableOpacity, AppState } from 'react-native';
import React from 'react';
import StyledText from '../components/ui/StyledText';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../styles/theme';
import Foto from "../assets/foto1.png";
import ReclamosVecino from './ReclamosVecino';
import DenunciasVecino from './DenunciasVecino';
import ServiciosVecino from './ServiciosVecino';
import SesionCerrada from './SesionCerrada';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

function InicioVecino() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <Text>InicioVecino</Text> */}
    </View>
  );
}

function CustomDrawerContent(props) {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      // Borrar los datos de inicio de sesión almacenados en AsyncStorage
      await AsyncStorage.removeItem('password');
      navigation.navigate('SesionCerrada');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ height: 200, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <Image source={Foto} style={{ height: 130, width: 130 }} />
        <StyledText>Bienvenido!</StyledText>
        <StyledText>Invitado</StyledText>
      </View>
      <DrawerItemList {...props} />
      <View style={{ marginTop: 'auto', padding: 20, alignItems: 'center' }}>
        <TouchableOpacity onPress={(handleLogout) }>
          <StyledText style={{ color: 'blue' }}>Cerrar Sesión</StyledText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function DrawerNavigation() {
  return (
    <NavigationContainer independent={true}
      drawerContent={(drawerProps) => (
        <CustomDrawerContent {...drawerProps} />
      )}>
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="InicioVecino" component={InicioVecino} />
        <Drawer.Screen name="Reclamos" component={ReclamosVecino} />
        <Drawer.Screen name="Denuncia" component={DenunciasVecino} />
        <Drawer.Screen name="Servicios" component={ServiciosVecino} />
        <Drawer.Screen 
          name="SesionCerrada" 
          component={SesionCerrada} 
          options={{ 
            headerShown: false,
            drawerItemStyle: { display: 'none' } 
          }} 
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default DrawerNavigation;
