import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./navigation";
import { Provider } from 'react-redux';
import store from './src/store';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
	useEffect(() => {
		SplashScreen.hide();
	}, []);

	return (
		<Provider store={store}>
			<SafeAreaProvider>
				<StatusBar backgroundColor={'#9f5914'} barStyle='light-content' />
				<Navigation />
			</SafeAreaProvider>
		</Provider>
	)
}
