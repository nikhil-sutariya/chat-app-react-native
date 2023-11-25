import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from "react";
import { Nav } from "./Nav";
import { SigninScreen } from "../screens/SigninScreen";
import { CreateProfileScreen } from "../screens/CreateProfileScreen";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

export default function Navigation() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    const checkAuthentication = async () => {
        let user = await AsyncStorage.getItem('user_data')
        if(user !== null){
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
                                    fontFamily: "JosefinSans-Medium",
                                },
                                headerShadowVisible: false,
                                headerTitleAlign: "left",
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
        backgroundColor: '#fff'
	}
})