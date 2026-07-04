export const lightTheme = {
    background: "#f1f1f1",
    text: "#000",
    card: "#f5f5f5",
    border: "#ddd",
};

export const darkTheme = {
    background: "#333",
    text: "#fff",
    card: "#1e1e1e",
    border: "#333",
};

export const lightMapStyle = [];

export const darkMapStyle = [
    // Algemene achtergrond
    {
        elementType: "geometry",
        stylers: [{ color: "#333" }],
    },

    // Tekst (lichtgrijs voor leesbaarheid)
    {
        elementType: "labels.text.fill",
        stylers: [{ color: "#8a8a8a" }],
    },
    {
        elementType: "labels.text.stroke",
        stylers: [{ color: "#1d1d1d" }],
    },

    // 🚗 Wegen
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#2c2c2c" }],
    },
    {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1a1a1a" }],
    },

    // Snelwegen
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#3a3a3a" }],
    },

    // Labels op wegen
    {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9a9a9a" }],
    },

    // 🌳 Landschap / land
    {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [{ color: "#181818" }],
    },

    // 🌊 Water
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#000000" }],
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#4a4a4a" }],
    },
];