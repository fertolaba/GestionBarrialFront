import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

export function CreateButton(props) {
  const { onPress, text } = props;

  return (
    <Pressable
      style={{
        ...styles.button,
        backgroundColor: "#0a0a0a"
      }}
      onPress={onPress}
    >
      <Text
        style={{
          ...styles.buttonText,
          color: "#f1f1f1"
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
}

export function StateButton(props) {
  const { onPress, text } = props;

  return (
    <Pressable
      style={{
        ...styles.button,
        backgroundColor: "#000080"
      }}
      onPress={onPress}
    >
      <Text
        style={{
          ...styles.buttonText,
          color: "#f1f1f1"
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    borderRadius: 10,
    width: "80%",
    paddingVertical: 15,
    marginVertical: 10
  },
  buttonText: {
    textAlign: "center"
  }
});
