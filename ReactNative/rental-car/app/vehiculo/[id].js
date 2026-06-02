import {
    ScrollView,
    View,
    Text,
    Image,
    Pressable,
    StyleSheet,
    useWindowDimensions,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { getVehiculoById } from '../../services/vehiculos'; 
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import VehicleMap from '../../components/VehicleMap';


const formatPrecio = (precio) => {
    return Number(precio).toLocaleString("en-US");
}
const COLORS = {
    surface: '#F8F9FF',
    onSurface: '#0B1C30',
    onSurfaceVariant: '#45464D',
    outline: '#76777D',
    primary: '#000000',
    secondary: '#006C49',
    surfaceContainerLowest: '#FFFFFF',
    surfaceContainerHighest: '#D3E4FE',
    cta: '#10B981',
};

const SPECS = [
    {
        icon: <MaterialCommunityIcons name="speedometer" size={24} color={COLORS.secondary} />,
        label: 'Velocidad Máx.',
        value: '260 km/h',
    },
    {
        icon: <Ionicons name="timer-outline" size={24} color={COLORS.secondary} />,
        label: '0-100 km/h',
        value: '2.8s',
    },
    {
        icon: <MaterialCommunityIcons name="ev-station" size={24} color={COLORS.secondary} />,
        label: 'Autonomía',
        value: '450 km',
    },
    {
        icon: <Ionicons name="flash" size={24} color={COLORS.secondary} />,
        label: 'Potencia',
        value: '750 hp',
    },
];

const SpecCard = ({ icon, label, value }) => (
    <View style={styles.specCard}>
        {icon}
        <View>
            <Text style={styles.specLabel}>{label}</Text>
            <Text style={styles.specValue}>{value}</Text>
        </View>
    </View>
);

const VehiculoDetalle = () => {
    const [vehiculo, setVehiculo] = useState(null);


    const { width } = useWindowDimensions();
    const heroHeight = (width * 3) / 4;

    const { id } = useLocalSearchParams();

    useEffect(() => {
        getVehiculoById(Number(id)).then((vehiculo) => {
            setVehiculo(vehiculo);
        });
    }, [id]);

    if (!vehiculo) {
        return (
            <View style={styles.safeArea}>
                <Text>Cargando...</Text>
            </View>
        );
    }
    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Top App Bar */}
            <View style={styles.header}>
                <Pressable style={styles.headerButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
                </Pressable>
                <Text style={styles.headerTitle}>{vehiculo?.marca} {vehiculo?.modelo}</Text>
                <Pressable style={styles.headerButton}>
                    <Feather name="share-2" size={22} color={COLORS.primary} />
                </Pressable>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Hero */}
                <View style={[styles.heroWrapper, { height: heroHeight }]}>
                    <Image source={{ uri: vehiculo?.imagen }} style={styles.heroImage} />
                </View>

                {/* Content */}
                <View style={styles.content}>
                    {/* Title & Price */}
                    <View style={styles.titleRow}>
                        <View style={styles.titleColumn}>
                            <Text style={styles.fleetLabel}>ELITE FLEET</Text>
                            <Text style={styles.displayTitle}>{vehiculo?.marca} {vehiculo?.modelo}</Text>
                        </View>
                        <View style={styles.priceColumn}>
                            <Text style={styles.price}>${formatPrecio(vehiculo?.precio)}</Text>
                            <Text style={styles.priceUnit}>por día</Text>
                        </View>
                    </View>

                    {/* Specs Grid */}
                    <View style={styles.specsGrid}>
                        {SPECS.map((spec) => (
                            <SpecCard
                                key={spec.label}
                                icon={spec.icon}
                                label={spec.label}
                                value={spec.value}
                            />
                        ))}
                    </View>

                    {/* Description */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Descripción de lujo</Text>
                        <Text style={styles.description}>
                            Experimente el futuro de la conducción con el Porsche Taycan. Este sedán
                            deportivo totalmente eléctrico combina el rendimiento legendario de Porsche
                            con una tecnología innovadora y un diseño aerodinámico sofisticado. Un
                            interior minimalista pero opulento le rodea en su viaje más silencioso y
                            emocionante hasta la fecha.
                        </Text>
                    </View>

                    {/* Location */}
                    <View style={styles.section}>
                        <View style={styles.locationHeader}>
                            <Text style={styles.sectionTitle}>Ubicación del vehículo</Text>
                            <View style={styles.locationChip}>
                                <Ionicons name="location-sharp" size={16} color={COLORS.secondary} />
                                <Text style={styles.locationText}>{vehiculo?.location}</Text>
                            </View> 
                        </View>

                        {/* Map placeholder */}
                        <View style={styles.mapPlaceholder}>
                            <VehicleMap
                                latitude={vehiculo?.latitude}
                                longitude={vehiculo?.longitude}
                                title={vehiculo?.casa_rental}
                                locationName={vehiculo?.location}
                                style={styles.map}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom CTA */}
            <View style={styles.ctaContainer}>
                <Pressable
                    style={styles.ctaButton}
                    onPress={() =>
                        router.push({
                            pathname: '/reservar/[id]',
                            params: {
                                id: vehiculo.id,
                                marca: vehiculo.marca,
                                modelo: vehiculo.modelo,
                                precio: vehiculo.precio,
                                imagen: vehiculo.imagen,
                            },
                        })
                    }
                >
                    <Text style={styles.ctaText}>Reservar Ahora</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.surface,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        height: 64,
        backgroundColor: COLORS.surface,
    },
    headerButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 20,
        lineHeight: 28,
        fontWeight: '600',
        color: COLORS.primary,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 110,
    },
    heroWrapper: {
        width: '100%',
        overflow: 'hidden',
        backgroundColor: COLORS.surfaceContainerHighest,
    },
    heroImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    content: {
        paddingHorizontal: 20,
        marginTop: 24,
        gap: 24,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    titleColumn: {
        flex: 1,
        marginRight: 12,
    },
    fleetLabel: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '500',
        letterSpacing: 2,
        color: COLORS.secondary,
        textTransform: 'uppercase',
    },
    displayTitle: {
        fontSize: 28,
        lineHeight: 36,
        fontWeight: '700',
        letterSpacing: -0.5,
        color: COLORS.onSurface,
        marginTop: 4,
    },
    priceColumn: {
        alignItems: 'flex-end',
    },
    price: {
        fontSize: 20,
        lineHeight: 28,
        fontWeight: '600',
        color: COLORS.secondary,
    },
    priceUnit: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '500',
        color: COLORS.outline,
    },
    specsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    specCard: {
        width: '47%',
        backgroundColor: COLORS.surfaceContainerLowest,
        borderRadius: 12,
        padding: 12,
        minHeight: 100,
        justifyContent: 'space-between',
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 3,
    },
    specLabel: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '500',
        color: COLORS.outline,
        marginTop: 8,
    },
    specValue: {
        fontSize: 20,
        lineHeight: 28,
        fontWeight: '600',
        color: COLORS.onSurface,
    },
    section: {
        gap: 8,
    },
    sectionTitle: {
        fontSize: 20,
        lineHeight: 28,
        fontWeight: '600',
        color: COLORS.onSurface,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: COLORS.onSurfaceVariant,
    },
    locationHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 8,
    },
    locationChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    locationText: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '500',
        color: COLORS.secondary,
    },
    mapPlaceholder: {
        height: 256,
        borderRadius: 12,
        backgroundColor: COLORS.surfaceContainerHighest,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 4,
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 3,
    },
    mapPlaceholderText: {
        fontSize: 14,
        color: COLORS.outline,
        fontWeight: '500',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    ctaContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        paddingBottom: 16,
        paddingTop: 8,
        backgroundColor: 'transparent',
    },
    ctaButton: {
        backgroundColor: COLORS.cta,
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 4,
    },
    ctaText: {
        color: '#FFFFFF',
        fontSize: 20,
        lineHeight: 28,
        fontWeight: '600',
    },
});

export default VehiculoDetalle;
