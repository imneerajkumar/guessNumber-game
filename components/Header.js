import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';

import colors from "../config/colors";
import defaultStyles from '../config/defaultStyles';

function Header({ title }) {
  return (
    <View 
      style={[
        styles.header, 
        Platform.select({
          ios: styles.headerIOS,
          android: styles.headerAndroid
        })
      ]}
    >
      <Text style={[defaultStyles.title, styles.title]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  headerIOS: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  headerAndroid: {
    backgroundColor: colors.primary
  },
  title: {
    color: Platform.OS === "android" ? colors.white : colors.primary,
    fontSize: 26
  },
})

export default Header;