import MapView, { Marker } from "react-native-maps"

const VehicleMap = ({ latitude, longitude, title, style }) => {
    return (
        <MapView
            initialRegion={{
                latitude,
                longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }}
            style={style}
        >
            <Marker
                coordinate={{
                    latitude,
                    longitude,
                }}
                title={title}
                useLegacyPinView={false}
            />
        </MapView>
    )
}

export default VehicleMap
