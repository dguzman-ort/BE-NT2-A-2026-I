import { Ionicons } from "@expo/vector-icons"
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { getBookings } from "../../services/vehiculos"
import { useEffect, useState } from "react"

// const BOOKINGS = [
//     {
//         id: "1",
//         vehicle: "Porsche Taycan",
//         date: "Jun 12 - Jun 16",
//         location: "Buenos Aires, Argentina",
//         status: "Confirmed",
//         price: "$1,200/day",
//     },
//     {
//         id: "2",
//         vehicle: "BMW X7 M60i",
//         date: "Jul 03 - Jul 05",
//         location: "Cordoba, Argentina",
//         status: "Pending",
//         price: "$850/day",
//     },
//     {
//         id: "3",
//         vehicle: "Mercedes S-Class",
//         date: "Aug 18 - Aug 22",
//         location: "Rosario, Argentina",
//         status: "Completed",
//         price: "$1,100/day",
//     },
// ]



const BookingCard = ({ booking }) => (
    <View style={styles.card}>
        <View style={styles.cardHeader}>
            <View>
                <Text style={styles.cardTitle}>{booking.vehicle}</Text>
                <Text style={styles.cardSubtitle}>{booking.price}</Text>
            </View>
            <View style={styles.statusChip}>
                <Text style={styles.statusText}>{booking.status}</Text>
            </View>
        </View>

        <View style={styles.metaRow}>
            <Ionicons name="calendar-outline" size={18} color="#76777D" />
            <Text style={styles.metaText}>{booking.date}</Text>
        </View>
        <View style={styles.metaRow}>
            <Ionicons name="location-outline" size={18} color="#76777D" />
            <Text style={styles.metaText}>{booking.location}</Text>
        </View>
    </View>
)

export default function Bookings() {
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        getBookings().then((bookings) => {
            setBookings(bookings)
        }).catch((error) => {
            console.error('Error fetching bookings:', error);
            Alert.alert('Error', error.message)
        })
    }, [])
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.title}>Bookings</Text>
                    <Text style={styles.subtitle}>Your upcoming and past reservations.</Text>
                </View>

                {bookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                ))}
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
        gap: 16,
    },
    header: {
        marginBottom: 8,
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
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 3,
        gap: 10,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 12,
    },
    cardTitle: {
        color: "#0B1C30",
        fontSize: 20,
        lineHeight: 28,
        fontWeight: "800",
    },
    cardSubtitle: {
        color: "#006C49",
        fontSize: 14,
        lineHeight: 20,
        fontWeight: "700",
        marginTop: 2,
    },
    statusChip: {
        borderRadius: 999,
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: "#6CF8BB",
    },
    statusText: {
        color: "#00714D",
        fontSize: 12,
        lineHeight: 16,
        fontWeight: "800",
    },
    metaRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    metaText: {
        color: "#45464D",
        fontSize: 14,
        lineHeight: 20,
        fontWeight: "600",
    },
})
