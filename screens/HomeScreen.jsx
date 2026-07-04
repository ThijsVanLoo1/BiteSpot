import {StyleSheet, Text, View} from "react-native";
import {ThemeContext} from "../contexts/ThemeContext";
import {useContext} from "react";

function HomeScreen() {
    const { theme } = useContext(ThemeContext);

    return(
        <View style={[styles.screen, { backgroundColor: theme.background}]}>
            <Text style={{ color: theme.text }}>Ik ben de home screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
});

export default HomeScreen;