import React, { useState, useEffect } from 'react'
import { Alert, SafeAreaView, ScrollView, Image, StyleSheet, AsyncStorage } from 'react-native'
import socketIo from 'socket.io-client'

import logo from '../assets/logo.png'
import SpotList from '../components/SpotList'

export default function List() {
    const [techs, setTechs] = useState([])

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketIo('http://192.168.15.6:3333', { 
                query: { user_id }
            })

            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva na ${booking.spot.conpany} em ${booking.date} foi ${booking.approved ? 'ACEITA' : 'RECUSADA'}`) 
            })
        })

    }, [])

    useEffect(() => {AsyncStorage.getItem('techs').then(techsSaved =>{
        const techsList = techsSaved.split(',').map(tech => tech.trim())

        setTechs(techsList)
    })}, [])

    return (
        <SafeAreaView styleSheet={styles.container}>
            <Image source={logo} style={styles.logo} alt="logo" />
            
            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    
    logo: {
        height: 32,
        resizeMode: "contain",
        alignSelf: 'center',
        marginTop: 30,
    }
})