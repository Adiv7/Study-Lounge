import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const About = () => {
  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>🎓 Welcome to Study Lounge - Your Ultimate Self-Study tool! 🎓</Text>
      <Text style={styles.description}>Empower your academic journey with Your App Name, the essential tool designed exclusively for students like you. Revolutionize your approach to learning, enhance comprehension, and master effective study techniques right at your fingertips.</Text>{'\n'}
      <Text style={styles.features}>With Study Lounge, you can:</Text>{'\n'}
      <Text style={styles.feature}>📘 Track Your Progress: Monitor your academic growth and stay on top of your goals with our intuitive progress tracking feature.</Text>{'\n'}
      <Text style={styles.feature}>📚 Organize Your Mind: Streamline your study sessions and declutter your thoughts with our advanced organizational tools, ensuring better focus and productivity.</Text>{'\n'}
      <Text style={styles.feature}>💡 Unlock Better Understanding: Discover a wealth of methods and techniques tailored to your learning style, crafted to deepen your understanding and boost your memory.</Text>{'\n'}
      <Text style={styles.feedback}>Your feedback matters! We're committed to providing you with the best possible experience. Feel free to reach out to my personal email:<Text styles={{fontWeight:'bold'}}> tarcutaadina1@gmail.com </Text> with your valuable suggestions, or any inquiries you may have.</Text>
      <Image source={require('../pictures/me.jpg')} style={styles.image} />
      <Text style={styles.signature}>Adina-Elena Tarcuta{'\n'}Founder, Study Lounge{'\n'}{'\n'}</Text>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  features: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  feature: {
    fontSize: 16,
    marginBottom: 10,
  },
  feedback: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  signature: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default About;
