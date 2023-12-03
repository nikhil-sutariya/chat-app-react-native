import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, ScrollView, RefreshControl, ActivityIndicator, Image, TouchableHighlight } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { getContactList } from '../src/actions/ContactListAction';
import useAuth from '../hooks/useAuth';
import { useIsFocused, useNavigation } from '@react-navigation/native';

export const UsersScreen = () => {
    const [userData, setUserData] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const { userDetails } = useAuth()
    const dispatch = useDispatch()
    const isFocused = useIsFocused()
    const navigation = useNavigation()

    const { contacts, loading } = useSelector(state => state.contacts);
    const noContact = require('../assets/images/no-contact.jpg')

    const getContacts = async () => {
        const user = await userDetails()
        setUserData(user)
        if (user !== null) {
            if (contacts && contacts.length == 0) {
                dispatch(getContactList(user.accessToken))
            }
        }
    }

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        const user = await userDetails()
        if (user !== null) {
            dispatch(getContactList(user.accessToken))
        }
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    useEffect(() => {
        getContacts()
    }, [isFocused])

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#fff' }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            {loading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#9f5914" />
                </View>
            ) : (
                <>
                    {contacts && contacts.length > 0 ? (
                        contacts.map((e, index) =>
                            <TouchableHighlight key={index} underlayColor='#f2f2f2' style={styles.contactDetail} onPress={() => navigation.navigate("Chatroom", e)} >
                                <View style={{ flexDirection: "row" }}>
                                    <Image
                                        style={styles.image}
                                        source={{ uri: e.profile_picture }}
                                    />
                                    <View>
                                        <Text style={styles.username}>{`${e.first_name} ${e.last_name}`}</Text>
                                        <Text style={styles.bio}>{e.bio}</Text>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        )
                    ) : (
                        <View style={styles.container}>
                            <Image
                                style={styles.noContactImage}
                                source={noContact}
                            />
                            <Text style={styles.noContact}>No contact's yet.</Text>
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
        backgroundColor: '#fff'
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
    }
})
