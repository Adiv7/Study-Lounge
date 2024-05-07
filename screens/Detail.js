import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import {firebase} from "../config";
import {useNavigation} from "@react-navigation/native";
const Detail = ({route}) => {
    const todoRef = firebase.firestore().collection("todos");
    const [textHeading, onChangeHeadingText] = useState(route.params.item.name);
    const  navigation = useNavigation();

    const updateTodo = () => {
        if(textHeading && textHeading.lenght > 0){
            todoRef
            .doc(route.params.item.id)
            .update({
                heading: textHeading,
            }).then(() => {
                navigation.navigate("DashboardScreen")
            }).catch((error) => {
                alert(error.message)
            })
        }
    }
    return (
        <View style={StyleSheet.container}>
            <TextInput
                style={style.textField}
                onChangeText={onChangeHeadingText}
                value={textHeading}
                placeholder='Update To do List'
            />
            <Pressable
                style={styles.buttonUpdate}
                onPress={() => {updateTodo()}}
            >
                <Text>UPDTAE TO DO LIST</Text>
            </Pressable>
        </View>
    )
}

export default Detail

const styles = StyleSheet.create({
    container:{
        marginTop:80,
        marginLeft:15,
        marginRight:15,
    },
    textField:{
        marginBottom:10,
        padding:10,
        fontSize:15,
        color:"#000000",
        backgroundColor:"#e0e0e0",
        borderRadius:5
    },
    buttonUpdate:{
        marginTop:25,
        alignItems:"center",
        justidyContent:"center",
        paddingVertical:12,
        paddingHorizontal:32,
        borderRadius:4,
        elevation:10,
        backgroundColor:"#0de065",
    }
})