import { Image, StyleSheet, View } from "react-native";
import theme from "../utils/theme";
import StyledText from "./StyledText";

// type Denuncia = {
//     iddenuncias: number;
//     vecino: {Vecino};
//     sitio: {Sitio};
//     descripcion: string;
//     estado: string;
//     aceptarresponsabilidad: number;
// }


export const DenunciasCard = ({ denuncia: { imageSource, tipo, descripcion }, ...props }) => {
    return (
        <View style={styles.card} {...props}>
            <Image style={styles.cardImage} source={{ uri: imageSource }} />
            <View style={styles.cardBody}>
                <StyledText fontSize={"heading"} bold="bolder">{tipo}</StyledText>
                <StyledText>{descripcion}</StyledText>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        borderRadius: 2,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: theme.colors.secondary,
    },
    cardImage: {
        maxWidth: 300,
        flex: 2,
        objectFit: 'cover',
        aspectRatio: 1,
        borderColor: theme.colors.secondary,
        borderRadius: 2,
        borderRightWidth: 2,
        overflow: "hidden",
    },
    cardBody: {
        flex: 4,
        padding: 20,
        justifyContent: 'center', 
    }
})