import { createStackNavigator } from '@react-navigation/stack';

import GenerarReclamos from './reclamos/generarReclamo/GenerarReclamos';

import SitiosScreen from './sitios/SitiosScreen';
import ServicioProfesional from './sitios/ServicioProfesional';
import ServicioComercio from './sitios/SitiosScreen';
import { DetalleSitio } from './sitios/detalle/DetalleSitio';
import EstadoReclamo from './reclamos/estadoReclamo/EstadoReclamo';
import DenunciasScreen from './denuncias/DenunciasScreen';
import { DenunciaDetalle } from './denuncias/detalle/DenunciaDetalle';
import ReclamosScreen from './reclamos/ReclamosScreen';

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
                name="GenerarReclamos"
                component={GenerarReclamos}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="EstadoReclamo"
                component={EstadoReclamo}
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
        <Stack.Navigator initialRouteName='SeleccionTipo'>
            <Stack.Screen
                name="SeleccionTipo"
                component={SitiosScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CrearServicioProfesional"
                component={ServicioProfesional}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="EditarServicioProfesional"
                component={ServicioProfesional}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Detalle"
                component={DetalleSitio}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="ServicioComercio"
                component={ServicioComercio}
                options={{ headerShown: false }}
            />

        </Stack.Navigator >
    );

}

