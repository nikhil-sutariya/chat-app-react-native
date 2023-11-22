import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const UsersScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>UsersScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        color: '#000'
    }
})
