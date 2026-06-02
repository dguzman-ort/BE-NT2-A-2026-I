import { StatusBar } from "expo-status-bar"
import { useEffect, useMemo, useState } from "react"
import { Alert, StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import Filters from "../../components/Filters"
import Header from "../../components/Header"
import HomeFlatList from "../../components/HomeFlatList"
import SearchBar from "../../components/SearchBar"
import { getVehiculos } from "../../services/vehiculos"

export default function Home() {
    const [vehiculos, setVehiculos] = useState([])
    const [query, setQuery] = useState("")
    const [categoria, setCategoria] = useState(null)

    useEffect(() => {
        getVehiculos().then((vehiculosResponse) => {
            setVehiculos(vehiculosResponse)
        }).catch((error) => {
            console.error('Error fetching vehicles:', error);
            Alert.alert('Error', error.message)
        })
    }, [])

    const vehiculosFiltrados = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase()

        return vehiculos.filter((vehiculo) => {
            const title = `${vehiculo.marca} ${vehiculo.modelo}`.toLowerCase()
            const matchesQuery = !normalizedQuery || title.includes(normalizedQuery)
            const matchesCategory = !categoria || vehiculo.categoria === categoria

            return matchesQuery && matchesCategory
        })
    }, [vehiculos, query, categoria])

    const listHeader = (
        <View>
            <SearchBar value={query} onChangeText={setQuery} />
            <Filters selected={categoria} onSelect={setCategoria} />
        </View>
    )

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="dark" />
            <Header />
            <HomeFlatList
                vehiculos={vehiculosFiltrados}
                ListHeaderComponent={listHeader}
                contentContainerStyle={styles.listContent}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#F8F9FF",
    },
    listContent: {
        paddingBottom: 24,
    },
})
