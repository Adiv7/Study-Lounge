import "react-native-gesture-handler";
import { NavigationContainer} from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator} from "@react-navigation/stack";
import React from "react"
import About from "./screens/About";
import NavigateBar from "./NavigateBar";
// import { createClient} from 'fire@react-native-firebase';
import { SessionContextProvider} from "@react-native-firebase/auth";

import Tips from "./screens/Tips";
import LeitnerSystem from './screens/LeitnerSystem';
import StudyLounge from "./screens/StudyLounge";
import Notes from "./screens/Notes";
import SettingsScreen from "./screens/SettingsScreen";


// const firebase = createClient(
//     "https://console.firebase.google.com/project/study-lounge-52aad/settings/general/web:ZGVmN2U2MWItMGI3Zi00YmIxLTg1MGEtZjQ2ZDkxM2ExMjhm",
//     " AIzaSyAcEQrZ7d6ew-FnRt0Lx6PabyH77rJO67w"
// )
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


export default function App(){
    return(
        <NavigationContainer>
                <DrawerStack/>
                
        </NavigationContainer>
        
    );
}


    function DrawerStack() {
        return(
            <Drawer.Navigator
                drawerContentOptions={{
                    ActiveTintColor:"#333",
                    ActiveBackgroundColor: "Lightblue",
                    ContentContainerStyle: {
                        backgroundColor:"#c6cbef",
                    },
                }}
            >
               <Drawer.Screen 
                name="Notes" 
                component={Notes} 
                options={{
                    title: "Notes",
                    drawerLabel: "Tasks",
                   
                }}

                />
               <Drawer.Screen
                 name="Study Tips"
                 component={Tips}
                    options={{
                        drawerLabel:"Study Tips"
                    }}
                />
               <Drawer.Screen
                 name="SudyLounge"
                 component={StudyLounge}
                    options={{
                        drawerLabel:"Study Lounge"
                    }}
                />
               

                    <Drawer.Screen
                     name="Settings" 
                     component={SettingsScreen}
                     options={{
                     drawerLabel:"Settings",
                    }}
                    />

                <Drawer.Screen
                 name="About"
                 component={About}
                    options={{
                        drawerLabel:"About"
                    }}
                />
                <Drawer.Screen
                name="LeitnerSystem"
                component={LeitnerSystem}
                options={{
                    drawerLabel: () => null // Hide this screen from the drawer
                }}
            />

            </Drawer.Navigator>
        
    );
}
