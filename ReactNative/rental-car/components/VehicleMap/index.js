import { Ionicons } from "@expo/vector-icons"
import { StyleSheet, Text, View } from "react-native"

const VehicleMap = ({ locationName, title, style }) => {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.marker}>
                <Ionicons name="location-sharp" size={28} color="#006C49" />
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.location}>{locationName}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#D3E4FE",
    },
    marker: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 3,
    },
    title: {
        color: "#0B1C30",
        fontSize: 18,
        lineHeight: 24,
        fontWeight: "800",
    },
    location: {
        color: "#45464D",
        fontSize: 14,
        lineHeight: 20,
        marginTop: 4,
    },
})

export default VehicleMap
