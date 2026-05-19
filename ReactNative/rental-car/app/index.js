import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScrollView from '../components/HomeScrollView';
import HomeFlatList from '../components/HomeFlatList';
import { getVehiculos } from '../services/vehiculos';
import { useState, useEffect } from 'react';

export default function App() {
  const [vehiculos, setVehiculos] = useState([]);
  useEffect(() => {
    getVehiculos().then((vehiculos) => {
      setVehiculos(vehiculos);
    });
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* Listado con scrollView */}
      {/* <HomeScrollView vehiculos={vehiculos}  /> */}


      {/* Listado con FlatList */}
      <HomeFlatList vehiculos={vehiculos} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
