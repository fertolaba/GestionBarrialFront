import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function NotificationsScreen({ route }) {
  const { message = 'No hay mensajes disponibles' } = route.params ?? {};

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#d4edda',
    borderRadius: 5,
    margin: 10,
  },
  text: {
    color: '#155724',
    fontSize: 16,
  },
});