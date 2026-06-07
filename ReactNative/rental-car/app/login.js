import { useState } from "react"
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    Alert,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { Ionicons } from "@expo/vector-icons"
import { login } from "../services/authService"
import { useAuth } from "../hook/useAuth"

const COLORS = {
    surface: "#F8F9FF",
    card: "#FFFFFF",
    primary: "#131B2E",
    text: "#0B1C30",
    muted: "#76777D",
    outline: "#C6C6CD",
    accent: "#D3E4FE",
}

export default function Login() {
    const { setAuth } = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const handleLogin = () => {
        console.log('email', email)
        console.log('password', password)
        login(email, password).then((response) => {
            setAuth(response)
        }).catch((error) => {
            Alert.alert('Error', error.error)
        })
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="dark" />
            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.logoCircle}>
                        <Ionicons name="car-sport" size={36} color={COLORS.primary} />
                    </View>

                    <Text style={styles.brand}>LUXEDRIVE</Text>
                    <Text style={styles.title}>Inicia sesión</Text>
                    <Text style={styles.subtitle}>
                        Gestiona tus reservas y encuentra tu próximo vehículo.
                    </Text>

                    <View style={styles.form}>
                        <View style={styles.field}>
                            <Text style={styles.label}>Correo electrónico</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons
                                    name="mail-outline"
                                    size={20}
                                    color={COLORS.muted}
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    value={email}
                                    onChangeText={setEmail}
                                    placeholder="tu@email.com"
                                    placeholderTextColor={COLORS.muted}
                                    style={styles.input}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                            </View>
                        </View>

                        <View style={styles.field}>
                            <Text style={styles.label}>Contraseña</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons
                                    name="lock-closed-outline"
                                    size={20}
                                    color={COLORS.muted}
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholder="Ingresa tu contraseña"
                                    placeholderTextColor={COLORS.muted}
                                    style={styles.input}
                                    secureTextEntry={!showPassword}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                                <Pressable
                                    onPress={() => setShowPassword((currentValue) => !currentValue)}
                                    hitSlop={8}
                                >
                                    <Ionicons
                                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                                        size={20}
                                        color={COLORS.muted}
                                    />
                                </Pressable>
                            </View>
                        </View>

                        <Pressable style={styles.forgotButton} hitSlop={8}>
                            <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
                        </Pressable>

                        <Pressable 
                            style={styles.primaryButton}
                            onPress={() => handleLogin()}
                        >
                            <Text style={styles.primaryButtonText}>Ingresar</Text>
                        </Pressable>

                        <View style={styles.dividerRow}>
                            <View style={styles.divider} />
                            <Text style={styles.dividerText}>o</Text>
                            <View style={styles.divider} />
                        </View>

                        <Pressable style={styles.socialButton}>
                            <Ionicons name="logo-google" size={20} color={COLORS.text} />
                            <Text style={styles.socialButtonText}>Continuar con Google</Text>
                        </Pressable>

                        <Pressable style={styles.socialButton}>
                            <Ionicons name="logo-apple" size={22} color={COLORS.text} />
                            <Text style={styles.socialButtonText}>Continuar con Apple</Text>
                        </Pressable>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>¿No tienes una cuenta?</Text>
                        <Pressable hitSlop={8}>
                            <Text style={styles.footerLink}>Regístrate</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.surface,
    },
    flex: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 32,
        paddingBottom: 32,
    },
    logoCircle: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: COLORS.accent,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
    },
    brand: {
        marginTop: 16,
        textAlign: "center",
        color: COLORS.text,
        fontSize: 22,
        fontWeight: "900",
        letterSpacing: -0.5,
    },
    title: {
        marginTop: 24,
        color: COLORS.text,
        fontSize: 28,
        lineHeight: 34,
        fontWeight: "800",
    },
    subtitle: {
        marginTop: 8,
        color: COLORS.muted,
        fontSize: 15,
        lineHeight: 22,
        fontWeight: "500",
    },
    form: {
        marginTop: 28,
    },
    field: {
        marginBottom: 18,
    },
    label: {
        marginBottom: 8,
        color: COLORS.text,
        fontSize: 14,
        fontWeight: "700",
    },
    inputWrapper: {
        height: 56,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.outline,
        backgroundColor: COLORS.card,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: "100%",
        color: COLORS.text,
        fontSize: 16,
        fontWeight: "500",
    },
    forgotButton: {
        alignSelf: "flex-end",
        marginBottom: 24,
    },
    forgotText: {
        color: COLORS.primary,
        fontSize: 14,
        fontWeight: "700",
    },
    primaryButton: {
        height: 56,
        borderRadius: 16,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 12,
        elevation: 4,
    },
    primaryButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "800",
    },
    dividerRow: {
        marginVertical: 24,
        flexDirection: "row",
        alignItems: "center",
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.outline,
    },
    dividerText: {
        marginHorizontal: 12,
        color: COLORS.muted,
        fontSize: 13,
        fontWeight: "600",
    },
    socialButton: {
        height: 56,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.outline,
        backgroundColor: COLORS.card,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        marginBottom: 14,
    },
    socialButtonText: {
        color: COLORS.text,
        fontSize: 15,
        fontWeight: "700",
    },
    footer: {
        marginTop: 24,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
    },
    footerText: {
        color: COLORS.muted,
        fontSize: 14,
        fontWeight: "500",
    },
    footerLink: {
        color: COLORS.primary,
        fontSize: 14,
        fontWeight: "800",
    },
})
