import { Alert, View } from 'react-native';
import React from 'react';
import { StyledButton, StyledText } from '../../../components/ui';
import { useUser } from '../../../context/UserContext';
import reclamosServices from '../../../services/reclamos.services';
import { exists } from '../../../utils/misc';

export default function DetalleReclamo({ route, navigation }) {
  const { user } = useUser();
  const { reclamo } = route.params;

  const actualizarEstadoReclamo = async (estado) => {
    const legajo = user?.legajo;

    const reclamoActualizado = await reclamosServices.actualizarEstadoReclamo(reclamo, estado, legajo)

    Alert.alert(reclamoActualizado.message.title, reclamoActualizado.message.description)
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

  console.log(JSON.stringify(reclamo, null, 2))

  return (
    <View style={{ padding: 10 }}>
      <StyledText style={{ fontSize: 20, marginVertical: 10 }}>Detalle de reclamo</StyledText>

      <StyledText bold italic style={{ marginBottom: 5 }}>
        {
          (reclamo.personal?.legajo === user?.legajo || reclamo.vecino?.documento === user?.documento)
            ? "Este reclamo es de tu autoría"
            : user.tipoUsuario === 'inspector'
              ? exists(reclamo.vecino)
                ? `Reclamado por ${reclamo.vecino.nombre.trim()} ${reclamo.vecino.apellido.trim()} (${reclamo.vecino.documento})`
                : "Reclamo de otro inspector"
              : "Reclamo de otro usuario del barrio"
        }
      </StyledText>

      <View style={{ marginBottom: 10, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 5 }}>
        <StyledText bold>{`ID Reclamo: ${reclamo.idreclamo}`}</StyledText>
        <StyledText>{`Descripción: ${reclamo.descripcion}`}</StyledText>
        <StyledText>{`Estado: `} <StyledText bold>{reclamo.estado}</StyledText></StyledText>

        <StyledText bold style={{ marginTop: 5 }}>Sitio:</StyledText>
        <StyledText>{`Latitud: ${reclamo.sitio.latitud}`}</StyledText>
        <StyledText>{`Longitud: ${reclamo.sitio.longitud}`}</StyledText>
        <StyledText>{`Calle: ${reclamo.sitio.calle}, Número: ${reclamo.sitio.numero}`}</StyledText>
        <StyledText>{`Descripción: ${reclamo.sitio.descripcion}`}</StyledText>
        <StyledText>{`Comentarios: ${reclamo.sitio.comentarios || '-'}`}</StyledText>

        <StyledText bold style={{ marginTop: 5 }}>Desperfecto:</StyledText>
        <StyledText>{`Descripción: ${reclamo.desperfecto.descripcion}`}</StyledText>

        {
          exists(reclamo.personal?.legajo) && (
            <View>
              <StyledText bold style={{ marginTop: 5 }}>Personal:</StyledText>
              <StyledText>{`Legajo: ${reclamo.personal.legajo}`}</StyledText>
              <StyledText>{`Nombre: ${reclamo.personal.nombre.trim()} ${reclamo.personal.apellido.trim()}`}</StyledText>
              <StyledText>{`Documento: ${reclamo.personal.documento}`}</StyledText>
              <StyledText>{`Sector: ${reclamo.personal.sector}`}</StyledText>
              <StyledText>{`Fecha de Ingreso: ${new Date(reclamo.personal.fechaIngreso).toLocaleDateString()}`}</StyledText>
            </View>
          )
        }
      </View>

      {user?.tipoUsuario === 'inspector' &&
        reclamo.estado?.toLowerCase() === 'pendiente' &&
        reclamo.personal?.legajo !== user.legajo &&
        (
          <View style={{ marginTop: 10 }}>
            <StyledButton variant='success' title="Marcar reclamo resuelto" onPress={handleFinalizarReclamo} />
            <StyledButton variant='warning' title="Anular reclamo" onPress={handleAnularReclamo} />
          </View>
        )
      }

      <StyledButton title='Volver' variant='secondary' onPress={() => navigation.goBack()} style={{ marginTop: 10 }} />
    </View>
  )
}
