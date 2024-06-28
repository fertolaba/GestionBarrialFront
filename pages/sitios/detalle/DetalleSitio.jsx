import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { StyledButton, StyledText } from '../../../components/ui';
import theme from '../../../styles/theme';

import { generatePlaceholderImage } from '../../../utils/images';
import { useUser } from '../../../context';


export const DetalleSitio = ({ navigation, route }) => {
  const { user } = useUser();
  const { sitio } = route.params;

  let imagenPrincipal = sitio.images?.length > 0 ? sitio.images[0] : generatePlaceholderImage();

  return (
    <View style={styles.container}>
      {
        user?.documento === sitio.documento && (
          <View style={styles.ownSiteLabel}>
            <StyledText bold center>Este es tu sitio</StyledText>
            <StyledText center>Así lo verán otros usuarios de la aplicación</StyledText>
          </View>
        )
      }

      <Image style={styles.image} source={{ uri: imagenPrincipal }} />
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

  ownSiteLabel: {
    backgroundColor: theme.colors.success,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
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