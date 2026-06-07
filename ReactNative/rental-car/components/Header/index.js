import { Pressable, StyleSheet, Text, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const Header = () => {
    return (
        <View style={styles.header}>
            <Pressable style={styles.avatarButton}>
                <Ionicons name="person" size={22} color="#0B1C30" />
            </Pressable>

            <Text style={styles.title}>LUXEDRIVE</Text>

            <Pressable style={styles.iconButton}>
                <Ionicons name="notifications-outline" size={28} color="#0B1C30" />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 76,
        width: "100%",
        paddingHorizontal: 20,
        backgroundColor: "#F8F9FF",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
        zIndex: 10,
    },
    avatarButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#D3E4FE",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    title: {
        color: "#000000",
        fontSize: 28,
        lineHeight: 34,
        fontWeight: "900",
        letterSpacing: -1,
    },
    iconButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
    },
})

export default Header
