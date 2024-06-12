import { SafeAreaView, StyleSheet } from "react-native";
import { DenunciaCard } from "../../components/DenunciasCard";
import theme from "../../styles/theme";
import { StyledButton, StyledText } from "../../components/ui";

function getVariantColorByState(state) {
  switch (state) {
    case "pendiente":
      return "secondary";
    case "revision":
      return "warning";
    case "actualizado":
      return "primary";
    case "rechazada":
    case "cerrado":
      return "alert";
  }
}


export function DenunciaDetalle({ route, navigation }) {
  const { denuncia } = route.params;
  const VolverDenunciaScreenBtn = () => <StyledButton variant={"secondary"} onPress={() => navigation.push(`Listado`)} title="Volver a denuncias" />

  return (
    <SafeAreaView style={styles.screenContainer}>

      {
        denuncia
          ? <DenunciaCard denuncia={denuncia} isDetail />
          : <StyledText>Denuncia no encontrada</StyledText>
      }

      <StyledText fontSize={"heading"} bold textTransform={"capitalize"} variant={getVariantColorByState(denuncia.estado)}>{denuncia.estado}</StyledText>

      <VolverDenunciaScreenBtn />

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'center',
    width: "100%",
    height: "100%",
    padding: theme.global.screenInnerPadding,
    gap: 20,
    backgroundColor: theme.colors.white,
  },
  stateText: {
    fontSize: null,
    textTransform: "capitalize"
  }
})