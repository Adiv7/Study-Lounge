import {ParentView,View, Text, FlatList, TextInput, StyleSheet, Button, Image, TouchableOpacity, Keyboard, Pressable, Dimensions} from "react-native";
import React, {useState, useEffect} from "react"
import {firebase} from "../config"; 
import {FontAwesome, fontAwesome} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import {Calendar, LocaleConfig} from 'react-native-calendars';


const { height } = Dimensions.get("window");
// const DashboardScreen = ({navigation}) => {
//     return(
//         <View style={styles.container}>
//             <Text style={styles.text}>DashboardScreen</Text>
            
//             <Button title="Toggle drawer" onPress={()=> navigation.toggleDrawer()}/>
//             <Button title="Settings" onPress={()=> navigation.jumpTo("Settings")}/>
//         </View>
//     );
// };
const Clock = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.clockContainer}>
            <Text style={styles.clockText}>{time}</Text>
            <Text style={styles.motivation}>Let's make 5 tasks today!</Text>
        </View>
    );
};

// const handleDayPress = (day) => {
//     const [selectedDate, setSelectedDate] = useState('');
//     setSelectedDate(day.dateString);


//   return (
//     <View style={{ flex: 1 }}>
//       <Text>My Event Notes</Text>
//       {/* Other content of your note page */}
//       <Calendar
//         markingType={'custom'}
//         markedDates={{
//           [selectedDate]: { customStyles: { container: { backgroundColor: 'orange', elevation: 2 }, text: { color: 'white' } } }
//         }}
//         onDayPress={handleDayPress}
//       />
//     </View>
//   );
// }
const DashboardScreen = () => {
    const [todos, setTodos] = useState([]);
    //firebase reference
    const todoRef = firebase.firestore().collection("todos");
    const [selectedDate, setSelectedDate] = useState('');
    const [addData,setAddData] = useState('');
    const navigation = useNavigation();

    //fetch or read the data from firestore
    useEffect(() => {
        todoRef
        .orderBy("createdAt", "desc")
        .onSnapshot(
            querySnapshot => {
                const todos = []
                querySnapshot.forEach((doc) => {
                    const{heading} = doc.data()
                    todos.push({
                        id:doc.id,
                        heading,
                    })
                })
                 setTodos(todos)
            }
        )
    }, [])

    //delete a todo from firestore db

    const deleteTodo = (todos) => {
        todoRef
            .doc(todos.id)
            .delete()
            .then(() => {
                //show a successful alert
                alert("Deleted Successfully")
            })
    }

    //add a todo
    const addTodo = () => {
        //check if we have a todo
        if (addData && addData.length >0){
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                heading: addData,
                deadline: selectedDate,
                createdAt: timestamp
            };
            todoRef
                .add(data)
                .then(() => {
                    setAddData("");
                    setSelectedDate("");
                    //release Keyboard
                    Keyboard.dismiss();
                })
                .catch((error) => {
                    alert(error);
                });
        } else {
            alert("Please select a date and enter a task");
        }

    };
   

    const handleDayPress = (day) => {
      setSelectedDate(day.dateString);
    };
    return (
        <View style={styles.parentView}>
            <Clock />
            <View style={styles.formContainer}>
                <TextInput
                    style= {styles.input}
                    placeholder=" Add a New Task"
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(heading) => setAddData(heading)}
                    value={addData}
                    underlineColorAndroid='transparent'
                    autoCapitalize='none'
                />
                <TouchableOpacity style={styles.button} onPress={addTodo}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
         <View style={{flex:1, height:height/2}}>
           <ScrollView style = {{flex:1}}> <FlatList
                data={todos}
                numColums={1}
                renderItem={({item}) => (
                    <View>
                        <Pressable
                            style={styles.container}
                            onPress={() => navigation.navigate("Detail", {item})}
                        >
                            <FontAwesome
                                name="trash-o"
                                color="red"
                                onPress={() => deleteTodo(item)}
                                styel={styles.todoIcon}
                            />
                            <View style={styles.innerContainer}>
                                <Text style={styles.itemHeading}>
                                    {item.heading[0].toUpperCase()+ item.heading.slice(1)} 
                                </Text>
                            </View>
                        </Pressable>
                    </View>
                )}
            />
            </ScrollView>
           
        </View>
        <Calendar
          style={styles.Calendar}
          markingType={'custom'}
          markedDates={{
            [selectedDate]: { customStyles: { container: { backgroundColor: 'orange', elevation: 2 }, text: { color: 'white' } } }
          }}
          onDayPress={handleDayPress}
        />
        </View>
    )
}

  
//     return (
//       <View style={{ flex: 1 }}>
//         <Calendar
//           markingType={'custom'}
//           markedDates={{
//             [selectedDate]: { customStyles: { container: { backgroundColor: 'orange', elevation: 2 }, text: { color: 'white' } } }
//           }}
//           onDayPress={handleDayPress}
//         />
//       </View>
//     );
   //};

export default DashboardScreen;

const styles = StyleSheet.create({
    parentView:{
        flex:1,
    },
    clockContainer:{
        
        alignContent: "flex-end",
        alignItems:"center"
    },
    clockText:{
        fontSize:26
    },
    motivation:{
        alignItems:"center",
        fontSize:30,
    },
    container: {
        backgroundColor:"#e5e5e5",
        padding:15,
        borderRadius:15,
        margin:5,
        marginHorizontal: 10,
        flex:1,
        flexDirection: "column",
       alignItems: 'flex-start',
        
    },
    innerContainer:{
        alignItems:"center",
        flexDirection:"column",
        marginLeft:45,
    },
    itemHeading:{
        frontWeight:"bold",
        fontSize:18,
        marginRight:22,
    },
    formContainer:{
        flexDirection:"row",
        height:80,
        marginLeft:10,
        marginRight:10,
        marginTop:100,
    },
    input:{
        height: 48,
        borderRadius:5,
        overflow:"hidden",
        backgroundColor:"white",
        paddingLeft:1,
        flex:1,
        marginRight:5,
    },
    button:{
        height:47,
        borderRadius:5,
        backgroundColor:"#788e",
        width:80,
        alignItems:"center",
        justifyContent:"center",
    },
    buttonText:{
        color: "white",
        fontSize:20
    },
    todoIcon:{
        marginTop:5,
        fontSize:20,
        marginLeft:14,
    },
   Calendar:{
    flex:1,
   }
});