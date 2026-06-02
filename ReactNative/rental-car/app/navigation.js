import { Stack } from "expo-router"
import { useAuth } from "../hook/useAuth"

export default function Navigation() {
    const { auth } = useAuth()
    const isLoggedIn = auth !== null
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Protected guard={isLoggedIn}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="vehiculo/[id]" />
                <Stack.Screen name="reservar/[id]" />
            </Stack.Protected>

            <Stack.Protected guard={!isLoggedIn}>
                <Stack.Screen name="login" />
            </Stack.Protected>
        </Stack>
    )
}