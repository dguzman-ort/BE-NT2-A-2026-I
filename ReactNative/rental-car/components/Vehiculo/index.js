import { View, Text, Image, StyleSheet, Pressable } from "react-native"
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons"
import { useEffect } from "react"

const formatPrecio = (precio) => {
    return Number(precio).toLocaleString("en-US")
}

const Feature = ({ icon, label }) => {
    return (
        <View style={styles.feature}>
            {icon}
            <Text style={styles.featureText}>{label}</Text>
        </View>
    )
}

const Vehiculo = ({ vehiculo }) => {

    // useEffect(() => {
    //     console.log("Monta el componente vehiculo - ID: ", vehiculo.id)

    //     return () => {
    //         console.log("Desmonta el componente vehiculo - ID: ", vehiculo.id)
    //     }
    // }, [])

    return (
        <View style={styles.card}>
            <View style={styles.imageWrapper}>
                <Image source={{ uri: vehiculo.imagen }} style={styles.image} />
                <View style={styles.yearBadge}>
                    <Text style={styles.yearText}>{vehiculo.anio}</Text>
                </View>
            </View>

            <View style={styles.body}>
                <View style={styles.titleRow}>
                    <Text style={styles.title} numberOfLines={1}>
                        {vehiculo.marca} {vehiculo.modelo}
                    </Text>
                    <View style={styles.priceColumn}>
                        <Text style={styles.price}>${formatPrecio(vehiculo.precio)}</Text>
                        <Text style={styles.priceUnit}>/day</Text>
                    </View>
                </View>

                <View style={styles.colorRow}>
                    <Feather name="tag" size={15} color="#6B7280" />
                    <Text style={styles.colorText}>{vehiculo.color}</Text>
                </View>

                <View style={styles.separator} />

                <View style={styles.featuresRow}>
                    <Feature
                        icon={<Ionicons name="flash" size={16} color="#6B7280" />}
                        label="Electric"
                    />
                    <Feature
                        icon={<MaterialCommunityIcons name="car-seat" size={16} color="#6B7280" />}
                        label="4 Seats"
                    />
                    <Feature
                        icon={<Feather name="refresh-cw" size={15} color="#6B7280" />}
                        label="Auto"
                    />
                </View>

                <Pressable style={styles.rentButton}>
                    <Text style={styles.rentText}>Rent Now</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: 345,
        backgroundColor: "#FFF",
        borderRadius: 16,
        marginHorizontal: 16,
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.12,
        shadowRadius: 10,
        elevation: 4,
    },
    imageWrapper: {
        height: 190,
        overflow: "hidden",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        position: "relative",
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    yearBadge: {
        position: "absolute",
        top: 12,
        right: 12,
        backgroundColor: "#FFF",
        borderRadius: 999,
        paddingHorizontal: 14,
        paddingVertical: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.12,
        shadowRadius: 4,
        elevation: 2,
    },
    yearText: {
        color: "#4B5563",
        fontSize: 14,
        fontWeight: "700",
    },
    body: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 14,
    },
    titleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 12,
    },
    title: {
        flex: 1,
        color: "#374151",
        fontSize: 20,
        fontWeight: "800",
    },
    priceColumn: {
        alignItems: "flex-end",
    },
    price: {
        color: "#374151",
        fontSize: 20,
        fontWeight: "800",
    },
    priceUnit: {
        color: "#6B7280",
        fontSize: 14,
        fontWeight: "600",
        marginTop: 2,
    },
    colorRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginTop: 8,
    },
    colorText: {
        color: "#6B7280",
        fontSize: 14,
        fontWeight: "600",
        textTransform: "capitalize",
    },
    separator: {
        height: 1,
        backgroundColor: "#E5E7EB",
        marginTop: 14,
        marginBottom: 12,
    },
    featuresRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 14,
    },
    feature: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    featureText: {
        color: "#6B7280",
        fontSize: 14,
        fontWeight: "700",
    },
    rentButton: {
        backgroundColor: "#10B981",
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: "center",
        justifyContent: "center",
    },
    rentText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "800",
    },
})

export default Vehiculo