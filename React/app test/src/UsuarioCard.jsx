 import { View, Text, StyleSheet } from 'react-native'
 function UsuarioCard(nombre,edad,profesion){
    return (
        <View style = {styles.caja}>
            <Text>{nombre}</Text>
            <Text>{edad}</Text>
            <Text>{profesion}</Text>
        </View>
    )
 }

 const styles = StyleSheet.create({
  caja: { flex: 1, justifyContent: 'center', backgroundColor: 'pink' }
});