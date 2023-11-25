import React, { useState } from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, TextInput, ToastAndroid, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { launchImageLibrary } from "react-native-image-picker";
import Entypo from 'react-native-vector-icons/Entypo'
import useAuth from '../hooks/useAuth';
import { useApi } from '../hooks/useApi';

export const CreateProfileScreen = (props) => {
    const navigation = useNavigation();
    const { login } = useAuth();

    const [firstName, setFirstName] = useState("");
    const [fnameError, setfnameError] = useState(null);
    const [lnameError, setlnameError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState(null);
    const [imageData, setImageData] = useState(null);
    const [loading, setLoading] = useState(false);

    const openImagePicker = () => {
		launchImageLibrary({}, (response) => {
			if (!response['didCancel']) {
                const imgdata = {
                    uri: response.assets[0]['uri'],
                    type: response.assets[0]['type'],
                    name: response.assets[0]['fileName']
                }
                setImage(response.assets[0]['uri'])
                setImageData(imgdata)
			}
		})
	}

    const submitHandler = async () => {
        if (firstName.length == 0 && lastName.length == 0 && email.length == 0) {
            setfnameError("Please enter your first name.")
            setlnameError("Please enter your last name.")
            setEmailError("Please enter your email address.")
        }
        else if (firstName.length > 0 && lastName.length == 0 && email.length == 0) {
            setfnameError(null)
            setlnameError("Please enter your last name.")
            setEmailError("Please enter your email address.")
        }
        else if (firstName.length > 0 && lastName.length > 0 && email.length == 0) {
            setfnameError(null)
            setlnameError(null)
            setEmailError("Please enter your email address.")
        }
        else {
            setLoading(true)
            const header = new Headers();
            header.append("Authorization", `Bearer ${props.route.params.accessToken}`);
            header.append("Content-Type", "multipart/form-data")

            const formData = new FormData();
            formData.append('first_name', firstName)
            formData.append('last_name', lastName)
            formData.append('email', email)
            formData.append('profile_picture', imageData)

            const response = await useApi(
                `users-api/v1/user/${props.route.params.id}`,
                "PATCH",
                header,
                formData
            );

            if(response.status === 200){
                const delay = ms => new Promise(res => setTimeout(res, ms));
                ToastAndroid.showWithGravityAndOffset(
                    response.data.message,
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
                await delay(2000);

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
                
                setLoading(false);
                login(details);
                navigation.navigate("Root");
			}
        }
    };

    return (
        <>
            {loading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#9f5914" />
                </View>
            ) : (
                <View style={styles.container}>
                    <View style={{ paddingHorizontal: 8 }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 20}}>
                            <TouchableOpacity onPress={openImagePicker}>
                                <View style={styles.imagePicker}>
                                    {image ?
                                        <Image source={{ uri: image }} style={styles.uploadedImage} /> :
                                        <Entypo name='plus' size={40} color={'#ccc'} />
                                    }
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.inputLabel}>Select profile image</Text>
                        </View>
                        <Text style={styles.inputLabel}>First Name</Text>
                        <View style={styles.loginContainer} >
                            <TextInput 
                                style={fnameError ? styles.inputError : styles.input} 
                                placeholder='eg. Nikhil' 
                                onChangeText={(name) => { setFirstName(name), setfnameError(null) }} 
                                placeholderTextColor={fnameError ? "red" : "#e99949"}
                                selectionColor='#27374D'
                            />
                        </View>
                        {fnameError && (
                            <Text style={styles.error}>
                                {fnameError}
                            </Text>
                        )}
                        <Text style={styles.inputLabel}>Last Name</Text>
                        <View style={styles.loginContainer} >
                            <TextInput 
                                style={lnameError ? styles.inputError : styles.input} 
                                placeholder='eg. Sutariya' 
                                onChangeText={(name) => { setLastName(name), setlnameError(null) }} 
                                placeholderTextColor={lnameError ? "red" : "#e99949"} 
                                selectionColor='#27374D'    
                            />
                        </View>
                        {lnameError && (
                            <Text style={styles.error}>
                                {lnameError}
                            </Text>
                        )}
                        <Text style={styles.inputLabel}>Email address</Text>
                        <View style={styles.loginContainer} >
                            <TextInput
								style={emailError ? styles.inputError : styles.input}
								autoCapitalize='none'
								placeholder="e.g. fastchat@gmail.com"
								onChangeText={(e) => { setEmail(e), setEmailError(null) }}
								placeholderTextColor={emailError ? "red" : "#e99949"}
								selectionColor='#27374D'
							/>
                        </View>
                        {emailError && (
                            <Text style={styles.error}>
                                {emailError}
                            </Text>
                        )}
                    </View>
                    <View style={styles.bottomContainer}>
                        <TouchableHighlight underlayColor='#884d11' style={styles.loginBtn} onPress={submitHandler}>
                            <Text style={styles.loginText}>Signup</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            )}
        </>
    )
}

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
        paddingHorizontal: 15,
        backgroundColor: '#fff'
    },
    imagePicker: {
		backgroundColor: '#e6e6e6',
		borderColor: '#e6e6e6',
		borderWidth: 1,
		borderRadius: 80,
		width: 150,
		height: 150,
		justifyContent: 'center',
		alignItems: 'center'
	},
	uploadedImage: {
		backgroundColor: '#f2f2f2',
		borderColor: '#f2f2f2',
		borderWidth: 1,
		borderRadius: 80,
		width: 150,
		height: 150,
	},
    inputLabel: {
        marginTop: 8,
        marginBottom: -14,
        fontFamily: 'JosefinSans-Medium',
        color: '#9f5914'
    },
    loginContainer: {
        flexDirection: 'row',
    },
    icon: {
        position: 'absolute',
        left: 10,
        marginTop: 21,
    },
    input: {
        flex: 1,
        borderBottomWidth: 0.7,
        paddingVertical: 7,
        borderBottomColor: "#9f5914",
        marginVertical: 10,
        fontSize: 15,
        fontFamily: 'JosefinSans-Regular',
        color: "#9f5914"
    },
    inputError: {
        flex: 1,
        borderBottomWidth: 0.7,
        paddingVertical: 7,
        borderBottomColor: "red",
        marginVertical: 10,
        fontSize: 15,
        fontFamily: 'JosefinSans-Regular',
        color: "#9f5914"
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
        lineHeight: 22,
        letterSpacing: 0.5,
        color: "#ffffff",
        fontFamily: 'JosefinSans-Medium'
    },
    bottomContainer: {
        position: 'absolute',
        top: windowHeight - 150,
        width: '100%',
        marginHorizontal: 12,
    },
    error: {
        color: '#e23c4d',
        fontSize: 10,
        fontFamily: 'JosefinSans-Medium'
    }
})