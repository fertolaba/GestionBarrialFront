import React from 'react'
import { View, StyleSheet, Button } from 'react-native'
import theme from '../../styles/theme';

const ServiciosScreen = ({ navigation }) => {
  return (
    <View style={styles.screenContainer}>
      <View style={styles.container}>
        {
          [{ text: "Comercio", path: "Comercio" }, { text: "Servicio Profesional", path: "ServicioProfesional" }].map(s => (
            <Button
              key={s.path}
              title={s.text}
              color={theme.colors.primary}
              style={styles.btn}
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
  btn: {
    padding: 5,
    margin: 5,
  }
});

export default ServiciosScreen;