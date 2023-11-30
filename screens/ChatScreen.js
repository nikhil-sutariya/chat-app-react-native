import React, { useEffect } from 'react'
import { Text, View, Image, StyleSheet, ScrollView } from 'react-native'

const ChatScreen = ({ route, navigation }) => {
    
    // Create function that connect webhook and create room for this conversation 
    // Call converation api for chat history

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
              <View style={styles.headerView}>
                <Image
                  style={styles.headerImage}
                  source={{ uri: route.params.profile_picture }}
                />
                <Text style={styles.headerTitle}>{route.params.first_name} {route.params.last_name}</Text>
              </View>
            ),
        })

    }, [])

    return (
        // Display chat history in interactive ui
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#fff' }}>
            <Text>ChatScreen</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    headerView: {
        flexDirection: 'row', 
        alignItems: 'center',
        marginLeft: -10
    },
    headerImage: {
        width: 35, 
        height: 35, 
        borderRadius: 15,
        marginRight: 10
    },
    headerTitle: {
        color: "#fff",
        fontSize: 20,
        fontFamily: "JosefinSans-Regular",
    }
})

export default ChatScreen