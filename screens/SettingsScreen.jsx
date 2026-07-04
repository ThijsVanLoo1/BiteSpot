import {Switch, View, StyleSheet} from "react-native";
import {ThemeContext} from "../contexts/ThemeContext";
import {useContext} from "react";

export default function SettingsScreen() {
    const { theme, darkMode, setDarkMode } = useContext(ThemeContext);

    function toggleSwitch() {
        setDarkMode(!darkMode);
    }

    return(
        <View style={[styles.screen, { backgroundColor: theme.background }]}>
            <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                onValueChange={toggleSwitch}
                value={darkMode}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
});