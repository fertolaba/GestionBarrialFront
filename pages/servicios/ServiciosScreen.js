import React from 'react'
import { View, StyleSheet } from 'react-native'
import theme from '../../styles/theme';
import { StyledButton } from '../../components/ui/StyledButton';

const ServiciosScreen = ({ navigation }) => {
  return (
    <View style={styles.screenContainer}>
      <View style={styles.container}>
        {
          [{ text: "Comercio", path: "Comercio" }, { text: "Servicio Profesional", path: "ServicioProfesional" }].map(s => (
            <StyledButton
              key={s.path}
              title={s.text}
              variant={"primary"}
              onPress={() => navigation.navigate(s.path)}
            />
          ))
        }
      </View>
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
  container: {
    gap: 20,
  },
});

export default ServiciosScreen;