import { createStackNavigator } from '@react-navigation/stack';


import SitiosScreen from './sitios/SitiosScreen';
import { EdicionSitio } from './sitios/edicion/EdicionSitio';
import { DetalleSitio } from './sitios/detalle/DetalleSitio';

import DenunciasScreen from './denuncias/DenunciasScreen';
import { DenunciaDetalle } from './denuncias/detalle/DenunciaDetalle';

import ReclamosScreen from './reclamos/ReclamosScreen';
import GenerarReclamos from './reclamos/generarReclamo/GenerarReclamos';
import ListadoReclamos from './reclamos/listadoReclamos/ListadoReclamos';
import DetalleReclamo from './reclamos/detalleReclamo/DetalleReclamo';

export const Stack = createStackNavigator();

export const ReclamosStack = () => {
    return (
        <Stack.Navigator initialRouteName='Inicio'>
            <Stack.Screen
                name="Inicio"
                component={ReclamosScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ListadoReclamos"
                component={ListadoReclamos}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="GenerarReclamos"
                component={GenerarReclamos}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="DetalleReclamo"
                component={DetalleReclamo}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export const DenunciasStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Listado"
                component={DenunciasScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Detalle"
                component={DenunciaDetalle}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export const SitioStack = () => {
    return (
        <Stack.Navigator initialRouteName='Inicio'>
            <Stack.Screen
                name="Inicio"
                component={SitiosScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Edicion"
                component={EdicionSitio}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Detalle"
                component={DetalleSitio}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="ServicioComercio"
                component={SitiosScreen}
                options={{ headerShown: false }}
            />

        </Stack.Navigator >
    );

}

