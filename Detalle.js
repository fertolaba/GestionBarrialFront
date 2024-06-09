import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import theme from './styles/theme';

export default function Detalle({ route }) {
  const { sitio } = route.params;

  return (
    <View style={styles.container}>
      {sitio.imageUrl && <Image source={{ uri: sitio.imageUrl }} style={styles.image} />}
      <Text style={styles.detailTitle}>{sitio.nombre}</Text>
      <Text style={styles.label}>Calle:</Text>
      <Text style={styles.text}>{sitio.calle}</Text>
      <Text style={styles.label}>Número:</Text>
      <Text style={styles.text}>{sitio.numero}</Text>
      <Text style={styles.label}>Descripción:</Text>
      <Text style={styles.text}>{sitio.descripcion}</Text>
      <Text style={styles.label}>Apertura:</Text>
      <Text style={styles.text}>{sitio.apertura}</Text>
      <Text style={styles.label}>Cierre:</Text>
      <Text style={styles.text}>{sitio.cierre}</Text>
      <Text style={styles.label}>Comentarios:</Text>
      <Text style={styles.text}>{sitio.comentarios}</Text>
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