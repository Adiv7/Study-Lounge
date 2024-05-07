import React from 'react';
import { Text, View, StyleSheet, Button, Image, TouchableOpacity, Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import LeitnerSystem from './LeitnerSystem';
import StudyLounge from './StudyLounge';

const Tips = () => {// Initialise navigation hook
  
  const navigation = useNavigation();
  const navigateToLeitnerSystem = () => {
    console.log('Navigating to LeitnerSystem');
    navigation.navigate('LeitnerSystem'); // Navigate to LeitnerSystem
  };
  const navigateToStudyLounge = () =>{
    console.log('Navigating to Study Lolunge');
    navigation.navigate('StudyLounge')
  }
  const openMiroLink = () => {
    Linking.openURL('https://miro.com/mind-map/');
  };
  const openActiveRecallLink = () => {
    Linking.openURL('https://activerecall.com/');
  };
  const openBlurtingLink = () => {
    Linking.openURL('https://www.blurting.ai/landing');
  };
  return (
    <ScrollView>
      <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'green', textAlign:'center', alignItems:'flex-start' }}>   Study Tips</Text>
      <Text style={{ fontSize: 24, fontStyle: 'italic', textAlign:'center' }}>How to study SMART, not hard!</Text>

      <View style={styles.Studytips}>
        <View style={[styles.methods, styles.titlebox, styles.shadowProp]}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Method 1</Text>
        </View>
        
        <View style={[styles.text, styles.textbox, styles.shadowProp]}>
          <Text style={[styles.insidetext, { fontSize: 17 }]}>
          
            
            <Text style={{ fontWeight: 'bold' }}>Feynman Technique</Text>{'\n'}{'\n'}
            This technique involves explaining in terms to someone who has no background.
            It helps with simplifying complex ideas, identify gaps in knowledge, and form a foundation.
            As Einstein once said, <Text style={{ fontWeight: "bold", fontStyle: 'italic' }}> "if you can't explain it simply, you don't understand well enough." </Text>
            {'\n'} You can follow 4 simple steps:
            <Text style={{ fontStyle: 'italic' }}>
              {'\n'} {'\n'} 1. Pick and study a topic {'\n'} {'\n'} 2. Pretend you teach it to someone, like a child, who is unfamiliar with the topic. {'\n'} {'\n'} 3. Identify any gaps in your understanding {'\n'} {'\n'} 4. Simplify{'\n'}{'\n'}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../pictures/teacher.png')} />
            </View>
          </Text>
        </View>

        <View style={[styles.methods, styles.titlebox, styles.shadowProp]}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Method 2</Text>
        </View>
        <View style={[styles.text, styles.textbox, styles.shadowProp]}>
          <Text style={[styles.insidetext, { fontSize: 17 }]}>
            <Text style={{ fontWeight: 'bold' }}>Mind Mapping</Text>{'\n'}{'\n'}
            Drawing a diagram and illustration to visually organize information into a hierarchy (organization) can help draw connections and show relationships between pieces of information.
            Mind mapping can help boost creativity and help retain information better.{'\n'}{'\n'}
            Most popular questions that help defying your Mind Map are:{'\n'}
            - What is the main topic or concept?{'\n'}
            - What are the key components or subtopics related to the main topic?{'\n'}
            - How are the components connected? {'\n'}
            - What are the main characteristics or attributes of each component? {'\n'}
            - What examples or illustrations can be used to represent each component? {'\n'}{'\n'}
          </Text>
          <View>
            <Image source={require('../pictures/mindmapping.png')} />
          </View>
          <TouchableOpacity style={styles.tryMethodButton} onPress={openMiroLink}>
            <Text style={{ color: 'white' }}>Try Miro</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.methods, styles.titlebox, styles.shadowProp]}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Method 3</Text>
        </View>
        <View style={[styles.text, styles.textbox, styles.shadowProp]}>
          <Text style={[styles.insidetext, { fontSize: 17 }]}>
            <Text style={{ fontWeight: 'bold' }}>Active Recall</Text>{'\n'}{'\n'}
            3.1. Write questions when notes-taking - Formulating questions about the material forces deeper processing than passive reading/listening.
            Mind mapping can help boost creativity and help retain information better.{'\n'}{'\n'}
            3.2. Stop and Summarise - Periodically pausing to concisely summarize the main points in your own words cements your understanding, {'\n'}{'\n'}
            3.4. Incorporate practice questions and past exams - Answering example, past exam, or self-created questions about the material tests and improves individual’s working knowledge. {'\n'}{'\n'}           
          </Text>
          <View>
            <Image source={require('../pictures/activerecall.jpg')} />
          </View>
          <TouchableOpacity style={styles.tryMethodButton} onPress={openActiveRecallLink}>
            <Text style={{ color: 'white' }}>Try Active Recall</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.methods, styles.titlebox, styles.shadowProp]}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Method 4</Text>
        </View>
        <View style={[styles.text, styles.textbox, styles.shadowProp]}>
          <Text style={[styles.insidetext, { fontSize: 17 }]}>
            <Text style={{ fontWeight: 'bold' }}>Leitner system</Text>{'\n'}{'\n'}
            It is a method with little boxes and notecards, where the boxes are labelled indicating when to revise, according to user’s memory. {'\n'} {'\n'} 
            1. Prepare your study materials and make flashcards:{'\n'}
              Write down questions, keywords, or concepts on individual flashcards. Each flashcard should represent a single piece of information that you want to memorize.{'\n'}{'\n'}
            2. Set up your study boxes and label them:{'\n'}
              Divide your study space into several boxes or compartments. You can use physical boxes or digital folders to represent each study box.{'\n'}
              Label each box with a number or category to indicate the level of mastery, how well you remember the flashcard.{'\n'}
              Box 1: New or Unseen{'\n'}
              Box 2: Review{'\n'}
              Box 3: Intermediate{'\n'}
              Box 4: Advanced{'\n'}
              Box 5: Mastered{'\n'}{'\n'}
            3. Start with Box 1 (New or Unseen):{'\n'}
              Begin by studying the flashcards in Box 1. These are the flashcards you haven't seen before or haven't mastered yet. {'\n'}{'\n'}
            4. Move flashcards between boxes: {'\n'}
              As you review the flashcards, move them between boxes based on your level of mastery. If you answer a flashcard correctly, move it to the next box.{'\n'}{'\n'}
            5. Follow a spaced repetition schedule:{'\n'}  
              Box 1 (Every day){'\n'}
              Box 2 (Every 2 days){'\n'}
              Box 3 (Every 3 days){'\n'}
              Box 4 (Twice a week){'\n'}
              Box 5 (Once a week){'\n'}
          </Text>
          <View>
            <Image source={require('../pictures/LeitnerSystem.png')} />
          </View>
          
          <TouchableOpacity style={styles.tryMethodButton} onPress={navigateToLeitnerSystem}>
            <Text style={{ color: 'white' }}>Try method</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.methods, styles.titlebox, styles.shadowProp]}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Method 5</Text>
        </View>
        <View style={[styles.text, styles.textbox, styles.shadowProp]}>
          <Text style={[styles.insidetext, { fontSize: 17 }]}>
            <Text style={{ fontWeight: 'bold' }}>Memorise instantlly</Text>{'\n'}{'\n'}
            1. Take your study material and read over first lines a few times. {'\n'}
            2. Write down the first letter of each word.(including capital letters and punctuation){'\n'}
            3. Read it using First letters only.{'\n'}
            4. Try it from memory.   {'\n'}{'\n'}  
            Example:{'\n'}{'\n'}
            Let's say you're trying to memorize a quote:<Text style={{fontWeight: 'bold'}}>"The only way to do great work is to love what you do."{'\n'}</Text>
            Begin by reading over the quote a few times to familiarize yourself with the content.{'\n'}
            Write down the first letter of each word in the quote, including capital letters and punctuation. It would look like this:<Text style={{fontWeight: 'bold'}}>"T o w t d g w i t l w y d."{'\n'}</Text>
            Practice reading the quote using only the first letters of each word. {'\n'}
            Try From Memory: Finally, attempt to recall the entire quote from memory. Repeat this process until you can confidently recite the quote without looking at your notes.
          </Text>
          <View>
            <Image source={require('../pictures/memory.jpg')} />
          </View>
        </View>
         <View> 
                 
        <View style={[styles.methods, styles.titlebox, styles.shadowProp]}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Method 6</Text>
        </View>
        <View style={[styles.text, styles.textbox, styles.shadowProp]}>
          <Text style={[styles.insidetext, { fontSize: 17 }]}>
            <Text style={{ fontWeight: 'bold' }}>Memory System</Text>{'\n'}{'\n'}
            1. Grab an index card. {'\n'}
            2. Give it a title.{'\n'}
            3. Fill it with informationabout the subject, make it sound personal and very informal.{'\n'}
            4. Write your personal connection, what your brain recognize.{'\n'}  
            5. Draw a picture{'\n'}{'\n'}
            Scenario: Solar System{'\n'}{'\n'}
            Grab an index card or any piece of paper. Choose a title that summarizes the topic, "Planets".{'\n'}
            For instance, under the title, write facts about each planet, such as its size, distance from the sun, and unique features.{'\n'}
            Include any personal connections or associations you have with the topic.This could a related memory, or simply why you find the topic interesting.{'\n'}
            Create a simple illustration or diagram related to the subject on the index card. Draw the solar system with labeled planets.{'\n'}{'\n'}
          </Text>
          <View>
            <Image source={require('../pictures/indexcard.jpg')} />
          </View>
          
        </View>
        <View style={[styles.methods, styles.titlebox, styles.shadowProp]}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Method 7</Text>
        </View>
        <View style={[styles.text, styles.textbox, styles.shadowProp]}>
          <Text style={[styles.insidetext, { fontSize: 17 }]}>
            <Text style={{ fontWeight: 'bold' }}>Pomodoro Technique</Text>{'\n'}
            1. Pick a task {'\n'}  
            2. Set a 25-minute timer {'\n'}
            3. Work on your task till time is up {'\n'}   
            4. Take a 5 minutes break {'\n'}
            5. Every 4 pomodoros, take a loger 15-30 minute break {'\n'}{'\n'}     
          </Text>
          <View>
            <Image source={require('../pictures/pomodoro.jpg')} />
          </View>
          
          <TouchableOpacity style={styles.tryMethodButton} onPress={navigateToStudyLounge}>
            <Text style={{ color: 'white' }}>Study Lounge</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.methods, styles.titlebox, styles.shadowProp]}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Method 8</Text>
        </View>
        <View style={[styles.text, styles.textbox, styles.shadowProp]}>
          <Text style={[styles.insidetext, { fontSize: 17 }]}>
            <Text style={{ fontWeight: 'bold' }}>Blurting Method</Text>{'\n'}{'\n'}
            1. Get your notes in order {'\n'}  
            2. Choose a topic {'\n'}
            3. Write Down (Blurt) Everything You Know About The Topic {'\n'}   
            4. Compare Your Blurt to Your Notes {'\n'}
            5. Study What You Missed {'\n'}{'\n'}   
            Topic: World War II{'\n'} {'\n'}
            Gather all your notes, textbooks, and resources related to World War II.{'\n'}
            Select a specific aspect of World War II to focus on, such as the causes, major battles, key figures, or the aftermath.{'\n'}
            Without looking at your notes, write down everything you can remember about the chosen topic. {'\n'}
            After completing your blurt, compare it to your notes and textbooks. Identify any gaps in your understanding.{'\n'}
            Last step focus on studying the areas where you struggled or missed important details. {'\n'}{'\n'}
          </Text>
          <View>
            <Image source={require('../pictures/blurting.png')} />
          </View>
          
          <TouchableOpacity style={styles.tryMethodButton} onPress={openBlurtingLink}>
            <Text style={{ color: 'white' }}>Try Blurting AI</Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Studytips: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  titlebox: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 25,
    paddingHorizontal: 25,
    marginVertical: 10,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  methods: {
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 17,
    alignItems: 'center',
  },
  textbox: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 25,
    paddingHorizontal: 25,
    marginVertical: 10,
  },
  insidetext: {
    textAlign: 'left',
  },
  tryMethodButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'green',
    padding: 5,
    borderRadius: 5,
  },
});

export default Tips;
