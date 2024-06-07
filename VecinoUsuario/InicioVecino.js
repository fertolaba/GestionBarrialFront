import { createDrawerNavigator , DrawerItemList} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { View, Image } from 'react-native';
import React from 'react';
import StyledText from '../components/ui/StyledText';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../styles/theme';
import Foto from "../assets/foto1.png";
import ReclamosVecino from './ReclamosVecino';
import DenunciasVecino from './DenunciasVecino';
import ServiciosVecino from './ServiciosVecino';


const Drawer = createDrawerNavigator();

function InicioVecino() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <Text>InicioVecino</Text> */}
    </View>
  );
}

function CustomDrawerContent(props) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}> {/* Reemplaza 'white' con theme.colors.white si está definido */}
        <View style={{ height: 200, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <Image source={Foto} style={{ height: 130, width: 130 }} />
          <StyledText>Bienvenido!</StyledText>
          <StyledText>Invitado</StyledText>
        </View>
        <DrawerItemList {...props} />
      </SafeAreaView>
    );
  }


function DrawerNavigation() {
  return (
    <NavigationContainer independent={true}
    drawerContent={(drawerProps) => (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.white }}>
          <View style={{ height: 200, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            
            <StyledText>Bienvenido!</StyledText>
            <StyledText>Invitado</StyledText>
          </View>
          <DrawerItemList {...drawerProps} />
        </SafeAreaView>
      )}>
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Inicio" component={InicioVecino} />
        <Drawer.Screen name="Reclamos" component={ReclamosVecino} />
        <Drawer.Screen name="Denuncia" component={DenunciasVecino} />
        <Drawer.Screen name="Servicios" component={ServiciosVecino} />
        {/* Agrega más pantallas aquí si lo necesitas */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default DrawerNavigation;
