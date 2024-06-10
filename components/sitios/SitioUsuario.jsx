import { Alert, Image, StyleSheet, View } from "react-native"
import { StyledButton, StyledText } from "../ui"
import { generatePlaceholderImage } from "../../utils/images"

import theme from "../../styles/theme"

export const CardNotLoggedIn = ({ navigation }) => {
  return (
    <View style={styles.sinServicioCard}>
      <View>
        <StyledText bold center fontSize={'subheading'}>Inicia sesión para crear tu sitio</StyledText>
        <StyledText center fontSize={'subtitle'}>Crea tu sitio para que los vecinos puedan ver tu comercio o los servicios que brindas</StyledText>
      </View>
      <StyledButton title={"Iniciar sesión"} variant={'success'} style={styles.btn} onPress={() => navigation.navigate("Login")} />
    </View>
  )
}


export const CardSinSitio = ({ navigation }) => {
  return (
    <View style={styles.sinServicioCard}>
      <View>
        <StyledText bold center fontSize={'subheading'}>Todavía no creaste tu sitio</StyledText>
        <StyledText center fontSize={'subtitle'}>Crea tu sitio para que los vecinos puedan ver tu comercio o los servicios que brindas</StyledText>
      </View>
      <StyledButton title={"Crea tu sitio"} variant={'success'} style={styles.btn} onPress={() => navigation.navigate("CrearServicioProfesional")} />
    </View>
  )
}

export const CardSitioPropio = ({ sitio, navigation }) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: generatePlaceholderImage() }} style={{ position: "absolute", flex: 1, width: "100%", height: "100%", objectFit: "cover" }} />
      <View style={styles.cardInner}>
        <View style={styles.textContainer}>
          <StyledText variant={'success'} style={{ marginBottom: 5 }} bold>Tu sitio</StyledText>
          <StyledText bold center fontSize={'heading'}>{sitio.cargoDelSitio}</StyledText>
          <StyledText center fontSize={'subtitle'}>{sitio.descripcion}</StyledText>

          <View style={styles.controlsContainer}>
            <StyledButton title={"Ver sitio"} variant={'success'} style={styles.btn} onPress={() => navigation.navigate("DetalleServicio", { sitio })} />
            <StyledButton
              title={"Editar"}
              variant={'primary'}
              style={styles.btn}
              onPress={() => navigation.navigate("EditarServicioProfesional", { sitio })}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

const SitioUsuario = ({ navigation, user, servicio, loading }) => {
  if (loading) return <StyledText center>Cargando...</StyledText>
  if (!user) return <CardNotLoggedIn navigation={navigation} />
  if (user.tipoUsuario === "inspector") return null;
  if (!servicio) return <CardSinSitio navigation={navigation} />

  return <CardSitioPropio sitio={servicio} navigation={navigation} />
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: theme.global.borderRadius,
    overflow: "hidden",
    minHeight: "40%",
    height: "40%",
  },

  cardInner: {
    width: "80%",
    height: "80%",
    margin: "auto",
    padding: 15,

    borderRadius: theme.global.borderRadius,
    backgroundColor: "rgba(255,255,255,0.85)",
  },

  sinServicioCard: {
    borderWidth: 2,
    borderColor: theme.colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: theme.global.borderRadius,
    gap: 10,
  },

  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  btn: {
    alignSelf: 'center',
    maxWidth: 200,
    minWidth: 100,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-around',
    textAlign: 'center',
    gap: 10,
  }
})

export default SitioUsuario