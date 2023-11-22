import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import * as React from "react";
import { Nav } from "./Nav";

const Stack = createStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Root"
                    component={Nav}
                    options={{
                        headerShown: true,
                        headerTitle: "ChatApp",
                        headerStyle: {
                            backgroundColor: "#008069",
                        },
                        headerTitleStyle: {
                            fontWeight: "bold",
                            color: "#fff",
                            fontSize: 20,
                        },
                        headerShadowVisible: false,
                        headerTitleAlign: "left",
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
