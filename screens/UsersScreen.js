import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, ScrollView, RefreshControl, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { getContactList } from '../src/actions/ContactListAction';
import useAuth from '../hooks/useAuth';
import { useIsFocused } from '@react-navigation/native';

export const UsersScreen = () => {
    const [userData, setUserData] = useState(null);
	const [refreshing, setRefreshing] = useState(false);

    const { userDetails } = useAuth()
    const dispatch = useDispatch()
    const isFocused = useIsFocused()

    const { contacts, loading } = useSelector(state => state.contacts);

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
                <View style={styles.container}>
                    <Text style={styles.textStyle}>UsersScreen</Text>
                </View>
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
    },
    textStyle: {
        color: '#000'
    }
})
