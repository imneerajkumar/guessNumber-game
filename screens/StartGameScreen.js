import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableWithoutFeedback, View, Keyboard, Alert, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';
import colors from "../config/colors";
import defaultStyles from '../config/defaultStyles';

function StartGameScreen({ onStartGame }) {
  const [enterdValue, setEnteredValue] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width/4);

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get('window').width/4)
    };
  
    Dimensions.addEventListener("change", updateLayout);
    return () => {
      Dimensions.removeEventListener("change", updateLayout)
    };
  });

  const takeInput = (text) => {
    setEnteredValue(text.replace(/[^0-9]/g, ""));
  }

  const resetInput = () => {
    setEnteredValue("");
    setConfirm(false);
  }

  const confirmInput =() => {
    const chosenNumber = parseInt(enterdValue);
    if (isNaN(chosenNumber) || chosenNumber <=0 || chosenNumber > 99) {
      Alert.alert("Invalid number!", "Number has to be between 1 and 99.", [{text: "Okay", style: "destructive", onPress: resetInput}])
      return;
    }
    setConfirm(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue("");
    Keyboard.dismiss();
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>  
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
          <View style={styles.screen}>
            <Text style={[defaultStyles.title, styles.title]}>Start a New Game!</Text>
            <Card style={styles.inputContainer}>
              <Text style={defaultStyles.text}>Select a Number</Text>
              <Input 
                style={styles.input} 
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={takeInput}
                value={enterdValue}
              />
              <View style={styles.buttonContainer}>
                <View style={{width: buttonWidth}}>
                  <Button title="Reset" onPress={resetInput} color={colors.accent} />
                </View>
                <View style={{width: buttonWidth}}>  
                  <Button title="Confirm" onPress={confirmInput} color={colors.primary} />
                </View>
              </View>
            </Card>
            {confirm && (
              <Card style={styles.summary}>
                <Text style={defaultStyles.text}>You Selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => onStartGame(selectedNumber)}>
                  START GAME
                </MainButton>
              </Card>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 22
  },
  inputContainer: {
    width: "80%",
    minWidth: 300,
    maxWidth: "95%",
    alignItems: "center",
  },
  input: {
    width: 50,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15
  },
  summary: {
    marginTop: 25,
    alignItems: "center"
  }
});

export default StartGameScreen;