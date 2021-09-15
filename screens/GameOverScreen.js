import React, { useState, useEffect } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import MainButton from '../components/MainButton';

import colors from '../config/colors';
import defaultStyles from '../config/defaultStyles';

function GameOverScreen({ roundTaken, userNumber, onRestart }) {
  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width);
  const [deviceHeight, setDeviceHeight] = useState(Dimensions.get('window').height);

  useEffect(() => {
    const updateLayout = () => {
      setDeviceWidth(Dimensions.get('window').width);
      setDeviceHeight(Dimensions.get('window').height);
    };

    Dimensions.addEventListener("change", updateLayout);
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1}}>
      <View style={styles.screen}>
        <Text style={defaultStyles.title}>GAME OVER!!</Text>
        <View style={[styles.imageContainer, {
          width: deviceWidth * 0.7,
          height: deviceWidth * 0.7,
          borderRadius: (deviceWidth * 0.7) / 2,
          marginVertical: deviceHeight / 30
        }]}>
          <Image 
            source={require("../assets/success.png")}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={[styles.resultContainer, {marginVertical: deviceHeight / 60}]}>
          <Text style={[defaultStyles.text, styles.text]}>
            Your phone needed 
            <Text style={styles.highlight}> {roundTaken} </Text>
            rounds to guess the number 
            <Text style={styles.highlight}> {userNumber} </Text>.
          </Text>
        </View>
        <MainButton onPress={onRestart}>NEW GAME</MainButton>
      </View>
    </ScrollView> 
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10
  },
  imageContainer: {
    borderWidth: 3,
    borderColor: colors.black,
    overflow: "hidden",
  },
  image: {
    width: "100%", 
    height: "100%",
  },
  resultContainer: {
    marginHorizontal: 30
  },
  text: {
    textAlign: "center",
    fontSize: 18,
  },
  highlight: {
    color: colors.primary,
    fontFamily: "open-sans-bold"
  }
})

export default GameOverScreen;