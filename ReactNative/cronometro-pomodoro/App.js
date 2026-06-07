import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { vibrate } from './utils';
import Constants from 'expo-constants';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * Importamos nuestros componentes
 */
import Cronometro from './components/Cronometro';
import Control from './components/Control';
import { CronometroProvider } from './hooks/useCronometro';

// console.log(Constants.statusBarHeight);

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      

      <CronometroProvider>
        <Cronometro />
        <Control />
      </CronometroProvider>
      
      
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center'
    paddingTop: Constants.statusBarHeight
  }
});
