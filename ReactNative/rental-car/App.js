import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScrollView from './components/HomeScrollView';
import HomeFlatList from './components/HomeFlatList';
import { vehiculos } from './services/vehiculos';




export default function App() {
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
