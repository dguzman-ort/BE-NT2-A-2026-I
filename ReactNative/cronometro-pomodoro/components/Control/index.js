import { View, Button } from 'react-native';
import styles from './styles';
import { useCronometro } from '../../hooks/useCronometro';


export default () => {

    const { isRunning, toggleRunning } = useCronometro()

    return (
        <>
            <View style={styles.buttonsContainer}>
                <Button title={ isRunning ? 'Pausar' : 'Iniciar'} onPress={toggleRunning} />
                <Button title="Reiniciar" onPress={() => { }} />
            </View>
        </>

    )
}