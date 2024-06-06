import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { StyledButton } from '../components/ui/StyledButton'
import theme from '../styles/theme'

export default function InicioScreen() {
  return (
    <View style={styles.container}>
      <Text>Gestion Barrial</Text>
      <View>
        <StyledButton variant={'primary'} onPress={()=>console.log("pressed")} >asdasd</StyledButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: theme.global.screenInnerPadding
  }
})
