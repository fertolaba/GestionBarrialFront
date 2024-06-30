import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { StyledText } from '../ui';
import theme from '../../styles/theme';

export const ReclamosList = ({ titulo, reclamos }) => {
    const navigation = useNavigation()

    const handlePressItem = (reclamo) => {
        navigation.navigate('DetalleReclamo', { reclamo });
    }

    return (
        <View>
            <StyledText
                center
                textTransform='capitalize'
                fontSize={'subtitle'}
            >
                Reclamos {titulo}
            </StyledText>
            {
                reclamos.length === 0
                    ? <StyledText center bold textTransform="capitalize">no hay reclamos {titulo.toLowerCase()}</StyledText>
                    : reclamos.map(reclamo => (
                        <Pressable key={reclamo.idreclamo} onPress={() => handlePressItem(reclamo)} style={[styles.item, reclamo.estado === "finalizado" ? styles.finished : styles.pending]}>
                            <View>
                                <StyledText bold>id{reclamo.idreclamo} </StyledText>
                                <StyledText center>{reclamo.descripcion} - {reclamo.estado}</StyledText>
                            </View>
                        </Pressable>
                    ))
            }
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        borderRadius: theme.global.borderRadius,
        padding: theme.global.screenInnerPadding / 2,
        marginVertical: 8,
        marginHorizontal: 16,
    },

    pending: {
        backgroundColor: theme.colors.warning,

    },

    finished: {
        backgroundColor: theme.colors.success,
    }
})