import {StyleSheet, View} from "react-native";
import MapView, {Marker} from "react-native-maps";
import {useEffect, useRef, useState} from "react";
import * as Location from "expo-location";
import { fetchData } from "../utils/fetcher";

function MapScreen() {
    const mapRef = useRef(null);
    const [location, setLocation] = useState(null);
    const [restaurants, setRestaurants] = useState([]);

    //Ask permission & view own location
    async function getCurrentLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync();
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

    useEffect(() => {
        getCurrentLocation();
        //Fetch data from Github raw link
        (async () => {
            const restaurants = await fetchData("https://raw.githubusercontent.com/ThijsVanLoo1/restaurant-hotspots/main/restaurants.json");
            setRestaurants(restaurants);
        })();
    }, []);

    return(
        <View>
            <MapView
                ref={mapRef}
                style={styles.map}
                region={{
                    latitude: location ? location.latitude : 51.91737,
                    longitude: location ? location.longitude : 4.48477,
                    latitudeDelta: 0.075,
                    longitudeDelta: 0.075
                }}
                showsUserLocation={true}>
                {restaurants.map((item) => (
                    <Marker
                        key={item.id}
                        coordinate={{ latitude: item.lat, longitude: item.lng }}
                        title={item.name}
                        description={`${item.category} • ⭐ ${item.rating} • Open: ${item.hours}`}
                        onPress={() => {
                            mapRef.current.animateToRegion({
                                latitude: item.lat,
                                longitude: item.lng,
                                latitudeDelta: 0.005,
                                longitudeDelta: 0.005,
                            }, 500);
                        }}
                    />
                ))}
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});

export default MapScreen;