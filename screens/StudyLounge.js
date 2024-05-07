import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, ScrollView, Dimensions, Switch } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from "@react-navigation/native";
import { Vibration } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Tips from './Tips';
import { Audio } from 'expo-av';
//sound file path


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const formatNumber = number => `0${number}`.slice(-2);




const getRemaining = time => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  return { hours: formatNumber(hours), minutes: formatNumber(minutes), seconds: formatNumber(seconds) };
}

const createArray = length => {
  const arr = [];
  let i = 0;
  while (i < length) {
    arr.push(i.toString());
    i += 1;
  }
  return arr;
}

const AVAILABLE_HOURS = createArray(24);
const AVAILABLE_MINUTES = createArray(60);
const AVAILABLE_SECONDS = createArray(60);

const StudyLounge = () => {
  const [remainingSeconds, setRemainingSeconds] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedHours, setSelectedHours] = useState("0");
  const [selectedMinutes, setSelectedMinutes] = useState("0");
  
  const [selectedSeconds, setSelectedSeconds] = useState("5");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [breakSeconds, setBreakSeconds] = useState(5 * 60);
  const circleSize = useRef(new Animated.Value(0)).current;
  const intervalRef = useRef(null);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  useEffect(() => {
    Animated.timing(circleSize, {
      toValue: remainingSeconds,
      duration: remainingSeconds * 1000,
      useNativeDriver: false,
    }).start();
  }, [isRunning]);

  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        setRemainingSeconds(prev => {
          if (prev <= 0) {
            clearInterval(timer);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isRunning]);

  useEffect(() => {
    if (isRunning && remainingSeconds === 0) {
      setIsBreak(true);
      setRemainingSeconds(breakSeconds);
      setIsRunning(false);
      startBreak();
      Vibration.vibrate(2000);
    }
  }, [isRunning, remainingSeconds, breakSeconds]);

  const startBreak = () => {
    setIsRunning(true);
  };

  const stopBreak = () => {
    setIsRunning(false);
    setIsBreak(false);
  };

  const start = () => {
    setRemainingSeconds(parseInt(selectedHours, 10) * 3600 + parseInt(selectedMinutes, 10) * 60 + parseInt(selectedSeconds, 10));
    setIsRunning(true);
  }

  const stop = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setRemainingSeconds(5);
    Animated.timing(circleSize, {
      toValue: 0,
      duration: 0,
      useNativeDriver: false,
    }).start();
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  const minuteOptions = AVAILABLE_MINUTES;

  const renderPicker = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.timePicker}>
        <Picker
          style={[styles.picker, { color: isDarkMode ? 'lightgray' : 'black' }]}
          itemStyle={[styles.pickerItem, { color: isDarkMode ? 'lightgray' : 'black' }]}
          selectedValue={selectedHours}
          onValueChange={itemValue => setSelectedHours(itemValue)}
          mode="dropdown"
          
        >
          {AVAILABLE_HOURS.map(value => (
            <Picker.Item key={value} label={value} value={value} />
          ))}
        </Picker>
        <Text style={[styles.pickerItem, { color: isDarkMode ? 'white' : 'black' }]}>hours</Text>
      </View>
      <View style={[styles.timePicker, { color: isDarkMode ? 'white' : 'black' }]}>
      
      <Picker
        style={[styles.picker, { color: isDarkMode ? 'lightgray' : 'black' }]}
        selectedValue={selectedMinutes}
        onValueChange={itemValue => setSelectedMinutes(itemValue)}
        mode="dropdown"
      >
  {minuteOptions.map(value => (
    <Picker.Item key={value} label={value} value={value} />
  ))}
