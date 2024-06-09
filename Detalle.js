import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from './styles/theme';

export default function Detalle({ route }) {
  const { sitio } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.detailTitle}>{sitio.nombre}</Text>
      <Text>Calle: {sitio.calle}</Text>
      <Text>Número: {sitio.numero}</Text>
      <Text>Descripción: {sitio.descripcion}</Text>
      <Text>Apertura: {sitio.apertura}</Text>
      <Text>Cierre: {sitio.cierre}</Text>
      <Text>Comentarios: {sitio.comentarios}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.global.screenInnerPadding,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});