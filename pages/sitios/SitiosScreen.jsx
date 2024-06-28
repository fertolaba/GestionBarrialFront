import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import theme from '../../styles/theme';
import { StyledText } from '../../components/ui';
import SitioUsuario from "../../components/sitios/SitioUsuario";
import { useIsFocused, useNavigation } from '@react-navigation/native';
import sitiosServices from '../../services/sitios.services';
import { useUser } from '../../context/UserContext';


const SitiosScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused()

  const { user } = useUser()

  const [isLoading, setIsloading] = useState(true);
  const [servicioUsuario, setServicioUsuario] = useState(null)

  useEffect(() => {
    user?.documento && isFocused
      ? sitiosServices.getSitioByDocumento(user.documento)
        .then(servicio => {
          if (servicio)
            setServicioUsuario({
              ...servicio,
              latitud: String(servicio.latitud),
              longitud: String(servicio.longitud),
              numero: String(servicio.numero),
            })

        })

        .catch(console.error)
        .finally(() => setIsloading(false))
      : setIsloading(false)

    !Boolean(user) && setServicioUsuario(null);

  }, [isFocused, user?.documento])

  return (
    <View style={styles.screenContainer}>

      <View style={styles.container}>

        <SitioUsuario loading={isLoading} servicio={servicioUsuario} user={user} navigation={navigation} />

        <View>

          <StyledText fontSize={'subtitle'}>Tus promociones</StyledText>
          <StyledText
            variant={"primary"}
          >
            Aca iria el listado de promociones? del sitio
          </StyledText>
        </View>
        <SafeAreaView>
          <FlatList
            data={Array.from({ length: 10 })}
            renderItem={({ _item, index }) => <StyledText bold>Promocion {index + 1} [...]</StyledText>}
            keyExtractor={(_item, index) => String(index)}
          />

        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'center',
    width: "100%",
    height: "100%",
    backgroundColor: theme.colors.white,
    padding: theme.global.screenInnerPadding,
  },
  container: {
    gap: 20,
    width: "100%",
  },
});

export default SitiosScreen;