import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>HomeScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    textStyle: {
        color: '#000'
    }
})
