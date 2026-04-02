import {NavigationContainer} from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/MapScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
export default function App() {
      return (
          <NavigationContainer>
            <Tab.Navigator id={"1"}>
              <Tab.Screen name="Home" component={HomeScreen} options={{
                  tabBarIcon: ({ color, size }) => (
                      <Ionicons name="home" size={size} color={color} />
                  ),
              }}/>
              <Tab.Screen name="Map" component={MapScreen} options={{
                  tabBarIcon: ({ color, size }) => (
                      <Ionicons name="map" size={size} color={color} />
                  ),
              }}/>
            </Tab.Navigator>
          </NavigationContainer>
      );
}