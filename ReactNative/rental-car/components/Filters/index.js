import { Pressable, ScrollView, StyleSheet, Text } from "react-native"

const CATEGORIAS = ["Luxury", "SUV", "Sedan", "Electric", "Sports"]

const Filters = ({ selected, onSelect }) => {
    const handlePress = (categoria) => {
        onSelect(selected === categoria ? null : categoria)
    }

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            {CATEGORIAS.map((categoria) => {
                const isActive = selected === categoria

                return (
                    <Pressable
                        key={categoria}
                        onPress={() => handlePress(categoria)}
                        style={[styles.chip, isActive && styles.chipActive]}
                    >
                        <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                            {categoria}
                        </Text>
                    </Pressable>
                )
            })}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 4,
        paddingBottom: 14,
        gap: 10,
    },
    chip: {
        minWidth: 96,
        paddingHorizontal: 22,
        paddingVertical: 12,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: "#C6C6CD",
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
    },
    chipActive: {
        borderColor: "#6CF8BB",
        backgroundColor: "#6CF8BB",
    },
    chipText: {
        color: "#45464D",
        fontSize: 16,
        lineHeight: 22,
        fontWeight: "600",
    },
    chipTextActive: {
        color: "#00714D",
    },
})

export default Filters
