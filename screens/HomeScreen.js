import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, ScrollView, RefreshControl, Text, View, ActivityIndicator, TouchableHighlight, Image } from 'react-native'
import useAuth from '../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { getConversationList } from '../src/actions/ConversationListAction';

export const HomeScreen = () => {
    const [userData, setUserData] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const { userDetails } = useAuth()
    const dispatch = useDispatch()
    const isFocused = useIsFocused()
    const navigation = useNavigation()

    const { conversations, loading } = useSelector(state => state.conversations);
    const noContact = require('../assets/images/no-contact.jpg')
    
    const getConversations = async () => {
        const user = await userDetails()
        setUserData(user)
        if (user !== null) {
            if (conversations && conversations.length == 0) {
                dispatch(getConversationList(user.accessToken))
            }
        }
    }

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        const user = await userDetails()
        if (user !== null) {
            dispatch(getConversationList(user.accessToken))
        }
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    useEffect(() => {
        getConversations()
    }, [isFocused])

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#fff' }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            {loading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            ) : (
                <>
                    {conversations && conversations.length > 0 ? (
                        conversations.map((e, index) =>
                            <TouchableHighlight key={index} underlayColor='#f2f2f2' style={styles.contactDetail} onPress={() => navigation.navigate("Chatroom", e)} >
                                <View style={{ flexDirection: "row" }}>
                                    <Image
                                        style={styles.image}
                                        source={{ uri: e.receiver.profile_picture }}
                                    />
                                    <View>
                                        <Text style={styles.username}>{`${e.receiver.first_name} ${e.receiver.last_name}`}</Text>
                                        <Text style={styles.bio}>{e.last_massage.slice(0, 60)}</Text>
                                    </View>
                                    <Text style={styles.timestamp}>{e.timestamp}</Text>
                                </View>
                            </TouchableHighlight>
                        )
                    ) : (
                        <View style={styles.container}>
                            <Image
                                style={styles.noContactImage}
                                source={noContact}
                            />
                            <Text style={styles.noContact}>No conversation's yet.</Text>
                        </View>
                    )}
                </>
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fcf2e8'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        top: -50
    },
    noContact: {
        color: '#9f5914', 
        fontFamily: 'JosefinSans-SemiBold',
        fontSize: 18
    },
    contactDetail: {
        backgroundColor: "#fff",
        padding: 10,
        borderBottomColor: '#000000'
    },
    noContactImage: {
        height: 200,
        width: 250
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 50
    },
    username: {
        paddingStart: 18,
        fontSize: 18,
        fontFamily: 'JosefinSans-Medium',
        color: '#333333'
    },
    bio: {
        paddingStart: 18,
        fontSize: 14,
        fontFamily: 'JosefinSans-Regular',
        color: '#808080',
        marginTop: 5
    },
    timestamp: {
        fontSize: 12,
        fontFamily: 'JosefinSans-Regular',
        color: '#808080',
        marginTop: 5,
        marginLeft: 'auto',
        paddingEnd: 15
    }
})
