import {Text, View} from "react-native";
import {StyleSheet} from "react-native";
import FavoriteButton from "./FavoriteButton";
import {useContext} from "react";
import {ThemeContext} from "../contexts/ThemeContext";

export default function RestaurantCard({ restaurant, favorites, onToggleFavorite, onClose }) {
    const { theme } = useContext(ThemeContext);

    return(
        <View style={[styles.bottomCard, {backgroundColor: theme.background}]}>
            <View style={styles.flexbox}>
                <Text style={[styles.title, {color: theme.text}]}>{restaurant.name}</Text>

                <Text style={{color: theme.text}}>{restaurant.category} • ⭐ {restaurant.rating}</Text>

                <Text style={{color: theme.text}}>Open: {restaurant.hours}</Text>
            </View>

            <View style={styles.actions}>
                <FavoriteButton isFavorite={favorites.includes(restaurant.id)} onPress={() => onToggleFavorite(restaurant.id)}/>

                <Text onPress={onClose} style={{ marginTop: 10, color: theme.text }}>
                    Sluiten
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bottomCard: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "white",
        padding: 16,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    left: {
        flex: 1,
    },

    right: {
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 12,
    },

    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 6,
    },

    text: {
        marginBottom: 4,
    },

    favorite: {
        fontSize: 25,
    },

    actions: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },

    close: {
        color: "blue",
    }
});
