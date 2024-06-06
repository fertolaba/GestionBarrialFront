import { Image, Pressable, StyleSheet, View } from "react-native";
import theme from "../styles/theme";
import StyledText from "./ui/StyledText";

// type Denuncia = {
//     iddenuncias: number;
//     vecino: {Vecino};
//     sitio: {Sitio};
//     descripcion: string;
//     estado: string;
//     aceptarresponsabilidad: number;
// }


export const DenunciaCard = ({ denuncia: { imageSource, tipo, descripcion }, isDetail, ...props }) => {

  const appliedCardStyle = [styles.card, isDetail && styles.cardOnDetail]
  const appliedImageStyle = [styles.cardImage, isDetail && styles.imageOnDetail]
  const appliedCardBodyStyle = [styles.cardBody, isDetail && styles.bodyOnDetail]

  return (
    <Pressable style={appliedCardStyle} {...props}>
      <Image style={appliedImageStyle} source={{ uri: imageSource }} />
      <View style={appliedCardBodyStyle}>
        <StyledText fontSize={"heading"} bold="bolder">{tipo}</StyledText>
        <StyledText>{descripcion}</StyledText>
      </View>
    </Pressable>
  )
}


const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: theme.global.borderRadius,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: theme.colors.secondary,
    backgroundColor: theme.colors.white,
    maxWidth: "100%",
    elevation: 3,
  },
  cardOnDetail: {
    flexDirection: 'column',
    maxHeight: "50%"
  },
  cardImage: {
    maxWidth: 300,
    flex: 2,
    objectFit: 'cover',
    aspectRatio: 1,
    borderColor: theme.colors.secondary,
    borderRadius: theme.global.borderRadius,
    borderRightWidth: 2, // No lo toma??
    overflow: "hidden",
  },
  imageOnDetail: {
    flex: 6,
    minWidth: "100%",
    maxWidth: '100%',
    borderRightWidth: 0,
    borderRightBottom: 2,
  },
  cardBody: {
    flex: 4,
    padding: 20,
    justifyContent: 'center',
  },
  bodyOnDetail: {
    flex: 1,
    alignItems: 'center'
  }
})