import React, { useState, useRef, useEffect } from 'react';
import { Alert, Dimensions, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

import Card from '../components/Card';
import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';
import defaultStyles from '../config/defaultStyles';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max-min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

function GameScreen({ userChoice, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width);
  const [deviceHeight, setDeviceHeight] = useState(Dimensions.get('window').height);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    const updateLayout = () => {
      setDeviceWidth(Dimensions.get('window').height);
      setDeviceHeight(Dimensions.get('window').height);
    };

    Dimensions.addEventListener("change", updateLayout);
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  useEffect(() => {
    if (currentGuess === userChoice){
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if ((direction === "lower" && currentGuess < userChoice) || (direction === "higher" && currentGuess > userChoice)) {
      Alert.alert("Don't lie", "You know that's not true..", [{text: "Sorry!", style: "cancel"}]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    setPastGuesses(currPastGuesses =>  [...currPastGuesses, nextNumber])
  };

  const renderListItem = (item, index) => {
    return (
      <View style={styles.listItem}>
        <Text style={defaultStyles.title}>#{index + 1}</Text>
        <Text style={defaultStyles.title}>{item}</Text>
      </View>
    );
  };

  let listContainer = styles.list;
  if (deviceWidth < 350) {
    listContainer = styles.listBig;
  }

  if (deviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text style={defaultStyles.title}>Opponent's Guess</Text>
        <View style={styles.controls}>
          <MainButton onPress={() => {nextGuessHandler("lower")}}>
            <Ionicons name="md-remove" size={24} color="white" />
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton onPress={() => {nextGuessHandler("higher")}}>
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>
        </View>
        <FlatList 
          style={listContainer}
          keyExtractor={item => item.toString()}
          data={pastGuesses}
          renderItem={({ item, index }) => renderListItem(item, index)}
        />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={defaultStyles.title}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={[styles.buttonContainer, {marginTop: deviceHeight > 600 ? 20: 5 }]}>
        <MainButton onPress={() => {nextGuessHandler("lower")}}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={() => {nextGuessHandler("higher")}}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <FlatList 
        style={listContainer}
        keyExtractor={item => item.toString()}
        data={pastGuesses}
        renderItem={({ item, index }) => renderListItem(item, index)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 400,
    maxWidth: "90%"
  },
  list: {
    flex: 1,
    width: "60%",
    marginTop: 20,
  },
  listBig: {
    flex: 1,
    width: "80%",
    marginTop: 20,
  },
  listItem: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
  }
})

export default GameScreen;