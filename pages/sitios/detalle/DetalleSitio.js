import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { StyledButton, StyledText } from '../../../components/ui';
import theme from '../../../styles/theme';

export const DetalleSitio = ({ navigation, route }) => {
  const { sitio } = route.params;

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: 'https://via.placeholder.com/150' }} />
      <StyledText style={styles.detailTitle}>{sitio.nombre}</StyledText>
      <StyledText style={styles.label}>Calle:</StyledText>
      <StyledText style={styles.text}>{sitio.calle}</StyledText>
      <StyledText style={styles.label}>Número:</StyledText>
      <StyledText style={styles.text}>{sitio.numero}</StyledText>
      <StyledText style={styles.label}>Descripción:</StyledText>
      <StyledText style={styles.text}>{sitio.descripcion}</StyledText>
      <StyledText style={styles.label}>Apertura:</StyledText>
      <StyledText style={styles.text}>{sitio.apertura}</StyledText>
      <StyledText style={styles.label}>Cierre:</StyledText>
      <StyledText style={styles.text}>{sitio.cierre}</StyledText>
      <StyledText style={styles.label}>Comentarios:</StyledText>
      <StyledText style={styles.text}>{sitio.comentarios}</StyledText>

      <StyledButton title='Volver' variant='secondary' onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.global.screenInnerPadding,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 5,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});