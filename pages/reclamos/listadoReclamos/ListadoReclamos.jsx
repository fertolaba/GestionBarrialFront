import { View, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { StyledButton, StyledText } from '../../../components/ui';
import reclamosServices from '../../../services/reclamos.services';
import { useUser } from '../../../context/UserContext';
import { isNullish } from '../../../utils/misc';

import { ReclamosList } from "../../../components/reclamos/ReclamosList";
import theme from '../../../styles/theme';

export default function ListadoReclamos({ route }) {
  const navigation = useNavigation();
  const listadoDeUsuario = route.params?.listadoDeUsuario ?? false;

  const { user } = useUser();

  const [loading, setLoading] = useState(false)
  const [reclamos, setReclamos] = useState([])

  const [reclamosPendientes, setReclamosPendientes] = useState([])
  const [reclamosFinalizados, setReclamosFinalizados] = useState([])

  useEffect(() => {
    // si no hay usuario o no tiene documento, no le buscamos nada...
    // de paso unexpected guard por si no esta logeado 
    if (isNullish(user) || isNullish(user.documento)) return;

    const esInspector = user.tipoUsuario === 'inspector';

    Promise.resolve()
      .then(() => setLoading(true))
      .then(() => {
        return listadoDeUsuario
          ? esInspector
            ? reclamosServices.getReclamosByLegajo(user.legajo)
            : reclamosServices.getReclamosByDocumento(user.documento)
          : reclamosServices.getReclamos()
      })
      .then(reclamos => reclamos && reclamos.length > 0 && setReclamos(reclamos))
      .finally(() => setLoading(false))
  }, [user?.documento, listadoDeUsuario])

  useEffect(() => {
    if (reclamos.length > 0) {
      setReclamosPendientes(reclamos.filter(reclamo => (reclamo.estado).toLowerCase() === 'pendiente'))
      setReclamosFinalizados(reclamos.filter(reclamo => (reclamo.estado).toLowerCase() === 'finalizado'))
    }
  }, [reclamos])


  return (
    <ScrollView style={styles.screenContainer}>
      <View style={styles.container}>
        <StyledText center fontSize={'subheading'} style={styles.capitalize}>{listadoDeUsuario ? "Tus " : "Todos los "}reclamos</StyledText>
        {loading && <StyledText bold='bolder'>Cargando...</StyledText>}

        <ReclamosList esListadoUsuario={listadoDeUsuario} titulo='pendientes' reclamos={reclamosPendientes} />
        <ReclamosList finalizados esListadoUsuario={listadoDeUsuario} titulo='finalizados' reclamos={reclamosFinalizados} />

        <StyledButton title='Volver' variant='secondary' onPress={() => navigation.goBack()} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: theme.colors.white,
    padding: theme.global.screenInnerPadding,
  },
  container: {
    gap: 20,
    width: "100%",
  },
  capitalize: {
    textTransform: 'capitalize',
  },
});