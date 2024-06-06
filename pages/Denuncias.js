import { View, Text, FlatList, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import denunciasServices  from '../services/denuncias.services'
import { useEffect, useState } from "react";
import StyledText from '../components/StyledText';
import { DenunciasCard } from '../components/DenunciasCard';

const DenunciasList = ({ denuncias }) => {
  return (
      <SafeAreaView style={styles.listContainer}>
          {
              denuncias.length === 0
                  ? <StyledText>No hay denuncias</StyledText>
                  : (
                      <FlatList
                          data={denuncias}
                          ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
                          renderItem={({ item }) => <DenunciasCard denuncia={item} />}
                          // sin el index tira error por key, debe ser la forma de generar el id en la data de prueba
                          // no deberia tener problemas cuando se obtenga la data de la api
                          keyExtractor={(item, i) => String("denuncia:" + i + item.iddenuncias)} 
                      />
                  )
          }
      </SafeAreaView>
  )
}

const DenunciasScreen = () => {
  const [denunciasTest, setDenunciasTest] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      denunciasServices.getDenuncias()
          .then(denuncias => setDenunciasTest(denuncias))
          .catch(error => console.error(`Error obteniendo denuncias\n$\t${error}`))
          .finally(() => setLoading(false))
  }, [])

  return (
      <View style={styles.screenContainer}>
          <Text fontSize={'subheading'} style={styles.subheading}>Lista denuncias</Text>
          {
              loading ? <StyledText>Cargando...</StyledText> : <DenunciasList denuncias={denunciasTest} />
          }
      </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
      justifyContent: 'start',
      alignItems: 'center',
      width: "100%",
      height: "100%",
      margin: 10,
  },
  subheading: {
      textAlign: 'center',
      marginVertical: 5
  },
  listContainer: {
      flex: 1,
      direction: 'column',
      marginVertical: 2,
      width: "100%",
      padding: 20
  }
});
export default DenunciasScreen;