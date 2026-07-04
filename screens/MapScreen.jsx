import {StyleSheet, View} from "react-native";
import MapView from "react-native-maps";
import {useContext, useEffect, useRef, useState} from "react";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {fetchData} from "../utils/fetcher";
import RestaurantMarker from "../components/RestaurantMarker";
import RestaurantCard from "../components/RestaurantCard";
import {useRoute} from "@react-navigation/native";
import {ThemeContext} from "../contexts/ThemeContext";
import {darkMapStyle} from "../contexts/themes";

function MapScreen() {
    const mapRef = useRef(null);
    const [location, setLocation] = useState(null);
    const [restaurants, setRestaurants] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const fetchUrl = "https://raw.githubusercontent.com/ThijsVanLoo1/restaurant-hotspots/main/restaurants.json?";
    const route = useRoute();
    const markerRefs = useRef({});
    const {theme, darkMode} = useContext(ThemeContext);
    const INITIAL_REGION = {
        latitude: 51.7550,
        longitude: 4.1680,
        latitudeDelta: 0.075,
        longitudeDelta: 0.075,
    };

    //Ask permission & view own location
    async function getCurrentLocation() {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return;
        }

        await Location.watchPositionAsync(
            {
                accuracy: Location.Accuracy.High,
                distanceInterval: 10,
            },
            (loc) => {
                setLocation(loc.coords);
            }
        );

        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc.coords);
    }

    async function toggleFavorite(id) {
        try {
            let updated = [];

            if (favorites.includes(id)) {
                updated = favorites.filter(fav => fav !== id);
            } else {
                updated = [...favorites, id];
            }

            setFavorites(updated);
            await AsyncStorage.setItem("favorites", JSON.stringify(updated));
        } catch (e) {
            console.log(e);
        }
    }

    async function loadFavorites() {
        try {
            const data = await AsyncStorage.getItem("favorites");
            if (data !== null) {
                setFavorites(JSON.parse(data));
            }
        } catch (e) {
            console.log(e);
        }
    }

    async function loadRestaurants() {
        try {
            // Laadt eerst restaurants uit AsyncStorage
            const cached = await AsyncStorage.getItem("restaurants");

            if (cached !== null) {
                setRestaurants(JSON.parse(cached));
            }

            // Altijd proberen te refreshen als internet er is
            const data = await fetchData(fetchUrl);

            // Nieuwe data tonen en opnieuw opslaan in AsyncStorage
            setRestaurants(data);
            await AsyncStorage.setItem("restaurants", JSON.stringify(data));

            // Geen internet (of crash)
        } catch (e) {
            console.log("Offline mode actief of error:", e);
        }
    }

    useEffect(() => {
        getCurrentLocation();
        loadFavorites();
        loadRestaurants();
    }, []);

    useEffect(() => {
        if (!selectedRestaurant || !mapRef.current) return;

        mapRef.current.animateToRegion({
            latitude: selectedRestaurant.lat,
            longitude: selectedRestaurant.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        }, 500);

        const marker = markerRefs.current[selectedRestaurant.id];
        if (marker?.showCallout) {
            marker.showCallout();
        }
    }, [selectedRestaurant]);

    useEffect(() => {
        const restaurant = route.params?.restaurant;
        if (!restaurant || !mapRef.current) return;

        setSelectedRestaurant(restaurant);
        mapRef.current.animateToRegion({
            latitude: restaurant.lat,
            longitude: restaurant.lng,
            latitudeDelta: 0.08,
            longitudeDelta: 0.08,
        }, 500);

        setTimeout(() => {
            mapRef.current.animateToRegion({
                latitude: restaurant.lat,
                longitude: restaurant.lng,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }, 600);
        }, 600);
    }, [route.params]);

    return (
        <View style={[styles.screen, {backgroundColor: theme.background}]}>
            <MapView ref={mapRef} style={styles.map}
                     customMapStyle={darkMode ? darkMapStyle : []}
                     initialRegion={INITIAL_REGION}
                     showsUserLocation={true}>
                {restaurants.map((item) => (
                    <RestaurantMarker
                        key={item.id}
                        item={item}
                        onSelect={setSelectedRestaurant}
                        markerRef={(ref) => {
                            markerRefs.current[item.id] = ref;
                        }}
                    />
                ))}
            </MapView>
            {selectedRestaurant && (
                <RestaurantCard
                    restaurant={selectedRestaurant}
                    favorites={favorites}
                    onToggleFavorite={toggleFavorite}
                    onClose={() => setSelectedRestaurant(null)}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});

export default MapScreen;