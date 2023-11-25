import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { UsersScreen } from '../screens/UsersScreen';

const Tab = createMaterialTopTabNavigator();

export const Nav = () => {
	return (
		<Tab.Navigator
			tabBarPosition="top"
			screenOptions={{
				tabBarIndicatorStyle: {
					backgroundColor: '#fff',
				},
				tabBarInactiveTintColor: '#cccccc',
				tabBarActiveTintColor: '#fff',
				tabBarLabelStyle: { 
					fontSize: 15,
					fontFamily: 'JosefinSans-SemiBold' 
				},
				tabBarStyle: {
					backgroundColor: '#9f5914',
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
