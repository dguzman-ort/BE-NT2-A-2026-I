import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
// import { vehiculos } from '../services/vehiculos';
const Details = () => {

    const { id } = useLocalSearchParams();

    console.log(id);
    // const vehiculo = vehiculos.find((vehiculo) => vehiculo.id === id);
    return (
        <View>
            <Text>Detalles del vehículo {id}</Text>
        </View>
    )
}

export default Details;