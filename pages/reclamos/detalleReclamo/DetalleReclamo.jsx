import { Alert, View } from 'react-native'
import React from 'react'
import { StyledButton, StyledText } from '../../../components/ui';
import { useUser } from '../../../context/UserContext';
import reclamosServices from '../../../services/reclamos.services';

export default function DetalleReclamo({ route, navigation }) {
  const { user } = useUser()
  const { reclamo } = route.params;


  actualizarEstadoReclamo = async (estado) => {
    const legajo = user?.legajo;

    const reclamoActualizado = await reclamosServices.actualizarEstadoReclamo(reclamo, estado, legajo)

    console.log(reclamoActualizado)
  }

  const handleFinalizarReclamo = () => {
    const estado = 'finalizado';

    Alert.alert(
      "Finalizar reclamo",
      "¿Estás seguro que deseas finalizar este reclamo?",
      [
        { text: "Finalizar", onPress: () => actualizarEstadoReclamo(estado) },
        { text: "Cancelar", style: "cancel" },
      ]
    )
  }

  const handleAnularReclamo = () => {
    const estado = 'anulado';

    Alert.alert(
      "Anular reclamo",
      "¿Estás seguro que deseas anular este reclamo?",
      [
        { text: "Anular", onPress: () => actualizarEstadoReclamo(estado) },
        { text: "Cancelar", style: "cancel" },
      ]
    )
  }

  console.log({
    INSPEC: user?.tipoUsuario === 'inspector',
    estadopdte: reclamo.estado === 'pendiente',
    legajo: reclamo.personal?.legajo !== user.legajo
  })

  return (
    <View>
      <StyledText>Detalle de reclamo</StyledText>
      <StyledText bold>
        {
          (
            user.tipoUsuario === 'inspector'
              ? reclamo.personal?.legajo === user?.legajo && "Reclamo de otro usuario"
              : reclamo.vecino?.documento === user?.documento
          ) && "Este es un reclamo de tu autoría"
        }
      </StyledText>
      <StyledText>
        {
          JSON.stringify(reclamo, null, 2)
        }
      </StyledText>

      {
        user?.tipoUsuario === 'inspector' &&
        reclamo.estado?.toLowerCase() === 'pendiente' &&
        reclamo.personal?.legajo !== user.legajo &&
        (
          <View>
            <StyledButton variant='success' title="Marcar reclamo resuelto" onPress={handleFinalizarReclamo} />
            <StyledButton variant='warning' title="Anular reclamo" onPress={handleAnularReclamo} />
          </View>
        )
      }

      <StyledButton title='Volver' variant='secondary' onPress={() => navigation.goBack()} />
    </View>
  )
}