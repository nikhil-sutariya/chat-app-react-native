import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from "react";
import { Nav } from "./Nav";
import { SigninScreen } from "../screens/SigninScreen";
import { CreateProfileScreen } from "../screens/CreateProfileScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { ActivityIndicator, TouchableOpacity, Image, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavButtons } from "./NavButtons";
import ChatScreen from "../screens/ChatScreen";

const Stack = createStackNavigator();

export default function Navigation() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState(null)

    const checkAuthentication = async () => {
        let user_data = await AsyncStorage.getItem('user_data')
        if(user_data !== null){
            const user = JSON.parse(user_data)
            setUserData(user)
            setIsAuthenticated(true);
        }
        setLoading(false)
    };

    useEffect(() => {
        checkAuthentication()
    }, [])

    return (
        <>
            {loading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#9f5914" />
                </View>
            ) : (
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName={isAuthenticated ? "Root" : "Signin"}
                    >
                        <Stack.Screen
                            name="Root"
                            component={Nav}
                            options={{
                                headerShown: true,
                                headerTitle: "Fastchat",
                                headerStyle: {
                                    backgroundColor: "#9f5914",
                                },
                                headerTitleStyle: {
                                    color: "#fff",
                                    fontSize: 24,
                                    fontFamily: "JosefinSans-Medium"
                                },
                                headerShadowVisible: false,
                                headerTitleAlign: "left",
                                headerRight: () => (
                                    <View style={{ flexDirection: 'row' }}>
                                        <NavButtons />
                                    </View>
                                ),
                                headerLeft: null,
                                cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid
                            }}
                        />
                        <Stack.Screen
                            name="Signin"
                            component={SigninScreen}
                            options={{
                                headerShown: true,
                                headerTitle: "Fastchat",
                                headerStyle: {
                                    backgroundColor: "#9f5914",
                                },
                                headerTitleStyle: {
                                    color: "#fff",
                                    fontSize: 24,
                                    fontFamily: "JosefinSans-Medium",
                                    letterSpacing: 1.5
                                },
                                headerShadowVisible: false,
                                headerTitleAlign: "left",
                                headerLeft: null,
                                cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid
                            }}
                        />
                        <Stack.Screen
                            name="CreateProfile"
                            component={CreateProfileScreen}
                            options={{
                                headerShown: true,
                                headerTitle: "Fastchat",
                                headerStyle: {
                                    backgroundColor: "#9f5914",
                                },
                                headerTitleStyle: {
                                    color: "#fff",
                                    fontSize: 24,
                                    fontFamily: "JosefinSans-Medium",
                                    letterSpacing: 1.5,
                                    paddingBottom: 5
                                },
                                headerShadowVisible: false,
                                headerTitleAlign: "left",
                                headerTintColor: '#fff'
                            }}
                        />
                        <Stack.Screen
                            name="Profile"
                            component={ProfileScreen}
                            options={{
                                headerShown: true,
                                headerTitle: "Profile",
                                headerStyle: {
                                    backgroundColor: "#9f5914",
                                },
                                headerTitleStyle: {
                                    color: "#fff",
                                    fontSize: 22,
                                    fontFamily: "JosefinSans-Regular",
                                    marginStart: -10
                                },
                                headerShadowVisible: false,
                                headerTitleAlign: "left",
                                headerTintColor: '#fff',
                                cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid
                            }}
                        />
                        <Stack.Screen
                            name="Chatroom"
                            component={ChatScreen}
                            options={{
                                headerShown: true,
                                headerTitle: "Chat",
                                headerStyle: {
                                    backgroundColor: "#9f5914",
                                    height: 55
                                },
                                headerTitleStyle: {
                                    color: "#fff",
                                    fontSize: 22,
                                    fontFamily: "JosefinSans-Regular",
                                    marginStart: -10
                                },
                                headerShadowVisible: false,
                                headerTitleAlign: "left",
                                headerTintColor: '#fff',
                                cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid
                            }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            )}
        </>
    );
}

const styles = StyleSheet.create({
	loaderContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
        backgroundColor: '#fcf2e8'
	},
    image: {
        height: 35,
        width: 35,
        borderRadius: 50,
        marginTop: 5,
        marginEnd: 15
    }
})