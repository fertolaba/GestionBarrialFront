import { createStackNavigator } from '@react-navigation/stack';

import DenunciasScreen from './denuncias/Denuncias';
import { DenunciaDetalle } from './denuncias/DenunciaDetalle';

import ReclamosScreen from './denuncias/Denuncias';
import GenerarReclamos from './reclamos/GenerarReclamos';

import ServiciosScreen from './servicios/ServiciosScreen';
import ServicioProfesional from './servicios/ServicioProfesional';
import ServicioComercio from './servicios/ServiciosScreen';
import Detalle from './servicios/Detalle';
import ReclamosVecino from '../VecinoUsuario/ReclamosVecino';

export const Stack = createStackNavigator();

export function ReclamosStack() {
    return (
        <Stack.Navigator>
             <Stack.Screen
                name="ReclamosVecino"
                component={ReclamosVecino}
                options={{ headerShown: false }} // Mostrar encabezado personalizado para GenerarReclamos
            />
            <Stack.Screen
                name="GenerarReclamos"
                component={GenerarReclamos}
                options={{ headerTitle: 'Generar Reclamos', headerShown: false }}// Mostrar encabezado personalizado para GenerarReclamos
            />           

        </Stack.Navigator>
    );
}

export function DenunciasStack() {
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

export function ServiciosStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="SeleccionTipo"
                component={ServiciosScreen}
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
                name="DetalleServicio"
                component={Detalle}
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

