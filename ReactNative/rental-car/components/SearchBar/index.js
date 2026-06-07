import { StyleSheet, TextInput, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const SearchBar = ({ value, onChangeText }) => {
    return (
        <View style={styles.container}>
            <Ionicons name="search" size={24} color="#76777D" style={styles.icon} />
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder="Search for your next ride..."
                placeholderTextColor="#76777D"
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="search"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 56,
        marginHorizontal: 20,
        marginTop: 24,
        marginBottom: 12,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#C6C6CD",
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
    },
    icon: {
        marginLeft: 16,
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: "100%",
        paddingRight: 16,
        color: "#0B1C30",
        fontSize: 16,
        lineHeight: 24,
        fontWeight: "500",
    },
})

export default SearchBar
