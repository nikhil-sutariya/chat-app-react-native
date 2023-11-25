import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from "react";
import { Nav } from "./Nav";
import { SigninScreen } from "../screens/SigninScreen";
import { CreateProfileScreen } from "../screens/CreateProfileScreen";

const Stack = createStackNavigator();

export default function Navigation() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        // Check user is logged in or not
        setIsAuthenticated(true)
    }, [])

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={isAuthenticated ? "Home" : "Signin"}
            >
                <Stack.Screen
                    name="Root"
                    component={Nav}
                    options={{
                        headerShown: true,
                        headerTitle: "Fastchat",
                        headerStyle: {
                            backgroundColor: "#E3811E",
                        },
                        headerTitleStyle: {
                            fontWeight: "bold",
                            color: "#fff",
                            fontSize: 20,
                            fontFamily: "Mulish-Bold"
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
    );
}
