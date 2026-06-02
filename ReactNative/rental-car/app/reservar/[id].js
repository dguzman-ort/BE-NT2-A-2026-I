import DateTimePicker from "@react-native-community/datetimepicker"
import { Ionicons } from "@expo/vector-icons"
import { router, useLocalSearchParams } from "expo-router"
import { useMemo, useState } from "react"
import {
    ActivityIndicator,
    Alert,
    Image,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { bookVehicle } from "../../services/vehiculos"

const COLORS = {
    surface: "#F8F9FF",
    onSurface: "#0B1C30",
    onSurfaceVariant: "#45464D",
    outline: "#76777D",
    outlineVariant: "#C6C6CD",
    primary: "#000000",
    secondary: "#006C49",
    surfaceContainer: "#E5EEFF",
    surfaceContainerLow: "#EFF4FF",
    surfaceContainerLowest: "#FFFFFF",
    surfaceDim: "#CBDBF5",
}

const DEFAULT_PICKUP_HOUR = 10

const formatPrecio = (precio) => {
    return Number(precio).toLocaleString("en-US")
}

const buildDateAtPickupTime = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), DEFAULT_PICKUP_HOUR, 0, 0)
}

const addDays = (date, days) => {
    return buildDateAtPickupTime(new Date(date.getFullYear(), date.getMonth(), date.getDate() + days))
}

const formatDisplayDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    }).format(date)
}

const formatApiDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")

    return `${year}-${month}-${day}`
}

const getParamValue = (value) => {
    return Array.isArray(value) ? value[0] : value
}

