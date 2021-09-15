import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from "../config/colors";

function Card({ children, style }) {
  return (
    <View style={[ styles.card, style ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3},
    shadowRadius: 8,
    shadowOpacity: 0.3,
    elevation: 20,
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
  },
})

export default Card;