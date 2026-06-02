import { Ionicons } from "@expo/vector-icons"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const FAQS = [
    {
        question: "How do I change a booking?",
        answer: "Open Bookings, choose your reservation and request an update from the rental partner.",
    },
    {
        question: "What documents do I need?",
        answer: "A valid driver license, ID and payment method are required before pickup.",
    },
    {
        question: "Can I add insurance?",
        answer: "Yes. Coverage options can be selected during checkout or requested from support.",
    },
]

const ContactCard = ({ icon, title, subtitle }) => (
    <View style={styles.contactCard}>
        <View style={styles.contactIcon}>
            <Ionicons name={icon} size={22} color="#006C49" />
        </View>
        <View style={styles.contactText}>
            <Text style={styles.contactTitle}>{title}</Text>
            <Text style={styles.contactSubtitle}>{subtitle}</Text>
        </View>
    </View>
)

export default function Support() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.title}>Support</Text>
                    <Text style={styles.subtitle}>Quick help for reservations and account questions.</Text>
                </View>

                <View style={styles.contactGrid}>
                    <ContactCard
                        icon="chatbubble-ellipses-outline"
                        title="Live chat"
                        subtitle="Usually replies in 5 min"
                    />
                    <ContactCard
                        icon="call-outline"
                        title="Call support"
                        subtitle="+54 11 5555 0199"
                    />
                </View>

                <View style={styles.faqCard}>
                    <Text style={styles.sectionTitle}>Frequently asked</Text>
                    {FAQS.map((faq) => (
                        <View key={faq.question} style={styles.faqItem}>
                            <Text style={styles.question}>{faq.question}</Text>
                            <Text style={styles.answer}>{faq.answer}</Text>
                        </View>
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
    contactGrid: {
        gap: 12,
    },
    contactCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 3,
    },
    contactIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#6CF8BB",
        alignItems: "center",
        justifyContent: "center",
    },
    contactText: {
        flex: 1,
    },
    contactTitle: {
        color: "#0B1C30",
        fontSize: 18,
        lineHeight: 24,
        fontWeight: "800",
    },
    contactSubtitle: {
        color: "#45464D",
        fontSize: 14,
        lineHeight: 20,
        marginTop: 2,
    },
    faqCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 3,
    },
    sectionTitle: {
        color: "#0B1C30",
        fontSize: 20,
        lineHeight: 28,
        fontWeight: "800",
        marginBottom: 8,
    },
    faqItem: {
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: "#E5E7EB",
    },
    question: {
        color: "#0B1C30",
        fontSize: 16,
        lineHeight: 22,
        fontWeight: "800",
    },
    answer: {
        color: "#45464D",
        fontSize: 14,
        lineHeight: 20,
        marginTop: 4,
    },
})
