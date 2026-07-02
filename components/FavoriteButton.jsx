import { Text } from "react-native";

export default function FavoriteButton({ isFavorite, onPress }) {
    return (
        <Text onPress={onPress} style={{ fontSize: 32 }}>
            {isFavorite ? "❤️" : "🤍"}
        </Text>
    );
}