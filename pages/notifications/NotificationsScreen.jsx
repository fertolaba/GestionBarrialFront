import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext'
import notificationsServices from '../../services/notifications.services';
import { isNullish } from '../../utils/misc';
import { StyledText } from "../../components/ui"
import theme from '../../styles/theme';
import { ScrollView } from 'react-native-gesture-handler';

import { formatDateToStringWithTime } from "../../utils/dates"

export const NotificationsScreen = ({ route, navigation }) => {
  const { user } = useUser()
  const { message = 'No hay mensajes disponibles' } = route.params ?? {};
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    if (isNullish(user?.documento)) return navigation.navigate("Login");

    notificationsServices.getReclamosByDocumento(user.documento)
      .then(notificaciones => setNotificaciones(notificaciones ?? []));
  }, [user?.documento])


  return (
    <ScrollView>
    <View style={styles.container}>
      {
        notificaciones.length > 0
          ? notificaciones.map((notificacion, index) => (
            <View key={index} style={styles.notificacionContainer}>
              <StyledText bold style={styles.text}>
                {formatDateToStringWithTime(notificacion.fecha)}
              </StyledText>
              <StyledText style={styles.text}>{notificacion.mensaje}</StyledText>
            </View>
          ))
          : <StyledText style={[styles.notificacionContainer, styles.text]}>{message}</StyledText>
      }
    </View>
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.global.screenInnerPadding,
    backgroundColor: '#d4edda',
    gap: 5,
  },
  notificacionContainer: {
    padding: theme.global.screenInnerPadding,
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.global.borderRadius,
    minHeight: 1,  // Altura mínima para todas las notificaciones
    width: '90%',  // Ancho de las notificaciones
    marginBottom: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,  // Ajusta este valor según el tamaño de fuente deseado
  },
});