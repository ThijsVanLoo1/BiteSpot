import {createContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {lightMapStyle, darkMapStyle, darkTheme, lightTheme} from "./themes";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(false);
    const [loading, setLoading] = useState(true);

    const theme = darkMode ? darkTheme : lightTheme;
    const mapStyle = darkMode ? darkMapStyle : lightMapStyle;

    // Haal theme op uit AsyncStorage
    useEffect(() => {
        async function loadTheme() {
            try {
                const saved = await AsyncStorage.getItem("darkMode");

                if (saved !== null) {
                    setDarkMode(JSON.parse(saved));
                }
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        }

        loadTheme();
    }, []);

    // Zet theme in AsyncStorage
    useEffect(() => {
        AsyncStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [darkMode]);

    // Voorkomt flikkeren van scherm bij laden
    if(loading) {
        return null;
    }

    return (
        <ThemeContext.Provider value={{ darkMode, setDarkMode, theme, mapStyle }}>
            {children}
        </ThemeContext.Provider>
    );
}