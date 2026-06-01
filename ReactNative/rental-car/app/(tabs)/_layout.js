import { Tabs } from "expo-router"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"

const COLORS = {
    surface: "#F8F9FF",
    active: "#131B2E",
    inactive: "#76777D",
    outlineVariant: "#C6C6CD",
}

const getIcon = (routeName, color, size) => {
    if (routeName === "index") {
        return <Ionicons name="compass-outline" size={size} color={color} />
    }

    if (routeName === "bookings") {
        return <MaterialCommunityIcons name="calendar-text-outline" size={size} color={color} />
    }

    if (routeName === "profile") {
        return <Ionicons name="person-outline" size={size} color={color} />
    }

    return <Ionicons name="help-circle-outline" size={size} color={color} />
}

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: COLORS.active,
                tabBarInactiveTintColor: COLORS.inactive,
                tabBarStyle: {
                    height: 80,
                    paddingTop: 8,
                    paddingBottom: 10,
                    backgroundColor: COLORS.surface,
                    borderTopColor: COLORS.outlineVariant,
                    borderTopWidth: 1,
                    shadowColor: "#0F172A",
                    shadowOffset: { width: 0, height: -4 },
                    shadowOpacity: 0.08,
                    shadowRadius: 12,
                    elevation: 8,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    lineHeight: 16,
                    fontWeight: "700",
                },
                tabBarIcon: ({ color, size }) => getIcon(route.name, color, size),
            })}
        >
            <Tabs.Screen name="index" options={{ title: "Explore" }} />
            <Tabs.Screen name="bookings" options={{ title: "Bookings" }} />
            <Tabs.Screen name="profile" options={{ title: "Profile" }} />
            <Tabs.Screen name="support" options={{ title: "Support" }} />
        </Tabs>
    )
}
