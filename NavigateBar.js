import {View, Text, FlatList, TextInput, StyleSheet, Button, Image, TouchableOpacity, Keyboard, Pressable} from "react-native";


const NavigateBar = ({navigation}) => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>DashboardScreen</Text>
            
            <Button title="Toggle drawer" onPress={()=> navigation.toggleDrawer()}/>
            <Button title="Settings" onPress={()=> navigation.jumpTo("Settings")}/>
        </View>
    );
};
export default NavigateBar;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:"center",
        jstifyContent:"center",
    },
    text: {
        fontSize: 24,
        fontWeoight:"bold",
        marginBottom: 16,
    },
});