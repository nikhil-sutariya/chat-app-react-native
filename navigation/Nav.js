import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { UsersScreen } from '../screens/UsersScreen';

const Tab = createMaterialTopTabNavigator();

export const Nav = () => {
	return (
		<Tab.Navigator
			tabBarPosition="top"
			initialRouteName="Home"
			screenOptions={{
				tabBarIndicatorStyle: {
					backgroundColor: '#fff',
				},
				tabBarInactiveTintColor: '#7aa8a2',
				tabBarActiveTintColor: '#fff',
				tabBarLabelStyle: { fontSize: 16, fontWeight: "bold" },
				tabBarStyle: {
					backgroundColor: '#008069',
				},
		}}>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{
					title: "Chats",
			}}/>
			<Tab.Screen
				name="Contacts"
				component={UsersScreen}
				options={{
					title: "Contacts",
			}}/>
		</Tab.Navigator>
	);
};
