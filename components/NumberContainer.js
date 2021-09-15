import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../config/colors';

function NumberContainer({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: colors.accent,
    padding: 10,
    borderRadius: 10,
    marginVertical: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: colors.accent,
    fontSize: 22
  }
})

export default NumberContainer;