export default function ReservarVehiculo() {
    const params = useLocalSearchParams()
    const vehicleId = getParamValue(params.id)
    const marca = getParamValue(params.marca)
    const modelo = getParamValue(params.modelo)
    const precio = getParamValue(params.precio)
    const imagen = getParamValue(params.imagen)

    const initialStartDate = useMemo(() => buildDateAtPickupTime(new Date()), [])
    const initialEndDate = useMemo(() => addDays(initialStartDate, 3), [initialStartDate])

    const [startDate, setStartDate] = useState(initialStartDate)
    const [endDate, setEndDate] = useState(initialEndDate)
    const [showPicker, setShowPicker] = useState(null)
    const [loading, setLoading] = useState(false)

    const vehicleName = [marca, modelo].filter(Boolean).join(" ") || "Vehiculo seleccionado"
    const pickerValue = showPicker === "end" ? endDate : startDate

    const handleDateChange = (event, selectedDate) => {
        if (Platform.OS === "android") {
            setShowPicker(null)
        }

        if (event?.type === "dismissed" || !selectedDate) {
            return
        }

        const nextDate = buildDateAtPickupTime(selectedDate)

        if (showPicker === "start") {
            setStartDate(nextDate)
            setEndDate((currentEndDate) => {
                return currentEndDate < nextDate ? addDays(nextDate, 1) : currentEndDate
            })
            return
        }

        setEndDate(nextDate < startDate ? startDate : nextDate)
    }

    const handleConfirmBooking = async () => {
        if (!vehicleId) {
            Alert.alert("Error", "No se pudo identificar el vehiculo seleccionado.")
            return
        }

        if (endDate < startDate) {
            Alert.alert("Fechas invalidas", "La fecha de fin debe ser igual o posterior a la fecha de inicio.")
            return
        }

        setLoading(true)

        try {
            await bookVehicle(Number(vehicleId), formatApiDate(startDate), formatApiDate(endDate))

            Alert.alert("Reserva confirmada", "Tu reserva fue creada correctamente.", [
                {
                    text: "Ver reservas",
                    onPress: () => router.replace("/(tabs)/bookings"),
                },
            ])
        } catch (error) {
            console.error("Error confirming booking:", error)
            Alert.alert("Error", error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Pressable style={styles.headerButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
                </Pressable>

                <Text style={styles.headerTitle}>Reservar Vehiculo</Text>

                <Pressable style={styles.avatarButton}>
                    <Ionicons name="person" size={22} color={COLORS.onSurface} />
                </Pressable>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.summaryCard}>
                    <View style={styles.imageWrapper}>
                        {!!imagen && <Image source={{ uri: imagen }} style={styles.image} />}
                    </View>

                    <View style={styles.summaryBody}>
                        <Text style={styles.summaryLabel}>VEHICULO SELECCIONADO</Text>
                        <Text style={styles.vehicleName} numberOfLines={1}>
                            {vehicleName}
                        </Text>
                        <View style={styles.priceRow}>
                            <Text style={styles.price}>${formatPrecio(precio)}</Text>
                            <Text style={styles.priceUnit}>/ dia</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Detalles de Alquiler</Text>

                    <View style={styles.dateCard}>
                        <Pressable style={styles.dateColumn} onPress={() => setShowPicker("start")}>
                            <Text style={styles.dateLabel}>Desde</Text>
                            <Text style={styles.dateValue}>{formatDisplayDate(startDate)}</Text>
                        </Pressable>

                        <View style={styles.arrowWrapper}>
                            <Ionicons name="arrow-forward" size={20} color={COLORS.outlineVariant} />
                        </View>

                        <Pressable
                            style={[styles.dateColumn, styles.dateColumnRight]}
                            onPress={() => setShowPicker("end")}
                        >
                            <Text style={styles.dateLabel}>Hasta</Text>
                            <Text style={styles.dateValue}>{formatDisplayDate(endDate)}</Text>
                        </Pressable>
                    </View>

                    {showPicker && (
                        <View style={styles.pickerWrapper}>
                            <DateTimePicker
                                value={pickerValue}
                                mode="date"
                                display={Platform.OS === "ios" ? "spinner" : "default"}
                                minimumDate={showPicker === "end" ? startDate : new Date()}
                                onChange={handleDateChange}
                            />

                            {Platform.OS === "ios" && (
                                <Pressable style={styles.doneButton} onPress={() => setShowPicker(null)}>
                                    <Text style={styles.doneButtonText}>Listo</Text>
                                </Pressable>
                            )}
                        </View>
                    )}
                </View>
            </ScrollView>

            <View style={styles.bottomBar}>
                <Pressable
                    style={[styles.confirmButton, loading && styles.confirmButtonDisabled]}
                    onPress={handleConfirmBooking}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <>
                            <Ionicons name="shield-checkmark" size={20} color="#FFFFFF" />
                            <Text style={styles.confirmText}>Confirmar Reserva</Text>
                        </>
                    )}
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.surface,
    },
    header: {
        height: 64,
        paddingHorizontal: 20,
        backgroundColor: COLORS.surface,
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
    headerButton: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
    },
    headerTitle: {
        flex: 1,
        color: COLORS.primary,
        fontSize: 20,
        lineHeight: 28,
        fontWeight: "800",
        marginHorizontal: 8,
    },
    avatarButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.surfaceContainer,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    scrollView: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 132,
        gap: 24,
    },
    summaryCard: {
        backgroundColor: COLORS.surfaceContainerLowest,
        borderRadius: 12,
        padding: 16,
        flexDirection: "row",
        gap: 16,
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 3,
    },
    imageWrapper: {
        width: "32%",
        aspectRatio: 1.75,
        borderRadius: 8,
        overflow: "hidden",
        backgroundColor: COLORS.surfaceDim,
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    summaryBody: {
        flex: 1,
        justifyContent: "center",
    },
    summaryLabel: {
        color: COLORS.onSurfaceVariant,
        fontSize: 12,
        lineHeight: 16,
        fontWeight: "700",
        letterSpacing: 0.8,
    },
    vehicleName: {
        color: COLORS.primary,
        fontSize: 20,
        lineHeight: 28,
        fontWeight: "800",
    },
    priceRow: {
        flexDirection: "row",
        alignItems: "baseline",
        gap: 4,
        marginTop: 2,
    },
    price: {
        color: COLORS.secondary,
        fontSize: 20,
        lineHeight: 28,
        fontWeight: "800",
    },
    priceUnit: {
        color: COLORS.onSurfaceVariant,
        fontSize: 14,
        lineHeight: 20,
        fontWeight: "500",
    },
    section: {
        gap: 12,
    },
    sectionTitle: {
        color: COLORS.primary,
        fontSize: 20,
        lineHeight: 28,
        fontWeight: "800",
        paddingHorizontal: 4,
    },
    dateCard: {
        backgroundColor: COLORS.surfaceContainerLowest,
        borderWidth: 1,
        borderColor: COLORS.outlineVariant,
        borderRadius: 12,
        padding: 16,
        minHeight: 76,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
    },
    dateColumn: {
        flex: 1,
        gap: 2,
    },
    dateColumnRight: {
        alignItems: "flex-end",
    },
    dateLabel: {
        color: COLORS.onSurfaceVariant,
        fontSize: 12,
        lineHeight: 16,
        fontWeight: "500",
    },
    dateValue: {
        color: COLORS.onSurface,
        fontSize: 16,
        lineHeight: 22,
        fontWeight: "800",
    },
    arrowWrapper: {
        paddingHorizontal: 14,
    },
    pickerWrapper: {
        backgroundColor: COLORS.surfaceContainerLowest,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.outlineVariant,
        overflow: "hidden",
    },
    doneButton: {
        paddingVertical: 12,
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: COLORS.outlineVariant,
    },
    doneButtonText: {
        color: COLORS.secondary,
        fontSize: 16,
        lineHeight: 24,
        fontWeight: "800",
    },
    bottomBar: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 96,
        paddingHorizontal: 20,
        paddingTop: 8,
        paddingBottom: 16,
        backgroundColor: COLORS.surface,
        justifyContent: "center",
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 20,
        elevation: 8,
    },
    confirmButton: {
        height: 56,
        borderRadius: 8,
        backgroundColor: COLORS.secondary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 4,
    },
    confirmButtonDisabled: {
        opacity: 0.7,
    },
    confirmText: {
        color: "#FFFFFF",
        fontSize: 16,
        lineHeight: 24,
        fontWeight: "800",
    },
})
