import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import theme from '../styles/theme';

export default function InicioScreen() {
  const [sitios, setSitios] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.0.2.2:8080/api/sitios/listar');
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
          {sitios.map((sitio, index) => (
            <TouchableOpacity
              key={index}
              style={styles.sitioContainer}
              onPress={() => navigation.navigate('Detalle', { sitio })}
            >
              <Image style={styles.image} source={{ uri: 'https://via.placeholder.com/150' }} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{sitio.cargoDelSitio}</Text>
                <Text style={styles.description}>{sitio.descripcion}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.global.screenInnerPadding,
  },
  scrollView: {
    maxHeight: '80vh',
  },
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