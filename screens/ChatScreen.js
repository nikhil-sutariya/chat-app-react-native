import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, TextInput, TouchableOpacity, Text, View, Image, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native'
import { WS_URL } from '@env';
import useAuth from '../hooks/useAuth';
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { getConversationDetails } from "../src/actions/ConversationDetailsAction"

const ChatScreen = ({ route, navigation }) => {
    const [ws, setWs] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const [user, setUser] = useState(null);
    
    const { userDetails } = useAuth()
    const dispatch = useDispatch()
    const isFocused = useIsFocused()

    const { messages } = useSelector(state => state.messages);

    const handleSubmit = () => {
        if (ws && message) {
            let data = {
                "message": message
            }
            data = JSON.stringify(data)
            ws.send(data);
        }
        setMessage(null)
    };

    const webScoketConnection = async (e) => {
        const user = await userDetails()
        setUser(user)
        dispatch(getConversationDetails(user.accessToken))
        const socket = new WebSocket(`${WS_URL}/chat/${user.phone}-${route.params.phone}?token=${user.accessToken}`);

        socket.onopen = () => {
            console.log("Connction successfull.")
            setWs(socket);
        };

        socket.onmessage = e => {
            console.log(e.data);
        };

        socket.onerror = e => {
            console.log(e.message);
        };

        socket.onclose = e => {
            console.log(e.code, e.reason);
        };
        setLoading(false)
    }

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.headerView}>
                    <Image
                        style={styles.headerImage}
                        source={{ uri: 'receiver' in route.params ? route.params.receiver.profile_picture : route.params.profile_picture }}
                    />
                    <Text style={styles.headerTitle}>{'receiver' in route.params ? `${route.params.receiver.first_name} ${route.params.receiver.last_name}` : `${route.params.first_name} ${route.params.last_name}`}</Text>
                </View>
            ),
        })
        webScoketConnection()
    }, [isFocused])

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#fff' }} keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <View style={styles.container}>
                    {loading ? (
                        <View style={styles.loaderContainer}>
                            <ActivityIndicator size="large" color="#9f5914" />
                        </View>
                    ) : (
                        <View style={styles.contentContainer}>
                            {messages.map((e, index) => 
                                <View key={index} 
                                    style={[styles.messageContainer, e.sender.id === user.userId ? styles.senderMessage : styles.receiverMessage]}>
                                    <Text style={styles.messageText}>{e.message}</Text>
                                </View>
                            )}
                        </View>
                    )}
                    <View style={styles.textContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder='Type message here'
                            onChangeText={(e) => setMessage(e)}
                            placeholderTextColor={"#fff"}
                            selectionColor='#fff'
                        />
                        <TouchableOpacity disabled={message !== null ? false : true} style={styles.sendButton} onPress={handleSubmit}>
                            <MaterialIcon name="send" style={styles.sendIcon} size={20} color={"#fff"} />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
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
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    contentContainer: {

    },
    messageContainer: {
        width: 200,
        // borderTopStartRadius: 1,
        // borderTopEndRadius: 7,
        // borderBottomEndRadius: 7,
        // marginStart: 10
    },
    senderMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#DCF8C6',
        marginEnd: 5
    },
    receiverMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#DCF8C6',
        marginStart: 5
    },
    messageText: {
        color: '#000'
    },
    container: {
        flex: 1
    },
    textContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        marginHorizontal: 15,
    },
    input: {
        borderBottomWidth: 0.7,
        paddingVertical: 7,
        borderWidth: 1,
        borderRadius: 50,
        borderColor: "#9f5914",
        marginVertical: 10,
        fontSize: 15,
        fontFamily: 'JosefinSans-Regular',
        backgroundColor: "#9f5914",
        color: "#fff",
        width: 275,
        paddingStart: 20
    },
    sendButton: {
        backgroundColor: '#9f5914',
        width: 44,
        height: 44,
        marginTop: 10,
        marginStart: 10,
        borderRadius: 50
    },
    sendIcon: {
        marginStart: 13.5,
        marginTop: 11
    }
})

export default ChatScreen