import {View, Text, FlatList, StyleSheet} from "react-native";
import {useContext, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchData } from "../utils/fetcher";
import {useNavigation} from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import {ThemeContext} from "../contexts/ThemeContext";

export default function FavoritesScreen() {
    const [favorites, setFavorites] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const navigation = useNavigation();
    const fetchUrl = "https://raw.githubusercontent.com/ThijsVanLoo1/restaurant-hotspots/main/restaurants.json";
    const { theme } = useContext(ThemeContext);

    // Haal data uit de AsyncStorage
    async function loadData() {
        try {
            // Haal id's van favorite restaurants op
            const favs = await AsyncStorage.getItem("favorites");
            const parsedFavs = favs ? JSON.parse(favs) : [];
            setFavorites(parsedFavs);

            // Haal alle restaurants op
            const data = await fetchData(fetchUrl);
            setRestaurants(data);
        } catch (e) {
            console.log(e);
        }
    }

    // Filter door alle restaurants en vergelijk id's
    const favoriteRestaurants = restaurants.filter(r =>
        favorites.includes(r.id)
    );

    // Wordt uitgevoerd elke keer dat het scherm wordt geopend
    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    return (
        <View style={[styles.screen, { backgroundColor: theme.background }]}>
            <View style={styles.listContainer}>
                <FlatList
                    data={favoriteRestaurants}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.listItem}>
                            <View style={styles.left}>
                                <Text style={{ fontWeight: "bold", color: theme.text }}>{item.name}</Text>
                                <Text style={{color: theme.text}}>{item.category} • ⭐ {item.rating}</Text>
                                <Text style={{color: theme.text}}>Open: {item.hours}</Text>
                            </View>
                            <View style={styles.right}>
                                <Text style={[styles.button, { color: theme.text}]} onPress={() => {
                                        navigation.navigate("Map", {restaurant: item});
                                    }}
                                >
                                    Bekijk op kaart
                                </Text>
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    listContainer: {
        margin: 20,
    },

    listItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 12,
        marginVertical: 8,
        borderBottomWidth: 1,
        borderColor: "#eee",
    },

    left: {
        flex: 1,
    },

    right: {
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 10,
    },

    button: {
        color: "blue",
        fontWeight: "bold",
        padding: 10,
    },
});