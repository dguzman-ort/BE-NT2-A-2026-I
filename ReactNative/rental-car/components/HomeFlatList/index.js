import { View, Text, FlatList } from "react-native"
import Vehiculo from "../Vehiculo"

const HomeFlatList = ({ vehiculos }) => {
    
    return (
        <FlatList 
            data={vehiculos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Vehiculo vehiculo={item} />}
        />
    ) 
}

export default HomeFlatList
