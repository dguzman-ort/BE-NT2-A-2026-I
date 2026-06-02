import { Ionicons } from "@expo/vector-icons"
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useAuth } from "../../hook/useAuth"

const OPTIONS = [
    { icon: "card-outline", label: "Payment methods", value: "2 cards" },
    { icon: "shield-checkmark-outline", label: "Verification", value: "Approved" },
    { icon: "heart-outline", label: "Favorites", value: "12 cars" },
    { icon: "settings-outline", label: "Preferences", value: "Edit" },
]

const ProfileOption = ({ option }) => (
    <View style={styles.optionRow}>
        <View style={styles.optionIcon}>
            <Ionicons name={option.icon} size={20} color="#006C49" />
        </View>
        <View style={styles.optionTextWrapper}>
            <Text style={styles.optionLabel}>{option.label}</Text>
            <Text style={styles.optionValue}>{option.value}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#76777D" />
    </View>
)

export default function Profile() {
    const { setAuth } = useAuth()
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.title}>Profile</Text>
                    <Text style={styles.subtitle}>Manage your LuxeDrive account.</Text>
                </View>

                <View style={styles.profileCard}>
                    <View style={styles.avatar}>
                        <Ionicons name="person" size={42} color="#0B1C30" />
                    </View>
                    <Text style={styles.name}>Daniel Martinez</Text>
                    <Text style={styles.email}>daniel@luxedrive.app</Text>
                    <Pressable style={styles.logoutButton}
                    onPress={() => {
                        setAuth(null)
                    }}
                    >
                        <Text style={styles.logoutButtonText}>Logout</Text>
                    </Pressable>
                </View>

                <View style={styles.optionsCard}>
                    {OPTIONS.map((option) => (
                        <ProfileOption key={option.label} option={option} />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#F8F9FF",
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 24,
        gap: 18,
    },
    header: {
        marginBottom: 2,
    },
    title: {
        color: "#0B1C30",
        fontSize: 32,
        lineHeight: 40,
        fontWeight: "800",
        letterSpacing: -0.6,
    },
    subtitle: {
        color: "#45464D",
        fontSize: 16,
        lineHeight: 24,
        marginTop: 4,
    },
    profileCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 22,
        alignItems: "center",
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 3,
    },
    avatar: {
        width: 84,
        height: 84,
        borderRadius: 42,
        backgroundColor: "#D3E4FE",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 14,
    },
    name: {
        color: "#0B1C30",
        fontSize: 22,
        lineHeight: 30,
        fontWeight: "800",
    },
    email: {
        color: "#45464D",
        fontSize: 14,
        lineHeight: 20,
        marginTop: 2,
    },
    memberBadge: {
        marginTop: 14,
        borderRadius: 999,
        paddingHorizontal: 14,
        paddingVertical: 8,
        backgroundColor: "#6CF8BB",
    },
    memberText: {
        color: "#00714D",
        fontSize: 12,
        lineHeight: 16,
        fontWeight: "800",
        textTransform: "uppercase",
        letterSpacing: 0.8,
    },
    optionsCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        paddingHorizontal: 16,
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 3,
    },
    optionRow: {
        minHeight: 68,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
        gap: 12,
    },
    optionIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#EFF4FF",
        alignItems: "center",
        justifyContent: "center",
    },
    optionTextWrapper: {
        flex: 1,
    },
    optionLabel: {
        color: "#0B1C30",
        fontSize: 16,
        lineHeight: 22,
        fontWeight: "700",
    },
    optionValue: {
        color: "#76777D",
        fontSize: 13,
        lineHeight: 18,
        marginTop: 2,
    },
})
