import React from "react";
import { Image, SafeAreaView, StyleSheet, ToastAndroid, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useUser } from "../context/UserContext";
import { StyledButton, StyledText } from "../components/ui";
import { NotificationButton } from "../components/NotificationButton";
import { CambiarContraScreen } from "./registrarse/cambiarContra"
import { InicioScreen } from "./InicioScreen";
import { LoginScreen, LogoutScreen } from "./auth";
import { ReclamosStack, SitioStack, DenunciasStack } from "./routes";
import { NotificationsScreen } from './notifications/NotificationsScreen';
import { RegistrarseScreen } from "./registrarse/registrarUsuario"

import Foto from "../assets/foto1.png";

import theme from "../styles/theme";
import { exists, isNullish } from "../utils/misc";
import { ChangePasswordScreen } from "./auth/ChangePassword";

const Drawer = createDrawerNavigator();

function CustomDrawerContent({ navigation }) {
    const { user, logout } = useUser();

    const handlePress = (path) => {
        if (isNullish(user)) {
            ToastAndroid.show('Debe iniciar sesión', ToastAndroid.SHORT);
        } else {
            if (path === 'Inicio') return navigation.navigate(path);

            navigation.navigate(path, { screen: 'Inicio' });
        }
    };

    const handleLogout = async () => {
        await logout();
        navigation.reset({
            index: 0,
            routes: [{ name: 'Logout' }],
        });
    };

    const rutasDrawer = [
        { title: 'Inicio', path: 'Inicio' },
        { title: 'Reclamos', path: 'Reclamos' },
        { title: 'Denuncias', path: 'Denuncias' },
        { title: 'Sitios', path: 'Sitios' },
    ];

    const BotonSesion = () => isNullish(user) ? (
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
            onPress={handleLogout}
        >
            Cerrar sesión
        </StyledButton>
    );

    const BotonRegistrarse = () => isNullish(user) && (
        <StyledButton
            naked
            fontSize={'subheading'}
            color={theme.colors.primary}
            onPress={() => navigation.navigate('Registrarse')}
        >
            Registrarse
        </StyledButton>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.white }}>
            <View style={{ height: 200, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Image source={Foto} style={{ height: 130, width: 130 }} />
                <StyledText center style={styles.infoUsuario}>Bienvenido {user?.nombre.trim().substring(0, 15) ?? "Invitado"}!</StyledText>
                <StyledText center bold style={styles.infoUsuario}>{user?.tipoUsuario || ""}</StyledText>
            </View>
            <View>
                {rutasDrawer.map((ruta, index) => {
                    const isDenunciasOrSitios = ["Denuncias", "Sitios"].includes(ruta.title);
                    const showButton = !isDenunciasOrSitios || (isNullish(user) || user?.tipoUsuario?.toLowerCase() === 'vecino');

                    return showButton && (
                        <StyledButton
                            key={index}
                            color='white'
                            style={styles.drawerButton}
                            onPress={() => handlePress(ruta.path)}
                            title={ruta.title}
                        />
                    );
                })}
            </View>
            <View style={{ marginTop: 'auto', padding: 20, alignItems: 'center' }}>
                <BotonSesion />
                <BotonRegistrarse />
            </View>
        </SafeAreaView>
    );
}

export function DrawerNavigator() {
    const { user } = useUser();

    const drawerScreens = [
        { name: 'Inicio', component: InicioScreen, header: "Gestion Barrial" },
        { name: 'Sitios', component: SitioStack, header: "Sitios" },
        { name: 'Reclamos', component: ReclamosStack, header: "Reclamos" },
        { name: 'Denuncias', component: DenunciasStack, header: "Denuncias" },
        { name: 'Notificacion', component: NotificationsScreen, header: "Notificaciones" },
        { name: 'Login', component: LoginScreen, header: 'Iniciar Sesión' },
        { name: 'Logout', component: LogoutScreen, header: 'Sesión Cerrada' },
        { name: 'Recuperar', component: CambiarContraScreen, header: 'Recuperar' },
        { name: 'Registrarse', component: RegistrarseScreen, header: 'Registrarse' },
        { name: 'ChangePassword', component: ChangePasswordScreen, header: 'Cambiar Contraseña' },
    ]

    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={() => ({
                headerRight: () => exists(user) && <NotificationButton />
            })}
        >
            {
                drawerScreens.map(({ header, ...screenDrawerProps }) => (
                    <Drawer.Screen
                        key={`drawer-screen:${screenDrawerProps.name}`}
                        {...screenDrawerProps}
                        options={{
                            headerTitle: () => (
                                <StyledText bold fontSize={'heading'}>
                                    {header}
                                </StyledText>
                            )
                        }}
                    />
                ))
            }
        </Drawer.Navigator>
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
    infoUsuario: {
        textTransform: 'capitalize',
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
