import { View, Text } from 'react-native';
import styles from './styles';
import { useEffect, useRef, useState } from 'react';
import constants from './constants';
import { useCronometro } from '../../hooks/useCronometro';
import { vibrate } from '../../utils';

const minToSec = (minutes) => minutes * 60
const padZero = (num) => num < 10 ? `0${num}`: num

export default () => {

    const { isRunning, isWorking, toggleWorking } = useCronometro()
    const [remainingTime, setRemainingTime] = useState(minToSec(constants.WORK_TIME))

    const interval = useRef(null)

    useEffect(() => {
        if (isRunning){
            interval.current = setInterval(()=>{
                setRemainingTime(prev => prev - 1)
            }, 1000)

            return () => clearInterval(interval.current)
        }else{
            clearInterval(interval.current)
        }
    }, [isRunning])

    useEffect(() => {
        if (remainingTime <= 0){
            vibrate()
            console.log('Llegamos aca', isWorking)
            setRemainingTime(isWorking ? minToSec(constants.BREAK_TIME) : minToSec(constants.WORK_TIME))
            toggleWorking()
        }

    }, [remainingTime])


    const minutes = Math.floor(remainingTime /60)
    const secs = remainingTime % 60

    return (
        <>
            <Text style={styles.title}>{ isWorking ? 'Tiempo de Trabajo': 'Tiempo de descanso'}</Text>
            <View>
                <Text style={styles.timeText}>{padZero(minutes)}:{padZero(secs)}</Text>
            </View>
        </>

    )
}