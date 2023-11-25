import React, { useState } from "react";
import {
	ActivityIndicator,
	Dimensions,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableHighlight,
	View,
	Image,
	ToastAndroid
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import { useApi } from "../hooks/useApi";
import useAuth from "../hooks/useAuth";

export const SigninScreen = () => {
	const navigation = useNavigation();
    const { login } = useAuth();
	
    const [phone, setPhone] = useState("");
	const [phoneError, setPhoneError] = useState(null);
	const [loading, setLoading] = useState(false);

	const logo = require('../assets/images/logo.png')

	const submitHandler = async (data) => {
		if (phone.length === 0) {
			setPhoneError("Please enter your phone number");
		}
		else {
			setLoading(true);
			setPhoneError(null);
			const formData = {
				phone: phone
			}
            
            const response = await useApi(
                `users-api/v1/phone-register-login`,
                "POST",
                null,
                formData
            );
            
			if (response.status == 201) {
                const response_data = response.data.data
                if(response_data.first_name === '' && response_data.last_name === ''){
                    const delay = ms => new Promise(res => setTimeout(res, ms));
                    ToastAndroid.showWithGravityAndOffset(
                        "Account successfully created",
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                    await delay(2000);
                    setLoading(false)
                    navigation.navigate("CreateProfile", response_data)
                }
                else{
					const details = {
						"userId": response.data.data.id,
						"firstName": response.data.data.first_name,
						"lastName": response.data.data.last_name,
						"email": response.data.data.email,
						"phone": response.data.data.phone,
						"image": response.data.data.profile_picture,
						"isActive": response.data.data.is_active,
						"accessToken": props.route.params.accessToken,
						"refreshToken": props.route.params.refreshToken
					}
					login(details);

                    const delay = ms => new Promise(res => setTimeout(res, ms));
                    ToastAndroid.showWithGravityAndOffset(
                        response.data.message,
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                    await delay(2000);

					setLoading(false);
					navigation.navigate("Root")
                }
			}
            else{
                setLoading(false)
            }
		}
	};


	return (
		<ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#fff' }}>
			{loading ? (
				<View style={styles.loaderContainer}>
					<ActivityIndicator size="large" color="#9f5914" />
				</View>
			) : (
				<View style={styles.container}>
					<View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
						<View style={styles.imageContainer}>
							<Image
								style={styles.logoImage}
								source={logo}
							/>
						</View>
						<Text style={styles.headerText}>Let's get started!</Text>
						<View style={styles.loginContainer}>
							<Feather name="phone" style={styles.icon} size={20} color={phoneError ? "red" : phone.length === 0 ? "#e99949" : "#9f5914"} />
                            <TextInput 
                                style={phoneError ? styles.inputError : styles.input} 
                                placeholder="Phone number" 
                                keyboardType='numeric' 
                                maxLength={10} 
                                onChangeText={(phone) => { setPhone(phone), setPhoneError(null) }} 
                                placeholderTextColor={phoneError ? "red" : "#e99949"} 
                                selectionColor='#27374D'
                            />
						</View>
						{phoneError && (
							<Text style={styles.error}>
								{phoneError}
							</Text>
						)}
						<View style={styles.bottomContainer}>
							<TouchableHighlight underlayColor='#884d11' style={styles.loginBtn} onPress={submitHandler}>
								<Text style={styles.loginText}>Login / Signup</Text>
							</TouchableHighlight>
						</View>
					</View>
				</View>
			)}
		</ScrollView>
	);
};

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
	loaderContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff'
	},
	container: {
		flex: 1,
	},
	imageContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		height: 150,
		marginVertical: 10,
	},
	logoImage: {
		height: 95,
		width: 150
	},
	headerText: {
		fontSize: 22,
		// marginTop: 20,
		paddingTop: 20,
		color: "#9f5914",
		fontFamily: 'JosefinSans-Medium',
		letterSpacing: 1.4,
		marginLeft: 7
	},
	loginContainer: {
		flexDirection: 'row',
		width: '93%',
		marginLeft: 10,
		marginTop: 5
	},
	icon: {
		position: 'absolute',
		marginTop: 16.5,
		zIndex: 2,
	},
	input: {
		flex: 1,
		borderBottomWidth: 0.7,
		paddingHorizontal: 35,
		borderBottomColor: "#9f5914",
		fontSize: 16,
		fontFamily: 'JosefinSans-Regular',
		color: "#9f5914"
	},
	inputError: {
		flex: 1,
		borderBottomWidth: 0.7,
		paddingHorizontal: 35,
		borderBottomColor: "red",
		fontSize: 16,
		fontFamily: 'JosefinSans-Regular',
		color: "#9f5914"
	},
	bottomContainer: {
		position: 'absolute',
		top: windowHeight - 150,
		width: '100%',
		marginHorizontal: 15,
	},
	loginBtn: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 13,
		borderRadius: 50,
		backgroundColor: '#9f5914',
		fontFamily: 'JosefinSans-Regular'
	},
	loginText: {
		fontSize: 18,
		lineHeight: 20,
		letterSpacing: 0.5,
		color: "#ffffff",
		fontFamily: 'JosefinSans-Medium'
	},
	signUp: {
		marginStart: 5,
		marginTop: 24,
		fontSize: 16,
		color: "#f2f2f2",
		fontFamily: 'JosefinSans-Medium'
	},
	error: {
		color: '#e23c4d',
		paddingTop: 10,
		marginLeft: 15,
		fontSize: 12,
		fontFamily: 'JosefinSans-Regular'
	},
	terms: {
		marginStart: 2,
		color: "#27374D",
		fontFamily: 'Mulish-Bold',
		fontSize: 13
	}
});