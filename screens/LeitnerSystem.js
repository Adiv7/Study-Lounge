import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LeitnerSystemPage = () => {
  const [cardIndex, setCardIndex] = useState(0);
  const [animation] = useState(new Animated.Value(0));
  const [showAnswer, setShowAnswer] = useState(false);
  const [flashcards] = useState([
    { question: 'Question 1', answer: 'Answer 1', box: 1 },
    { question: 'Question 2', answer: 'Answer 2', box: 1 },
    { question: 'Question 3', answer: 'Answer 3', box: 1 },
    // Add more flashcards here
  ]);

  const navigation = useNavigation();

  const handleNextCard = () => {
    if (cardIndex < flashcards.length - 1) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setCardIndex(cardIndex + 1);
        setShowAnswer(false); // Reset to question side when moving to next card
        animation.setValue(0);
      });
    }
  };

  const currentCard = flashcards[cardIndex];

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -500], 
  });

  const flipCard = () => {
    Animated.timing(animation, {
      toValue: showAnswer ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setShowAnswer(!showAnswer);
    });
  };

  const saveFlashcard = () => {
    // Implement logic to save flashcard
    console.log('Flashcard saved:', currentCard);
  };

  const openLeitnerSystemLink = () => {
    Linking.openURL('https://leitner-box.com/');
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.linkContainer} onPress={openLeitnerSystemLink}>
        <Text style={styles.linkText}>Visit Leitner System</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.GOBackContainer}onPress={goBack}>
            <Text style={styles.Backbutton}>Back</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.card, { transform: [{ translateY }] }]}>
        <TouchableOpacity style={styles.cardContent} onPress={flipCard}>
          <Text style={styles.cardText}>{showAnswer ? currentCard.answer : currentCard.question}</Text>
        </TouchableOpacity>
        <View style={styles.buttonsContainer}>
          
          <TouchableOpacity onPress={handleNextCard}>
            <Text style={styles.button}>Next</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={saveFlashcard}>
            <Text style={styles.button}>Save</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 300,
    height: 200,
    backgroundColor: 'lightblue',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  button: {
    fontSize: 18,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  Backbutton:{
    position: 'absolute',
    top: 10,
    left: 10,
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  GOBackContainer:{
    position: 'absolute',
    top: 10,
    left: 10,
  },
  linkContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  linkText: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default LeitnerSystemPage;
