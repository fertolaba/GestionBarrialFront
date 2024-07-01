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
              <View key={index} style={styles.notificaciones}>
                <StyledText bold fontSize={'body'}>
                  {formatDateToStringWithTime(notificacion.fecha)}
                </StyledText>
                <StyledText>{notificacion.mensaje}</StyledText>
              </View>
            ))
            : <StyledText style={styles.notificaciones}>{message}</StyledText>
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
  notificaciones: {
    padding: theme.global.screenInnerPadding,
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.global.borderRadius,
  },
});