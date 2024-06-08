import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StyledButton } from '../components/ui/StyledButton';
import theme from '../styles/theme';

export default function InicioScreen() {
  const [sitios, setSitios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/sitios/listar');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSitios(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View>
          {/* Mapea sobre los sitios y muestra los datos */}
          {sitios.map((sitio, index) => (
            <View key={index} style={styles.sitioContainer}>
              <Text>Calle: {sitio.calle}</Text>
              <Text>Número: {sitio.numero}</Text>
              <Text>Descripción: {sitio.descripcion}</Text>
              <Text>Apertura: {sitio.apertura}</Text>
              <Text>Cierre: {sitio.cierre}</Text>
              <Text>Comentarios: {sitio.comentarios}</Text>
            </View>
          ))}
          
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.global.screenInnerPadding
  },
  scrollView: {
    maxHeight: '80vh' // Altura máxima del ScrollView
  },
  sitioContainer: {
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10
  }
});
