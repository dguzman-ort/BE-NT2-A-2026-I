import { FlatList, StyleSheet, Text, View } from "react-native"
import Vehiculo from "../Vehiculo"

const HomeFlatList = ({ vehiculos, ListHeaderComponent, contentContainerStyle }) => {
    
    return (
        <FlatList 
            data={vehiculos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Vehiculo vehiculo={item} />}
            ListHeaderComponent={ListHeaderComponent}
            ListEmptyComponent={
                <View style={styles.emptyState}>
                    <Text style={styles.emptyTitle}>No se encontraron vehiculos</Text>
                    <Text style={styles.emptyText}>Proba con otra busqueda o cambia el filtro.</Text>
                </View>
            }
            contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
        />
    ) 
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 110,
    },
    emptyState: {
        marginHorizontal: 20,
        marginTop: 48,
        padding: 24,
        borderRadius: 16,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 3,
    },
    emptyTitle: {
        color: "#0B1C30",
        fontSize: 20,
        lineHeight: 28,
        fontWeight: "800",
        textAlign: "center",
    },
    emptyText: {
        color: "#45464D",
        fontSize: 14,
        lineHeight: 20,
        marginTop: 6,
        textAlign: "center",
    },
})

export default HomeFlatList
