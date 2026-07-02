import { Marker } from "react-native-maps";

export default function RestaurantMarker({ item, onSelect, markerRef }) {
    return (
        <Marker
            ref={markerRef}
            coordinate={{
                latitude: item.lat,
                longitude: item.lng,
            }}
            onPress={() => onSelect(item)}
        />
    );
}