</Picker>
        <Text style={[styles.pickerItem, { color: isDarkMode ? 'white' : 'black' }]}>minutes</Text>
      </View>
      <View style={styles.timePicker}>
        <Picker
          style={[styles.picker, { color: isDarkMode ? 'lightgray' : 'black' }]}
          itemStyle={[styles.pickerItem, { color: isDarkMode ? 'lightgray' : 'black' }]}
          selectedValue={selectedSeconds}
          onValueChange={itemValue => setSelectedSeconds(itemValue)}
          mode="dropdown"
        >
          {AVAILABLE_SECONDS.map(value => (
            <Picker.Item key={value} label={value} value={value} />
          ))}
        </Picker>
        <Text style={[styles.pickerItem, { color: isDarkMode ? 'white' : 'black' }]}>seconds</Text>
      </View>
      
    </ScrollView>
  );

  const { hours, minutes, seconds } = getRemaining(remainingSeconds);

  const circleSizeInterpolation = circleSize.interpolate({
    inputRange: [0, remainingSeconds],
    outputRange: ['0%', '100%'],
  });

  const circleStyles = {
    width: 0.5 * windowWidth,
    height: 0.5 * windowWidth,
    borderRadius: 0.25 * windowWidth,
    borderWidth: 2,
    borderColor: isDarkMode ? 'white' : 'black',
    backgroundColor: isDarkMode ? '#121212' : 'white',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  };

  const timerTextStyle = {
    fontSize: 24,
    fontWeight: 'bold',
    color: isDarkMode ? 'lightgray' : 'rgba(0,0,0,0.5)',
    position: 'absolute',
  };

  
    const navigation = useNavigation();
    const navigateToTipsScreen = () => {
      console.log('Navigating to Study Tips')
    navigation.navigate('Tips');
    };
  // Songs

  const songs = [
    { id: 0, name: 'Mental Energizer', path: require('../music/ADHD.mp3') },
    { id: 1, name: 'Rain', path: require('../music/GENTLE_RAIN.mp3')},
    { id: 2, name: 'Lofi Hip Hop', path: require('../music/lofi-hip-hop.mp3')}
  ];
  
  // Method to load sound based on path
  const loadSound = async (path) => {
    const { sound: newSound } = await Audio.Sound.createAsync(path);
    setSound(newSound);
  };
  const handleAudioPress = async (song) => {
        
      console.log('Song object:', song);
      if (!sound || selectedSong !== song) {
        if(sound){
          await sound.unloadAsync();
        }
          // Load the new selected song
          const newSound = new Audio.Sound();
          await newSound.loadAsync(song.path);
          setSelectedSong(song);
          setSound(newSound);
          await sound.playAsync(); // Play the newly loaded sound
          setIsPlaying(true);
      }else {
          if (isPlaying) {
             await sound.pauseAsync();
             
           } else {
             await sound.playAsync();
             
            }
            setIsPlaying(!isPlaying);
          }
          
    };
       
       
    useEffect(() => {
      const playSound = async () => {
        if (sound) {
          await sound.playAsync();
          setIsPlaying(true);
        }
      };
    
      playSound();
    
      return () => {
        if (sound) {
          sound.unloadAsync();
        }
      };
    }, [sound]);
    
  
  return (
    <ScrollView contentContainerStyle={[styles.container, {backgroundColor: isDarkMode ? '#121212' : 'white'}]}>
     <View style={styles.timerAndPickerContainer}>
      <View style={styles.timerContainer}>
        <Animated.View style={[circleStyles]}>
          <Animated.View style={[styles.innerCircle, { width: circleSizeInterpolation, height: circleSizeInterpolation }]} />
          <Text style={[timerTextStyle]}>{`${hours}:${minutes}:${seconds}`}</Text>
        </Animated.View>
      </View>
      {!isRunning && renderPicker()}
      <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={isRunning ? stop : start} style={[styles.button, { backgroundColor: isDarkMode ? 'black' : 'gray' }]}>
        <Text style={styles.buttonText}>{isRunning ? 'Stop' : 'Start'}</Text>
      </TouchableOpacity>

        <View style={styles.darkModeSwitchContainer}>
          <Text style={[styles.switchText, { color: isDarkMode ? 'white' : 'black' }]}>Dark Mode</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleDarkMode}
            value={isDarkMode}
          />
        </View>
        
      </View>
      {isBreak ? (
        <TouchableOpacity onPress={stopBreak}>
          <View style={styles.Comment}>
            <Text style={[styles.text, { color: isDarkMode ? 'white' : 'black' }]}>
              You will have 5 minutes break after the Study Timer you set!{'\n'}
              {'\n'}
              It's Time to relax! 
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigateToTipsScreen}>
          <View style={styles.Comment}>
            <Text style={[styles.text, { color: isDarkMode ? 'white' : 'black' }]}>
              If you feel stuck, try <Text style={{ fontWeight: 'bold' }}>Study Tips</Text>!{'\n'}
              {'\n'}
              GOOD LUCK! YOU CAN DO IT!
            </Text>
          </View>
        </TouchableOpacity>
      )}

     </View> 
     <View style={styles.musicPlayerContainer}>
        <Text style={[styles.text, { color: isDarkMode ? 'white' : 'black' }]}>If you feel like it can listen to productive music:</Text>{'\n'}
        <TouchableOpacity onPress={() => handleAudioPress(songs[0])} style={styles.musicPlayerButton}>
          <Text style={[styles.switchText, { color: isDarkMode ? 'white' : 'black' }]}>ADHD</Text>
          <Icon name={selectedSong === songs[0] && isPlaying ? 'pause' : 'play'} size={30} color={isDarkMode ? 'white' : 'black'} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() =>handleAudioPress(songs[1])} style={styles.musicPlayerButton}>
         <Text style={[styles.switchText, { color: isDarkMode ? 'white' : 'black' }]}>{'\n'}Rain</Text>
         <Icon name={selectedSong === songs[1] && isPlaying ? 'pause' : 'play'} size={30} color={isDarkMode ? 'white' : 'black'} />
        </TouchableOpacity>


        <TouchableOpacity onPress={() =>handleAudioPress(songs[2])} style={styles.musicPlayerButton}>
          <Text style={[styles.switchText, { color: isDarkMode ? 'white' : 'black' }]}>{'\n'}Lofi Hip Hop</Text>
          <Icon name={selectedSong === songs[2] && isPlaying ? 'pause' : 'play'} size={30} color={isDarkMode ? 'white' : 'black'} />
        </TouchableOpacity>
          
  
     </View>
     
    </ScrollView>
  );

};
export default StudyLounge;

const styles = StyleSheet.create({
  
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  timerAndPickerContainer: {
    position: 'relative',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  timerContainer: {
    alignItems:'center',
    marginBottom: 20,
  },
  innerCircle: {
    backgroundColor: 'transparent',
    borderRadius: 0.25 * windowWidth,
    position: 'absolute',
  },
  timePicker: {
    flexDirection: 'row',
    padding:2,
    alignItems: 'center',
    justifyContent:"flex-start",
    marginBottom: 10,
  },
  picker: {
    width: 50,
    height: 20,
  },
  pickerItem: {
    fontSize: 16,
  },
 
  darkModeSwitchContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:20,
    marginTop:20,
  },
  switchText:{
    fontSize:16,
    color: '#333',
  },
  musicPlayerContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  musicPlayerButton:{
    justifyContent:'center',
    alignItems:'center'
  }
  
});
