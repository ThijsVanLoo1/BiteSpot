import {useContext} from "react";
import {ThemeContext} from "../contexts/ThemeContext";
import {NavigationContainer} from "@react-navigation/native";
import {Ionicons} from '@expo/vector-icons';
import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import SettingsScreen from "../screens/SettingsScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();
export default function MainNavigator() {
    const {theme, darkMode} = useContext(ThemeContext);

    return (
        <NavigationContainer>
            <Tab.Navigator id={"1"} screenOptions={{
                tabBarStyle: {
                    backgroundColor: theme.card,
                    borderTopColor: theme.border,
                },
                tabBarActiveTintColor: darkMode ? "#fff" : "#000",
                tabBarInactiveTintColor: "#888",
                headerStyle: {
                    backgroundColor: theme.card,
                },
                headerTintColor: theme.text,
            }}>
                <Tab.Screen name="Home" component={HomeScreen} options={{
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="home" size={size} color={color}/>
                    ),
                }}/>
                <Tab.Screen name="Map" component={MapScreen} options={{
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="map" size={size} color={color}/>
                    ),
                }}/>
                <Tab.Screen name="Favorites" component={FavoritesScreen} options={{
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="heart" size={size} color={color}/>
                    ),
                }}/>
                <Tab.Screen name="Settings" component={SettingsScreen} options={{
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="settings" size={size} color={color}/>
                    ),
                }}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}