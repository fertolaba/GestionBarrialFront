import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import theme from '../styles/theme';
import sitiosServices from '../services/sitios.services';
import { StyledText } from '../components/ui';
import { SitioPressable } from '../components/sitios/SitioPressable';

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
          {
            sitios.map((sitio, index) => (
              <SitioPressable
                key={index}
                sitio={sitio}
                onPress={() => navigation.navigate('Sitios', {
                  screen: "Detalle",
                  params: { sitio },
                })}
              />
            ))
          }
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
});