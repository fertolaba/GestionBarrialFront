import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import theme from '../styles/theme';
import { generatePlaceholderImage } from '../utils/images';
import sitiosServices from '../services/sitios.services';
import { StyledText } from '../components/ui';

export const InicioScreen = () => {
  const [loading, setLoading] = useState(true);
  const [sitios, setSitios] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    Promise.resolve()
      .then(() => setLoading(true))
      .then(() => sitiosServices.getSitios())
      .then(setSitios)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View>
          {loading && <StyledText>Cargando...</StyledText>}
          {sitios.map((sitio, index) => (
            <Pressable
              key={index}
              style={styles.sitioContainer}
              onPress={() => navigation.navigate('Sitios', {
                screen: "Detalle",
                params: { sitio },
              })}
            >
              <Image style={styles.image} source={{ uri: generatePlaceholderImage(150, 150) }} />
              <View style={styles.textContainer}>
                <StyledText style={styles.title}>{sitio.cargoDelSitio}</StyledText>
                <StyledText style={styles.description}>{sitio.descripcion}</StyledText>
              </View>
            </Pressable>
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