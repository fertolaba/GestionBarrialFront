import { Image, StyleSheet, View } from "react-native"
import { StyledButton, StyledText } from "../ui"
import { generatePlaceholderImage } from "../../utils/images"

import theme from "../../styles/theme"
import { useUser } from "../../context"
import { isNullish } from "../../utils/misc"
import { useNavigation } from "@react-navigation/native";


export const CardNotLoggedIn = () => {
  const navigation = useNavigation()

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


export const CardSinSitio = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.sinServicioCard}>
      <View>
        <StyledText bold center fontSize={'subheading'}>Todavía no creaste tu sitio</StyledText>
        <StyledText center fontSize={'subtitle'}>Crea tu sitio para que los vecinos puedan ver tu comercio o los servicios que brindas</StyledText>
      </View>
      <StyledButton title={"Crea tu sitio"} variant={'success'} style={styles.btn} onPress={() => navigation.navigate("Sitios", { screen: "Edicion" })} />
    </View>
  )
}

export const CardSitioPropio = ({ sitio }) => {
  const navigation = useNavigation()

  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: generatePlaceholderImage() }} style={{ position: "absolute", flex: 1, width: "100%", height: "100%", objectFit: "cover" }} />
      <View style={styles.cardInnerWrapper}>
        <View style={styles.cardInner}>
          <View style={styles.textContainer}>
            <StyledText variant={'success'} style={{ marginBottom: 5 }} bold>Tu sitio</StyledText>
            <StyledText bold center fontSize={'heading'}>{sitio.cargoDelSitio}</StyledText>
            <StyledText center fontSize={'subtitle'}>{sitio.descripcion}</StyledText>

            <View style={styles.controlsContainer}>

              <StyledButton
                title={"Ver sitio"}
                variant={'success'}
                style={styles.btn}
                onPress={() => navigation.navigate("Sitios", {
                  screen: "Detalle",
                  params: { sitio }
                })} />

              <StyledButton
                title={"Editar"}
                variant={'primary'}
                style={styles.btn}
                onPress={() => navigation.navigate("Sitios", {
                  screen: "Edicion",
                  params: { sitio }
                })}
              />

            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const SitioUsuario = ({ sitio, loading }) => {
  const { user } = useUser()

  if (loading) return <StyledText center>Cargando...</StyledText>
  if (isNullish(user)) return <CardNotLoggedIn />
  if (user.tipoUsuario === "inspector") return null;
  if (!sitio) return <CardSinSitio />

  return <CardSitioPropio sitio={sitio} />
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: theme.global.borderRadius,
    overflow: "hidden",
    height: "40%",
  },

  cardInnerWrapper: {
    width: "100%",
    height: "100%",
    padding: theme.global.screenInnerPadding / 2,
  },

  cardInner: {
    width: "100%",
    height: "100%",
    padding: theme.global.screenInnerPadding / 3,
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