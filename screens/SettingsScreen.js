// SettingsScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const SettingsScreen = () => {
  const [theme, setTheme] = useState('white');
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [isDarkMode, setIsDarkMode] = useState(false);
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <View style={[styles.container, { backgroundColor: theme === 'white' ? '#fff' : theme === 'black' ? '#000' : theme === 'lilac' ? '#c8a2c8' : theme === 'green' ? '#90ee90' : '#add8e6' }]}>
    <Text style={[styles.text, {fontSize:17, color: isDarkMode ? 'white' : 'black' }]}>Choose Background Theme:{'\n'}{'\n'}</Text>
    <TouchableOpacity onPress={() => handleThemeChange('white')} style={[styles.themeButton, styles.whiteTheme]}>
      <Text style={[styles.themeButtonTextBlack]}>White</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleThemeChange('black')} style={[styles.themeButton, styles.blackTheme]}>
      <Text style={[styles.themeButtonText, styles.whiteText]}>Black</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleThemeChange('lilac')} style={[styles.themeButton, styles.lilacTheme]}>
      <Text style={[styles.themeButtonText, styles.blackText]}>Lilac Purple</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleThemeChange('green')} style={[styles.themeButton, styles.greenTheme]}>
      <Text style={[styles.themeButtonText, styles.blackText]}>Soft Green</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleThemeChange('blue')} style={[styles.themeButton, styles.blueTheme]}>
      <Text style={[styles.themeButtonText, styles.blackText]}>Light Blue</Text>
    </TouchableOpacity>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  themeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeButtonTextBlack:{
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  themeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  whiteTheme: {
    backgroundColor: '#fff',
  },
  blackTheme: {
    backgroundColor: '#000',
  },
  lilacTheme: {
    backgroundColor: '#c8a2c8',
  },
  greenTheme: {
    backgroundColor: '#90ee90',
  },
  blueTheme: {
    backgroundColor: '#add8e6',
  },
});

export default SettingsScreen;
