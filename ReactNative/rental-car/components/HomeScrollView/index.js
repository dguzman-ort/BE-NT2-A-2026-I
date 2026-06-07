import { View, Text, ScrollView } from "react-native"
import Vehiculo from "../Vehiculo"

const HomeScrollView = ({ vehiculos }) => {
    
    return (
        <ScrollView>
            {
                vehiculos.map((vehiculo) => {
                    return (
                        <Vehiculo key={vehiculo.id} vehiculo={vehiculo} />
                    )
                })
                
            }
        </ScrollView>
    )
}

export default HomeScrollView
