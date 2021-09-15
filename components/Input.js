import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

function Input({ style, ...otherProps }) {
  return (
    <TextInput 
      style={[styles.input, style]}
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginVertical: 10,
  }
})

export default Input;