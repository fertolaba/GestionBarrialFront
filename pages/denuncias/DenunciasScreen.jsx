import React, { useEffect, useState } from 'react'

import { View, FlatList, SafeAreaView, StyleSheet } from 'react-native'
import { StyledText } from '../../components/ui';
import { DenunciaCard } from '../../components/DenunciasCard';
import denunciasServices from '../../services/denuncias.services'
import theme from '../../styles/theme';

const DenunciasList = ({ navigation, denuncias }) => {
  return (
    <SafeAreaView style={styles.listContainer}>
      {
        denuncias.length === 0
          ? <StyledText>No hay denuncias</StyledText>
          : (
            <FlatList
              data={denuncias}
              ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
              renderItem={({ item }) => (
                <DenunciaCard
                  denuncia={item}
                  navigation={navigation}
                  onPress={() => navigation.navigate('Denuncias', {
                    screen: "Detalle",
                    params: {
                      denuncia: item
                    }
                  })}
                />
              )}
              // sin el index tira error por key, debe ser la forma de generar el id en la data de prueba
              // no deberia tener problemas cuando se obtenga la data de la api
              keyExtractor={(item, i) => String("denuncia:" + i + item.iddenuncias)}
            />
          )
      }
    </SafeAreaView>
  )
}

const DenunciasScreen = ({ navigation }) => {
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
      {
        loading ? <StyledText>Cargando...</StyledText> : <DenunciasList denuncias={denunciasTest} navigation={navigation} />
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
    backgroundColor: theme.colors.white,
    padding: theme.global.screenInnerPadding,
  },
  listContainer: {
    flex: 1,
    direction: 'column',
    marginVertical: 2,
    width: "100%",
  }
});
export default DenunciasScreen;