import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import useAuth from '../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { resetContacts } from "../src/actions/ResetStateAction"

export const ProfileScreen = () => {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);
	const navigation = useNavigation()
	const isFocused = useIsFocused()
	const { userDetails, logout } = useAuth()
	const dispatch = useDispatch()

	const account = 'account-edit'
	const bookings = 'clipboard-sharp'
	const share = 'share-social-sharp'
	const rating = 'star-sharp'
	const about = 'information-circle-sharp'

	const logoutHandler = () => {
		setLoading(true)
		logout()
		dispatch(resetContacts())
		setLoading(false)
	}

	const getUser = async () => {
		const userData = await userDetails()
		setUser(userData)
		setLoading(false)
	}

	useEffect(() => {
		getUser()
	}, [isFocused])

	return (
		<ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#fff' }}>
			{loading ? (
				<View style={styles.loaderContainer}>
					<ActivityIndicator size="large" color="#27374d" />
				</View>
			) : (
				<>
					{user && (
						<>
							<View style={styles.profileContainer}>
                                <Image
                                    style={styles.image}
                                    source={{ uri: user.userImage }}
                                />
                                <Text style={styles.userName}>{user.firstName} {user.lastName}</Text>
								<Text style={styles.contactNo}>+91 {user.phone}</Text>
							</View>
							<TouchableHighlight underlayColor='#f2f2f2' style={styles.accountMenus} onPress={() => navigation.navigate("EditProfile")} >
								<View style={{ flexDirection: "row", alignItems: "center" }}>
									<MaterialCommunityIcons name={account} size={24} color={"#27374d"} />
									<Text style={{ paddingStart: 15, fontFamily: 'Poppins-Regular', color: '#27374d' }}>Edit Profile</Text>
								</View>
							</TouchableHighlight>
							<Text style={styles.logoutBtn} onPress={logoutHandler}>Logout</Text>
						</>
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
		alignItems: 'center'
	},
    profileContainer: {
        justifyContent: 'center',
		alignItems: 'center',
        marginTop: 15
    },
    image: {
        height: 110,
        width: 110,
        borderRadius: 75
    },
	userName: {
        fontFamily: "JosefinSans-Medium",
		fontSize: 24,
		letterSpacing: 0.25,
		paddingBottom: 15,
		color: "#666666",
		paddingTop: 10
	},
	contactNo: {
        fontFamily: "JosefinSans-Regular",
		fontSize: 16,
		letterSpacing: 0.25,
		color: "#808080"
	},
    accountMenus: {
        backgroundColor: "#fff", 
        paddingHorizontal: 17, 
        paddingVertical: 17, 
        borderBottomColor: '#000000'
    },
	logoutBtn: {
		marginTop: 30,
		textAlign: "center",
		fontSize: 20,
		color: '#9f5914',
		fontFamily: "JosefinSans-SemiBold",
		marginBottom: 30,
	}
});