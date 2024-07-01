import { View, Image, Pressable, StyleSheet } from 'react-native';
import { generatePlaceholderImage } from '../../utils/images';
import { StyledText } from '../ui';


export const SitioPressable = ({ sitio, onPress }) => {
    return (
        <Pressable
            style={styles.sitioContainer}
            onPress={onPress}
        >
            <Image style={styles.image} source={{ uri: generatePlaceholderImage(150, 150) }} />
            <View style={styles.textContainer}>
                <StyledText style={styles.title}>{sitio.idSitio}</StyledText>
                <StyledText style={styles.description}>{sitio.descripcion}</StyledText>
                <StyledText style={styles.description}>{sitio.comentarios}</StyledText>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    sitioContainer: {
        marginBottom: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
    },
    textContainer: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    description: {
        fontSize: 14,
        color: '#666',
    },
});